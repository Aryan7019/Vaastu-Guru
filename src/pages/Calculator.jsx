import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import CalculatorForm from '@/components/calculator/CalculatorForm';
import CalculatorResult from '@/components/calculator/CalculatorResult';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-b-4 border-orange-500"></div>
  </div>
);

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
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>Numerology Calculator - Get Your Personal Reading | NumaVaastu</title>
        <meta name="description" content="Calculate your life path, destiny, and soul urge numbers with our advanced numerology calculator. Get personalized insights based on your name and birth date." />
      </Helmet>

      <div className="min-h-screen py-16 sm:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-shadow mb-3 sm:mb-4">
              Numerology <span className="text-black">Calculator</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto px-2">
              Unlock your life's blueprint with our numerology calculator: reveals personality traits, fortune potential, and name compatibility for harmonious energy flow.
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