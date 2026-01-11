import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FloatingSpiritualElements = () => {
  const [elements, setElements] = useState([]);

  // Spiritual symbols and elements
  const spiritualSymbols = ['🕉️', '🪷', '🔯', '☯️', '🧿', '🌟', '✨', '🌙', '☀️', '🔮'];
  
  const generateElements = () => {
    const newElements = [];
    for (let i = 0; i < 15; i++) {
      newElements.push({
        id: i,
        symbol: spiritualSymbols[Math.floor(Math.random() * spiritualSymbols.length)],
        left: Math.random() * 100,
        size: Math.random() * 20 + 15, // 15-35px
        duration: Math.random() * 10 + 15, // 15-25s
        delay: Math.random() * 5,
      });
    }
    setElements(newElements);
  };

  useEffect(() => {
    generateElements();
    const interval = setInterval(generateElements, 20000); // Regenerate every 20 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-spiritual-container fixed inset-0 pointer-events-none z-1 overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute floating-spiritual"
          style={{
            left: `${element.left}%`,
            fontSize: `${element.size}px`,
          }}
          initial={{
            y: '100vh',
            opacity: 0,
            rotate: 0,
            scale: 0.5,
          }}
          animate={{
            y: '-100px',
            opacity: [0, 0.3, 0.3, 0],
            rotate: 360,
            scale: [0.5, 1, 1, 0.8],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {element.symbol}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingSpiritualElements;