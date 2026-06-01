/**
 * BACKEND ENTRY POINT
 * This file implements the REST API architecture.
 * It is ready to be run with `ts-node server.ts` or similar.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { prisma } from './lib/prisma';
import { swaggerDocs } from './config';

// routes
import subscriptionRoutes from './routes/subscriptionRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import planRoutes from './routes/planRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes Registration
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/plans', planRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Root Endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: "Hélia API is running",
    documentation: "/api-docs",
    version: "1.0.0"
  });
});

// Health check
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({ 
      status: 'ok', 
      database: 'connected',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    // Si la DB échoue, on renvoie une 503 (Service Unavailable)
    console.error('Healthcheck failed:', error);

    res.status(503).json({ 
      status: 'error', 
      database: 'disconnected',
      message: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`
    🚀 Hélia API Server running on port ${PORT}
    📚 API Documentation available at http://localhost:${PORT}/api-docs
  `);
});

export default app;