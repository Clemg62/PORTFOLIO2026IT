import { Plan } from '../types';

const API_URL = 'http://localhost:3000/api';

export const planService = {
  async getAllPlans(): Promise<Plan[]> {
    try {
      const response = await fetch(`${API_URL}/plans`);
      if (!response.ok) {
        throw new Error('Failed to fetch plans');
      }
      const data = await response.json();
      
      // Determine if data is the array (mock/subscription controller) or data.plans is the array (prisma controller)
      let rawPlans: any[] = [];
      if (Array.isArray(data)) {
        rawPlans = data;
      } else if (data.plans && Array.isArray(data.plans)) {
        rawPlans = data.plans;
      }

      // Map backend structure to frontend Plan interface
      return rawPlans.map((p: any) => ({
        id: p.id.toString(),
        name: p.name,
        // Backend might send price (prisma) or priceCents (mock/user api)
        // Prefer priceCents if available, otherwise price
        priceCents: p.priceCents !== undefined ? p.priceCents : p.price,
        // Backend might send intervalUnit (prisma) or interval (mock/user api)
        interval: p.intervalUnit || p.interval,
        // Features might be in description (mock) or missing. Enriched in the component.
        features: []
      }));
    } catch (error) {
      console.error("Error fetching plans:", error);
      return [];
    }
  },

  async getPlanById(id: string): Promise<Plan | null> {
    try {
      const response = await fetch(`${API_URL}/plans/${id}`);
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      const p = data.plan;

      if (!p) return null;

      return {
        id: p.id, // Number
        name: p.name,
        priceCents: p.priceCents !== undefined ? p.priceCents : p.price,
        interval: p.intervalUnit || p.interval,
        features: []
      };
    } catch (error) {
      console.error("Error fetching plan:", error);
      return null;
    }
  }
};