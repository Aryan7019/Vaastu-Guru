import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingElement = memo(({ el, index }) => (
  <motion.div
    key={index}
    className={`absolute ${el.size} ${el.isNumber ? 'font-bold text-white/40' : ''}`}
    style={{ 
      left: el.x,
      filter: el.isNumber ? 'none' : 'drop-shadow(0 0 8px rgba(255,255,255,0.2))',
      willChange: 'transform, opacity'
    }}
    initial={{ y: '110vh', opacity: 0 }}
    animate={{ 
      y: '-10vh',
      opacity: el.isNumber ? [0, 0.4, 0.4, 0] : [0, 0.5, 0.5, 0]
    }}
    transition={{
      duration: el.duration,
      delay: el.delay,
      repeat: Infinity,
      ease: 'linear'
    }}
  >
    {el.emoji}
  </motion.div>
));

FloatingElement.displayName = 'FloatingElement';

const FloatingBackground = () => {
  const elements = useMemo(() => [
    // Spiritual symbols - smaller sizes
    { emoji: '🕉️', size: 'text-5xl', x: '3%', delay: 0, duration: 20 },
    { emoji: '🪷', size: 'text-4xl', x: '12%', delay: 4, duration: 24 },
    { emoji: '✨', size: 'text-3xl', x: '22%', delay: 8, duration: 18 },
    { emoji: '🔮', size: 'text-4xl', x: '32%', delay: 2, duration: 22 },
    { emoji: '🌟', size: 'text-3xl', x: '42%', delay: 6, duration: 19 },
    { emoji: '☯️', size: 'text-4xl', x: '52%', delay: 10, duration: 23 },
    { emoji: '🏠', size: 'text-3xl', x: '62%', delay: 3, duration: 17 },
    { emoji: '🔯', size: 'text-2xl', x: '72%', delay: 7, duration: 25 },
    { emoji: '💫', size: 'text-3xl', x: '82%', delay: 11, duration: 20 },
    { emoji: '🧿', size: 'text-4xl', x: '92%', delay: 1, duration: 21 },
    { emoji: '🌙', size: 'text-3xl', x: '8%', delay: 12, duration: 26 },
    { emoji: '☀️', size: 'text-4xl', x: '48%', delay: 5, duration: 22 },
    { emoji: '🪬', size: 'text-3xl', x: '58%', delay: 9, duration: 19 },
    { emoji: '⭐', size: 'text-2xl', x: '68%', delay: 13, duration: 21 },
    
    // Numbers 1-9 spread across - smaller sizes
    { emoji: '1', size: 'text-5xl', x: '5%', delay: 1.5, duration: 28, isNumber: true },
    { emoji: '2', size: 'text-4xl', x: '15%', delay: 5.5, duration: 25, isNumber: true },
    { emoji: '3', size: 'text-5xl', x: '25%', delay: 9.5, duration: 22, isNumber: true },
    { emoji: '4', size: 'text-4xl', x: '35%', delay: 3.5, duration: 26, isNumber: true },
    { emoji: '5', size: 'text-5xl', x: '45%', delay: 7.5, duration: 23, isNumber: true },
    { emoji: '6', size: 'text-4xl', x: '55%', delay: 11.5, duration: 27, isNumber: true },
    { emoji: '7', size: 'text-5xl', x: '65%', delay: 2.5, duration: 24, isNumber: true },
    { emoji: '8', size: 'text-4xl', x: '75%', delay: 6.5, duration: 21, isNumber: true },
    { emoji: '9', size: 'text-5xl', x: '85%', delay: 10.5, duration: 25, isNumber: true },
    
    // More numbers for density - smaller
    { emoji: '1', size: 'text-3xl', x: '95%', delay: 14.5, duration: 22, isNumber: true },
    { emoji: '3', size: 'text-3xl', x: '10%', delay: 18.5, duration: 26, isNumber: true },
    { emoji: '5', size: 'text-4xl', x: '30%', delay: 12.5, duration: 20, isNumber: true },
    { emoji: '7', size: 'text-3xl', x: '50%', delay: 16.5, duration: 24, isNumber: true },
    { emoji: '9', size: 'text-4xl', x: '70%', delay: 8.5, duration: 23, isNumber: true },
  ], []);

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden" 
      style={{ zIndex: 1, transform: 'translateZ(0)' }}
    >
      {elements.map((el, index) => (
        <FloatingElement key={index} el={el} index={index} />
      ))}
    </div>
  );
};

export default memo(FloatingBackground);
