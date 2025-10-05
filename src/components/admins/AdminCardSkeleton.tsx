'use client';

import { motion } from 'framer-motion';

interface AdminCardSkeletonProps {
  index: number;
}

export default function AdminCardSkeleton({ index }: AdminCardSkeletonProps) {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: index * 0.05
      }
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md p-4"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      </div>
      <div className="h-1 bg-gray-200 mt-4 animate-pulse"></div>
    </motion.div>
  );
}
