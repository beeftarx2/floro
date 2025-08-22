'use client';

import { motion, AnimatePresence } from 'framer-motion';

export const ScrollingText = ({ text, isFirstMessage = false }: { text: string; isFirstMessage?: boolean }) => {
  return (
    <div className="h-[8rem] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h1
          key={text}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="text-xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[4rem] text-white p-4"
        >
          {text}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};
