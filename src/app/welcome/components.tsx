'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, FileText, MessageSquare } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg ${className}`}>
    {children}
  </div>
);

const WidgetTitle = ({ icon: Icon, title }: { icon: React.ElementType, title: string }) => (
  <div className="flex items-center gap-2 p-4 border-b border-white/10">
    <Icon className="w-5 h-5 text-gray-300" />
    <h3 className="font-semibold text-white">{title}</h3>
  </div>
);

export const DemoDashboard = ({ isVisible }: { isVisible: boolean }) => (
  <motion.div
    className="w-full max-w-4xl mx-auto grid grid-cols-3 grid-rows-2 gap-4"
    initial="hidden"
    animate={isVisible ? 'visible' : 'hidden'}
    transition={{ staggerChildren: 0.1 }}
  >
    <motion.div variants={cardVariants} className="col-span-2">
      <GlassCard className="h-full">
        <WidgetTitle icon={CheckCircle} title="Tasks" />
        <div className="p-4 space-y-2 text-sm">
          <p className="text-gray-200">- Write Literature Review</p>
          <p className="text-gray-200">- Prepare Presentation Slides</p>
          <p className="text-gray-200">- Final Draft Submission</p>
        </div>
      </GlassCard>
    </motion.div>
    <motion.div variants={cardVariants}>
      <GlassCard className="h-full">
        <WidgetTitle icon={Clock} title="Timeline" />
        <div className="p-4 space-y-2 text-sm">
          <p className="text-gray-200">Final Due Date:</p>
          <p className="font-bold text-white">Oct 25, 2025</p>
        </div>
      </GlassCard>
    </motion.div>
    <motion.div variants={cardVariants}>
      <GlassCard className="h-full">
        <WidgetTitle icon={FileText} title="Files" />
        <div className="p-4 text-sm text-gray-300">Your team's files will appear here.</div>
      </GlassCard>
    </motion.div>
    <motion.div variants={cardVariants} className="col-span-2">
      <GlassCard className="h-full">
        <WidgetTitle icon={MessageSquare} title="Team Chat" />
        <div className="p-4 text-sm text-gray-300">A dedicated space for your team to collaborate.</div>
      </GlassCard>
    </motion.div>
  </motion.div>
);
