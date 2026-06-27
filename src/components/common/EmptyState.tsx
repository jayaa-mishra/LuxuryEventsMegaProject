import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
  subMessage?: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = 'No data available',
  subMessage,
  icon,
  imageSrc,
  action
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center justify-center p-12 w-full min-h-[40vh] bg-blush/30 rounded-lg border border-plum/5 relative overflow-hidden group"
  >
    {imageSrc ? (
      <div className="w-full max-w-sm aspect-[16/9] mb-8 relative overflow-hidden rounded-sm mix-blend-multiply opacity-80 grayscale group-hover:grayscale-0 transition-all duration-700">
        <img src={imageSrc} alt="Empty State Illustration" className="object-cover w-full h-full" />
      </div>
    ) : (
      <div className="w-16 h-16 rounded-full bg-rose/5 flex items-center justify-center text-rose mb-6 shadow-sm">
        {icon || <FolderOpen size={32} strokeWidth={1.5} />}
      </div>
    )}
    <h3 className="text-xl font-serif text-plum mb-2 text-center">{message}</h3>
    {subMessage && (
      <p className="text-plum/50 font-sans text-sm text-center max-w-sm mb-8">{subMessage}</p>
    )}
    {action && (
      <div className="mt-2 relative z-10">
        {action}
      </div>
    )}
  </motion.div>
);
