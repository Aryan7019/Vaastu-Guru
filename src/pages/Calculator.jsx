import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import CalculatorForm from '@/components/calculator/CalculatorForm';
import CalculatorResult from '@/components/calculator/CalculatorResult';

const Calculator = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
  });
  const [results, setResults] = useState(null);
  const { isLoaded, isSignedIn, user } = useUser();

  const handleReset = () => {
    setResults(null);
    setFormData({ name: '', birthDate: '' });
  };

  if (!isLoaded) {
    return null; // or loading spinner
  }

  return (
    <>
      <Helmet>
        <title>Numerology Calculator - Get Your Personal Reading | Bhaggya Darshhan</title>
        <meta name="description" content="Calculate your life path, destiny, and soul urge numbers with our advanced numerology calculator. Get personalized insights based on your name and birth date." />
      </Helmet>

      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white text-shadow mb-4">
              Numerology <span className="text-black">Calculator</span>
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Discover your life path, destiny, and soul purpose through the ancient science of numbers
            </p>
          </motion.div>

          {!results ? (
            <CalculatorForm
              user={user}
              isSignedIn={isSignedIn}
              formData={formData}
              setFormData={setFormData}
              setResults={setResults}
            />
          ) : (
            <CalculatorResult
              results={results}
              formData={formData}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Calculator;