'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}

export default function CardTransition({ 
  children, 
  className = '',
  delay = 0,
  index = 0
}: CardTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: delay + (index * 0.05)
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
