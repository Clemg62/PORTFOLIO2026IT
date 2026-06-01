export const processFakePayment = async (amount: number, currency: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (amount < 0) throw new Error("Montant invalide");
  
  return { success: true };
};