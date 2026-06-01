// --- Frontend UI Types ---
export interface NavItem {
  label: string;
  path: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}


/**
 * User model
 * Matches the structure returned by /api/users/:id
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  deletedAt: string | null; // Soft delete
}

/**
 * Auth Types
 */
export interface LoginCredentials {
  email: string;
  password: string; // Backend expects 'password', not 'passwordHash'
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Matches response from authController.ts
export interface AuthResponse {
  message: string;
  token: {
    userId: string;
    expiry: string;
    scope: string;
    plaintext: string; // The actual Bearer token
    hash: any;
  };
}

/**
 * Subscription Plan
 */
export interface Plan {
  id: number;
  name: string;
  priceCents: number; 
  interval: 'month' | 'year';
  features: string[];
}

/**
 * Subscription Status
 */
export interface Subscription {
  id: number;
  userId: string;
  planId: number;
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  startDate: string;
  endDate: string;
}