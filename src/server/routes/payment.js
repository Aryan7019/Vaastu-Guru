import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const router = express.Router();

// Debug environment variables
console.log('RAZORPAY_KEY_ID in routes:', process.env.RAZORPAY_KEY_ID);
console.log('RAZORPAY_KEY_SECRET in routes:', process.env.RAZORPAY_KEY_SECRET ? 'Present' : 'Missing');

// Initialize Razorpay instance with error handling
let razorpay;
try {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  console.log('Razorpay initialized successfully');
} catch (error) {
  console.error('Failed to initialize Razorpay:', error.message);
}

// Create Razorpay order
router.post('/create-razorpay-order', async (req, res) => {
  // Check if Razorpay is initialized
  if (!razorpay) {
    return res.status(500).json({
      success: false,
      message: 'Payment gateway not configured properly'
    });
  }
  
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    
    if (!amount || isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount provided'
      });
    }
    
    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1 // Auto capture payment
    };
    
    const order = await razorpay.orders.create(options);
    
    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.RAZORPAY_KEY_ID
      }
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({
      success: false,
      message: error.error?.description || 'Failed to create order'
    });
  }
});

// Verify payment
router.post('/verify-payment', async (req, res) => {
  try {
    const { order_id, payment_id, signature } = req.body;
    
    if (!order_id || !payment_id || !signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters'
      });
    }
    
    // Check if secret key is available
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'Payment verification not configured'
      });
    }
    
    // Create expected signature
    const body = order_id + "|" + payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');
    
    // Verify signature
    const isAuthentic = expectedSignature === signature;
    
    if (isAuthentic) {
      res.json({
        success: true,
        message: 'Payment verified successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Add a test endpoint to check Razorpay configuration
router.get('/config-status', (req, res) => {
  res.json({
    razorpay_configured: !!razorpay,
    key_id_present: !!process.env.RAZORPAY_KEY_ID,
    key_secret_present: !!process.env.RAZORPAY_KEY_SECRET
  });
});

export default router;