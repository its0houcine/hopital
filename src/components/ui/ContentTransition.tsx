'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ContentTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ContentTransition({ 
  children, 
  className = '',
  delay = 0
}: ContentTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
