import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator as CalcIcon, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { calculateNumerology } from '@/utils/numerology';
import { SignInButton } from '@clerk/clerk-react';

const CalculatorForm = ({ user, isSignedIn, setFormData, setResults, formData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSignedIn) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to use the calculator",
        variant: "destructive"
      });
      return;
    }

    if (!formData.name.trim() || !formData.birthDate) {
      toast({
        title: "Error",
        description: "Please fill in your name and birth date",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const numerologyResult = calculateNumerology(formData.name, formData.birthDate);
      setResults(numerologyResult);
      
      const calculationData = {
        ...formData,
        ...numerologyResult,
        timestamp: new Date().toISOString(),
        userId: user.id
      };
      
      const existingCalculations = JSON.parse(localStorage.getItem('bhaggya_calculations') || '[]');
      existingCalculations.push(calculationData);
      localStorage.setItem('bhaggya_calculations', JSON.stringify(existingCalculations));
      
      toast({
        title: "Success!",
        description: "Your numerology profile has been generated.",
      });
      
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-xl p-8 card-shadow"
    >
      <div className="text-center mb-8">
        <CalcIcon className="h-16 w-16 text-orange-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold gradient-text mb-2">Personal Numerology Reading</h2>
        <p className="text-gray-600">Enter your details to unlock the secrets of your numbers</p>
      </div>

      {!isSignedIn && (
        <div className="text-center mb-8 p-6 bg-orange-50 rounded-xl border border-orange-200">
          <p className="text-orange-700 mb-4 font-medium">🔒 Sign in to calculate and save your results</p>
          <p className="text-gray-600 mb-4">Create your account to get personalized numerology insights</p>
          <SignInButton mode="modal" redirectUrl = "/calculator">
            <Button className="orange-gradient text-white transition-transform duration-300 ease-in-out hover:scale-105 hover:orange-gradient-hover rounded-xl">
              Sign In / Sign Up
            </Button>
          </SignInButton>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthDate" className="text-sm font-medium text-gray-700">
              Birth Date *
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>
        </div>
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full orange-gradient text-white transition-transform duration-300 ease-in-out hover:scale-105 hover:orange-gradient-hover py-3 text-lg rounded-xl"
        >
          {isLoading ? 'Calculating Your Numbers...' : 'Generate My Numerology Profile'}
        </Button>
      </form>
    </motion.div>
  );
};

export default CalculatorForm;