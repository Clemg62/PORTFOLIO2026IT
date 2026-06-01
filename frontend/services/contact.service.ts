const API_URL = 'http://localhost:3000/api';

export interface ContactData {
  name: string;
  email: string;
  telephone: string;
  subject: string;
  message: string;
  agreePolicy: boolean;
}

export const contactService = {
  async sendMessage(data: ContactData): Promise<void> {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      // Handle Zod array errors or simple message
      const msg = error.errors ? error.errors.map((e: any) => e.message).join(', ') : error.message;
      throw new Error(msg || 'Erreur lors de l\'envoi du message');
    }
  }
};