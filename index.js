import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import logger from './src/config/logger.js';
import rootRouter from './src/routes/index.js';
import cors from 'cors'

// Load env variables first
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware to parse JSON
app.use(express.json());

// Updated CORS configuration for production
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://your-frontend-domain.vercel.app']
      : ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// Sample route
app.get("/", (req, res) => {    
    res.send({
        message: `LivMeal Server running at PORT: ${PORT} which is Development mode`
    });
});

app.use("/api/v1", rootRouter);

// Start server (for local development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    logger.info(`🚀 Server started on port ${PORT} in Production mode`);
  });
}

// Export for Vercel
export default app;
