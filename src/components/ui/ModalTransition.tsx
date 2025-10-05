'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface ModalTransitionProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function ModalTransition({ 
  children, 
  isOpen,
  onClose,
  className = ''
}: ModalTransitionProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 backdrop-blur-md bg-white/30 z-40"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ 
              opacity: 1, 
              backdropFilter: 'blur(8px)',
              transition: {
                opacity: { duration: 0.3 },
                backdropFilter: { duration: 0.3 }
              }
            }}
            exit={{ 
              opacity: 0, 
              backdropFilter: 'blur(0px)',
              transition: {
                opacity: { duration: 0.2 },
                backdropFilter: { duration: 0.2 }
              }
            }}
            onClick={onClose}
          />
          
          <motion.div
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-xl shadow-xl z-50 ${className}`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: {
                type: 'spring',
                damping: 25,
                stiffness: 300
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9, 
              y: 20,
              transition: {
                type: 'spring',
                damping: 25,
                stiffness: 300
              }
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
