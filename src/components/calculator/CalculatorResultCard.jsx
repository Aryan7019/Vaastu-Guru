import React from 'react';
import { motion } from 'framer-motion';

const CalculatorResultCard = ({ icon: Icon, title, number, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-lg shadow-xl p-8 card-shadow flex flex-col"
    >
      <div className="text-center mb-6">
        <Icon className="h-12 w-12 text-orange-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold gradient-text mb-2">{title}</h3>
        <div className="text-4xl font-bold text-orange-500">{number}</div>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed flex-grow">
        {description}
      </p>
    </motion.div>
  );
};

export default CalculatorResultCard;