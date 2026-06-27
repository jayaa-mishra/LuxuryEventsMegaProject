import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => (
  <motion.div 
    initial={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
    className={`bg-rose/10 rounded-sm ${className}`}
  />
);

export const DashboardSkeleton = () => (
  <div className="space-y-8 animate-fade-in w-full">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="p-6 bg-white border border-plum/5 rounded-sm shadow-sm h-32 flex flex-col justify-between">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-16 h-8" />
        </div>
      ))}
    </div>
    <div className="bg-white p-6 border border-plum/5 rounded-sm shadow-sm h-96">
      <Skeleton className="w-48 h-6 mb-8" />
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map(i => (
          <Skeleton key={i} className="w-full h-12" />
        ))}
      </div>
    </div>
  </div>
);
