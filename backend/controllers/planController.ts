import { Request, Response } from "express";
import {prisma} from "../lib/prisma";
import { createPlanSchema, updatePlanSchema } from "../schemas/plan.schema";

export const getAllPlans = async (req: Request, res: Response) => {
  try {
    const plans = await prisma.plan.findMany();
    
    if (plans.length === 0) {
      return res.status(200).json({ plans: [] });
    }

    res.status(200).json({ plans });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des plans", error });
  }
};

export const getPlanById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const plan = await prisma.plan.findUnique({
      where: { id: Number(id) },
    });

    if (!plan) {
      return res.status(404).json({ message: "Plan non trouvé" });
    }

    res.status(200).json({ plan });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du plan", error });
  }
};

export const createPlan = async (req: Request<{}, {}, createPlanSchema>, res: Response) => {
  const { name, price, currency, interval_unit, interval_count } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  try {
    const newPlan = await prisma.plan.create({
      data: {
        name,
        price,
        currency: currency.toUpperCase(),
        intervalUnit: interval_unit,
        intervalCount: interval_count
      },
    });

    res.status(201).json({ plan: newPlan });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du plan", error });
  }
};

export const updatePlan = async (req: Request<{id: string}, {}, updatePlanSchema>, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, price, currency, interval_unit, interval_count } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  try {
    const updatedPlan = await prisma.plan.update({
      where: { id: Number(id) },
      data: {
        name,
        price,
        currency: currency?.toUpperCase(),
        intervalUnit: interval_unit,
        intervalCount: interval_count
      },
    });

    res.status(200).json({ plan: updatedPlan });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du plan", error });
  }
};

export const disablePlan = async (req: Request<{id: string}>, res: Response) => {
  const id = parseInt(req.params.id);
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  try {
    const disablePlan = await prisma.plan.update({
      where: { id: Number(id) },
      data: {
        active: false
      }
    });

    res.status(200).json({ message: "Plan désactivé avec succès", plan: disablePlan });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la désactivation du plan", error });
  }
};
