'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Loader2, CheckCircle, Users, Calendar, Target } from 'lucide-react';

const analysisSteps = [
  {
    id: 1,
    title: 'Analyzing Document Structure',
    description: 'Extracting project requirements and deliverables',
    icon: FileText,
    duration: 2000
  },
  {
    id: 2,
    title: 'Identifying Team Roles',
    description: 'Mapping out collaboration structure and responsibilities',
    icon: Users,
    duration: 2500
  },
  {
    id: 3,
    title: 'Creating Timeline',
    description: 'Building project schedule with milestones and deadlines',
    icon: Calendar,
    duration: 3000
  },
  {
    id: 4,
    title: 'Setting Objectives',
    description: 'Defining clear goals and success criteria',
    icon: Target,
    duration: 2000
  }
];

export default function AnalyzingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentStep >= analysisSteps.length) {
      setIsComplete(true);
      return;
    }

    const step = analysisSteps[currentStep];
    const timer = setTimeout(() => {
      setCompletedSteps(prev => [...prev, step.id]);
      setCurrentStep(prev => prev + 1);
    }, step.duration);

    return () => clearTimeout(timer);
  }, [currentStep]);

  useEffect(() => {
    if (isComplete) {
      // Redirect to demo dashboard after completion
      const timer = setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 text-white bg-gradient-to-br from-[#1E293B] to-[#4C1D95]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Analyzing Your Syllabus</h1>
          <p className="text-xl text-gray-300">
            We're processing your document to create the perfect project structure
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="space-y-6 mb-12">
          {analysisSteps.map((step, index) => {
            const isActive = currentStep === index;
            const isCompleted = completedSteps.includes(step.id);
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center space-x-4 p-4 rounded-xl border transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-500/20 border-green-500/30' 
                    : isActive 
                    ? 'bg-indigo-500/20 border-indigo-500/30' 
                    : 'bg-white/5 border-white/10'
                }`}
              >
                {/* Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-green-500' 
                    : isActive 
                    ? 'bg-indigo-500' 
                    : 'bg-gray-600'
                }`}>
                  <AnimatePresence mode="wait">
                    {isCompleted ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <CheckCircle className="w-6 h-6 text-white" />
                      </motion.div>
                    ) : isActive ? (
                      <motion.div
                        key="loading"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 className="w-6 h-6 text-white" />
                      </motion.div>
                    ) : (
                      <step.icon className="w-6 h-6 text-gray-400" />
                    )}
                  </AnimatePresence>
                </div>

                {/* Content */}
                <div className="flex-1 text-left">
                  <h3 className={`font-semibold text-lg ${
                    isCompleted ? 'text-green-400' : isActive ? 'text-indigo-400' : 'text-gray-300'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>

                {/* Status */}
                <div className="flex-shrink-0">
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Completion Message */}
        <AnimatePresence mode="wait">
          {isComplete && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-500/20 border border-green-500/30 rounded-2xl p-6"
            >
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-400 mb-2">Analysis Complete!</h2>
              <p className="text-gray-300">
                Your project structure has been created successfully. Redirecting to dashboard...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
