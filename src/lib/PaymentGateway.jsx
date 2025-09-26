import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

// Load Razorpay script dynamically
const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    // Check if script is already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const PaymentGateway = ({ amount, onSuccess, onError, userEmail, userName }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Get API base URL based on environment
  const getApiBaseUrl = () => {
    // Use VITE_API_BASE_URL if set
    if (import.meta.env.VITE_API_BASE_URL) {
      return import.meta.env.VITE_API_BASE_URL;
    }
    
    // For production (Vercel), use relative path
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return '/api';
    }
    
    // For local development, use the Express server
    return 'http://localhost:5000/api';
  };

  const displayRazorpay = async (order) => {
    const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
    
    if (!res) {
      onError(new Error('Razorpay SDK failed to load. Are you online?'));
      return;
    }

    const options = {
      key: order.key,
      amount: order.amount,
      currency: order.currency,
      name: 'Consultation Service',
      description: 'Call Consultation with Rishabh Goel',
      image: '/logo.png',
      order_id: order.id,
      handler: async function (response) {
        try {
          const apiBaseUrl = getApiBaseUrl();
          const verificationResponse = await fetch(`${apiBaseUrl}/verify-payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          });

          if (!verificationResponse.ok) {
            throw new Error(`HTTP error! status: ${verificationResponse.status}`);
          }

          const verificationData = await verificationResponse.json();

          if (verificationData.success) {
            onSuccess(response);
          } else {
            onError(new Error('Payment verification failed'));
          }
        } catch (error) {
          onError(error);
        }
      },
      prefill: {
        name: userName || '',
        email: userEmail || '',
      },
      notes: {
        consultation: 'Call with Rishabh Goel',
      },
      theme: {
        color: '#F97316',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const initiatePayment = async () => {
    setIsProcessing(true);
    
    try {
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/create-razorpay-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          receipt: `receipt_${Date.now()}_${userEmail}`,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        await displayRazorpay(data.order);
      } else {
        throw new Error(data.message || 'Failed to create payment order');
      }
    } catch (error) {
      onError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      onClick={initiatePayment}
      disabled={isProcessing}
      className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg"
    >
      {isProcessing ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : (
        `Pay ₹${amount} with Razorpay`
      )}
    </Button>
  );
};

export default PaymentGateway;