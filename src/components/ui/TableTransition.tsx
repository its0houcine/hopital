'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TableTransitionProps {
  children: ReactNode;
  className?: string;
}

export default function TableTransition({ 
  children, 
  className = ''
}: TableTransitionProps) {
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      variants={tableVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function TableRowTransition({ 
  children, 
  className = '',
  index = 0
}: { 
  children: ReactNode; 
  className?: string;
  index?: number;
}) {
  return (
    <motion.tr
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
            delay: index * 0.05
          }
        }
      }}
      className={className}
      whileHover={{ 
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.tr>
  );
}
