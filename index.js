
// index.js (or server.js)
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import logger from './src/config/logger.js';
import rootRouter from './src/routes/index.js';
import cors from 'cors'
const app = express();
// Load env variables
dotenv.config();


// Middleware to parse JSON
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000', // ✅ your Next.js frontend origin
    credentials: true, // ✅ allow cookies/auth headers
  })
);

// Connect to MongoDB
connectDB();

// Sample route
app.get("/", (req, res) => {    
    res.send({
        message: `LivMeal Server running at PORT: ${PORT}`
    });;
});

app.use("/api/v1", rootRouter);

// Start server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  logger.info(`🚀 Server started on port ${PORT}`);
});
