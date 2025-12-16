'use client';

import { motion } from 'framer-motion';

export function LiveIndicator() {
  return (
    <div className="flex items-center space-x-1">
      <motion.div
        className="w-2 h-2 bg-danger-500 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <span className="text-xs font-bold text-danger-500">LIVE</span>
    </div>
  );
}