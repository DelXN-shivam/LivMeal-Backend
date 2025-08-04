import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import rootRouter from './src/routes/index.js';
import cors from 'cors';
import cron from 'node-cron';
// Load env variables first
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware to parse JSON
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: ['http://localhost:3000', '*'], // Allow localhost:3000 and all origins
    credentials: true,
  })
);


// Health check route (no DB connection needed)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "LivMeal Server is healthy",
    timestamp: new Date().toISOString()
  });
});

// Main route with error handling
app.get("/", async (req, res) => {
  try {
    // Try to connect to database
    await connectDB();

    res.status(200).json({
      message: "LivMeal Server running successfully!",
      status: "Connected to Database",
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database connection error:', error.message);
    res.status(200).json({
      message: "LivMeal Server is running",
      status: "Database connection failed",
      error: error.message,
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    });
  }
});

// API routes with database connection middleware
app.use("/api/v1", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('API Database connection error:', error.message);
    res.status(500).json({
      error: "Database connection failed",
      message: error.message
    });
  }
}, rootRouter);

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error:', error);
  res.status(500).json({
    error: "Internal Server Error",
    message: error.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Start server (for local development only)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
  });
}

//cronjob 
// Add this to your existing routes or create api/cron.js
cron.schedule('*/10 * * * *', async () => {
  console.log('Running cron job...');
});


// Export for Vercel
export default app;
