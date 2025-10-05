'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'var(--color-elhassi1)',
  className = '' 
}: LoadingSpinnerProps) {
  const sizeMap = {
    sm: 24,
    md: 40,
    lg: 60
  };

  const actualSize = sizeMap[size];
  const circleSize = actualSize * 0.8;

  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 1
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        style={{
          width: actualSize,
          height: actualSize,
          borderRadius: '50%',
          border: `3px solid ${color}20`,
          borderTopColor: color,
          position: 'relative'
        }}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: circleSize,
            height: circleSize,
            borderRadius: '50%',
            border: `3px solid transparent`,
            borderTopColor: color,
            marginTop: -circleSize / 2,
            marginLeft: -circleSize / 2,
            opacity: 0.6
          }}
          animate={{ rotate: -180 }}
          transition={{
            ...spinTransition,
            duration: 1.5
          }}
        />
      </motion.div>
    </div>
  );
}
