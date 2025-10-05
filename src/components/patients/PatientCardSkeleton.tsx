'use client';

import { motion } from 'framer-motion';

interface PatientCardSkeletonProps {
  index: number;
}

export default function PatientCardSkeleton({ index }: PatientCardSkeletonProps) {
  // Animation variants
  const skeletonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: 'easeOut'
      }
    })
  };

  // Animation pour le shimmer effect
  const shimmerVariants = {
    initial: {
      x: '-100%'
    },
    animate: {
      x: '100%',
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: 'linear'
      }
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md"
      variants={skeletonVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
          </div>
          
          <div className="flex-1">
            <div className="h-5 w-32 bg-gray-200 rounded mb-2 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
              />
            </div>
            <div className="h-4 w-24 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
              />
            </div>
          </div>
          
          <div className="h-8 w-20 bg-gray-200 rounded-full relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
          </div>
        </div>
      </div>
      
      <div className="h-1 bg-gray-200 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
        />
      </div>
    </motion.div>
  );
}
