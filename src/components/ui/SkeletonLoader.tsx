'use client';

import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  type: 'patients' | 'medecins' | 'administration' | 'card';
  count?: number;
}

export default function SkeletonLoader({ type, count = 9 }: SkeletonLoaderProps) {
  // Animation pour l'effet de shimmer
  const shimmerAnimation = {
    initial: { x: '-100%' },
    animate: { 
      x: '100%',
      transition: { 
        repeat: Infinity, 
        duration: 1.5,
        ease: 'linear'
      }
    }
  };

  // Rendu pour les patients
  if (type === 'patients') {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-32 bg-gray-200 rounded relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              variants={shimmerAnimation}
              initial="initial"
              animate="animate"
            />
          </div>
          <div className="h-10 w-40 bg-gray-200 rounded relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              variants={shimmerAnimation}
              initial="initial"
              animate="animate"
            />
          </div>
        </div>
        <div className="h-16 bg-gray-200 rounded relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            variants={shimmerAnimation}
            initial="initial"
            animate="animate"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="h-32 bg-gray-200 rounded relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                variants={shimmerAnimation}
                initial="initial"
                animate="animate"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Rendu pour les médecins
  if (type === 'medecins') {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-32 bg-gray-200 rounded relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              variants={shimmerAnimation}
              initial="initial"
              animate="animate"
            />
          </div>
          <div className="h-10 w-40 bg-gray-200 rounded relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              variants={shimmerAnimation}
              initial="initial"
              animate="animate"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="h-48 bg-gray-200 rounded relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                variants={shimmerAnimation}
                initial="initial"
                animate="animate"
              />
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-300 rounded-b"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Rendu pour l'administration
  if (type === 'administration') {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-40 bg-gray-200 rounded relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              variants={shimmerAnimation}
              initial="initial"
              animate="animate"
            />
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              variants={shimmerAnimation}
              initial="initial"
              animate="animate"
            />
          </div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-16 bg-gray-200 rounded relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                variants={shimmerAnimation}
                initial="initial"
                animate="animate"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Rendu par défaut pour les cartes
  return (
    <div className="h-32 bg-gray-200 rounded relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
        variants={shimmerAnimation}
        initial="initial"
        animate="animate"
      />
    </div>
  );
}
