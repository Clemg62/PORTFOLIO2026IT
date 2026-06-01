import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { calculateEndDate } from "../lib/date";
import { processFakePayment } from "../services/payement.service";

export const createSubscription = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { planId } = req.body;

  if (!userId || !planId) {
    return res.status(400).json({ error: "Données manquantes" });
  }

  // Check if user already has an active subscription
  // We include the plan to check if it's the free plan
  const existingSub = await prisma.subscription.findUnique({
    where: { userId: BigInt(userId) },
    include: { plan: true }
  });

  // Idempotency & Switching Logic
  if (existingSub && (existingSub.status === 'active' || existingSub.status === 'trialing')) {
     // 1. If trying to subscribe to the SAME plan, return success (Idempotent)
     if (existingSub.planId === Number(planId)) {
         return res.status(200).json({ success: true, message: "Vous êtes déjà abonné à ce plan." });
     }
     
     // 2. If trying to subscribe to a DIFFERENT plan, we proceed.
     // The transaction below will delete the old subscription and create the new one.
     // This effectively handles "Upgrading" or "Downgrading".
  }

  // Récupérer le plan cible
  const plan = await prisma.plan.findUnique({ where: { id: Number(planId) } });
  if (!plan) return res.status(404).json({ error: "Plan introuvable" });

  const isFree = plan.price === 0;
  // Specific logic for Family Plan (ID 2) which has a 30-day trial
  const isFamilyPlan = plan.id === 2;
  
  // Logic: 
  // 1. If it's a completely free plan -> Amount is 0
  // 2. If it's a paid plan but with a Trial (Family) -> Initial payment amount is 0 (Auth only)
  const isTrialOrFree = isFree || isFamilyPlan;
  
  const paymentAmount = isTrialOrFree ? 0 : plan.price;

  // Start Transaction
  try {
    await prisma.$transaction(async (tx) => {
      // 1. If an existing subscription exists (Free or Paid), delete it to allow the new one.
      if (existingSub) {
        await tx.subscription.delete({
            where: { id: existingSub.id }
        });
      }

      // 2. Create Payment Record
      const payment = await tx.payment.create({
        data: {
          userId: BigInt(userId),
          amount: paymentAmount, 
          currency: plan.currency,
          status: isTrialOrFree ? "SUCCEEDED" : "PENDING",
          provider: "FAKE",
        },
      });

      // 3. Process Payment if needed (outside transaction ideally, but for fake service it's okay)
      if (!isTrialOrFree) {
          // Note: In real world, do this before transaction or handle rollback
          await processFakePayment(plan.price, plan.currency);
          
          await tx.payment.update({
            where: { id: payment.id },
            data: {
              status: "SUCCEEDED",
              providerTransactionId: "fake_txn_" + Date.now(),
            },
          });
      }

      // 4. Create Subscription via Procedure
      const now = new Date();
      const periodEnd = calculateEndDate(
        now,
        plan.intervalUnit,
        plan.intervalCount
      );
      const status = isFamilyPlan ? "trialing" : "active";

      await tx.$executeRaw`CALL proc_subscribe_user(
        ${BigInt(userId)}, 
        ${Number(planId)}, 
        ${status}, 
        ${now}, 
        ${periodEnd}
      )`;

      // 5. Link Payment to Subscription
      const sub = await tx.subscription.findUnique({
        where: { userId: BigInt(userId) },
      });

      if (sub) {
        await tx.payment.update({
          where: { id: payment.id },
          data: { subscriptionId: sub.id },
        });
      }
    });

    return res.status(201).json({ success: true });

  } catch (error) {
    console.error("Subscription Error:", error);
    // Note: Transaction rolls back automatically on error
    return res.status(402).json({ error: "Échec de l'abonnement ou du paiement." });
  }
};

export const cancelSubscription = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Non authentifié" });

    const sub = await prisma.subscription.findUnique({
      where: { userId: BigInt(userId) },
    });

    if (!sub || (sub.status !== "active" && sub.status !== "trialing")) {
      return res.status(400).json({ error: "Aucun abonnement actif" });
    }

    if (sub.cancelAtPeriodEnd) {
      return res
        .status(400)
        .json({ error: "L'abonnement est déjà en cours d'annulation" });
    }

    await prisma.$executeRaw`CALL proc_cancel_subscription(${BigInt(userId)})`;

    const updatedSub = await prisma.subscription.findUnique({
      where: { userId: BigInt(userId) },
    });

    const responseData = JSON.stringify(updatedSub, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    );

    return res.status(200).json({
      message: "Abonnement annulé avec succès",
      subscription: JSON.parse(responseData),
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur lors de l'annulation" });
  }
};

// Kept to ensure Frontend Dashboard works
export const getMySubscription = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Non authentifié" });

    try {
        const sub = await prisma.subscription.findUnique({
            where: { userId: BigInt(userId) },
            include: { plan: true }
        });

        if (!sub) {
            return res.status(404).json({ message: "Aucun abonnement actif" });
        }

        // Serialize BigInt
        const serialized = JSON.parse(JSON.stringify(sub, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        return res.json(serialized);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erreur serveur" });
    }
};