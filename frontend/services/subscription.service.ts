import { Subscription } from '../types';

const API_URL = 'http://localhost:3000/api';

const getHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
});

export const subscriptionService = {
  async subscribe(planId: number, token: string): Promise<void> {
    // Updated to point to /subscriptions/ (POST) instead of /subscriptions/checkout
    const response = await fetch(`${API_URL}/subscriptions`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({ planId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur lors du paiement');
    }
  },

  async cancelSubscription(token: string): Promise<void> {
    const response = await fetch(`${API_URL}/subscriptions/cancel`, {
      method: 'POST',
      headers: getHeaders(token),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Impossible d'annuler l'abonnement");
    }
  },

  async getCurrentSubscription(token: string): Promise<Subscription & { plan?: any } | null> {
    try {
        const response = await fetch(`${API_URL}/subscriptions/me`, {
            method: 'GET',
            headers: getHeaders(token),
        });

        if (response.status === 404) return null;
        
        if (!response.ok) {
            throw new Error('Erreur récupération abonnement');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
  }
};