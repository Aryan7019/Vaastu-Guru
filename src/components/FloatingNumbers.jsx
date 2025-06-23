
import React, { useEffect, useState } from 'react';

const FloatingNumbers = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const generateNumbers = () => {
      const newNumbers = [];
      const numerologyNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];
      
      for (let i = 0; i < 25; i++) {
        newNumbers.push({
          id: i,
          number: numerologyNumbers[Math.floor(Math.random() * numerologyNumbers.length)],
          left: Math.random() * 100,
          delay: Math.random() * 15,
          size: Math.random() * 2 + 1
        });
      }
      
      setNumbers(newNumbers);
    };

    generateNumbers();
    
    // Regenerate numbers every 15 seconds
    const interval = setInterval(generateNumbers, 15000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-numbers">
      {numbers.map((num) => (
        <div
          key={num.id}
          className="floating-number"
          style={{
            left: `${num.left}%`,
            animationDelay: `${num.delay}s`,
            fontSize: `${num.size}rem`
          }}
        >
          {num.number}
        </div>
      ))}
    </div>
  );
};

export default FloatingNumbers;
