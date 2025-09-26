import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRoutes from './src/server/routes/payment.js';

// Load environment variables FIRST
dotenv.config();

// Debug: Check if environment variables are loaded
console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID ? 'Loaded' : 'Missing');
console.log('PORT:', process.env.PORT);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // Your frontend URL
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', paymentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    razorpayKey: process.env.RAZORPAY_KEY_ID ? 'Loaded' : 'Missing'
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Razorpay Key ID: ${process.env.RAZORPAY_KEY_ID ? 'Present' : 'Missing'}`);
});