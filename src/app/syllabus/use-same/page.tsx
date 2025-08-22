'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, Users, Calendar, Target } from 'lucide-react';
import { Button as MantineButton } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function UseSameSyllabusPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUseSameSyllabus = () => {
    setIsProcessing(true);
    // Simulate processing time, then redirect to analyzing page
    setTimeout(() => {
      router.push('/syllabus/analyzing');
    }, 1000);
  };

  const features = [
    {
      icon: FileText,
      title: 'Same Course Structure',
      description: 'Use the exact same project breakdown and timeline'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work with your team using proven project organization'
    },
    {
      icon: Calendar,
      title: 'Proven Timeline',
      description: 'Follow a schedule that has been tested and refined'
    },
    {
      icon: Target,
      title: 'Guaranteed Success',
      description: 'Leverage a framework that has worked for others'
    }
  ];

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 text-white bg-gradient-to-br from-[#1E293B] to-[#4C1D95]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-5xl font-bold mb-6">Use Same Syllabus</h1>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Leverage the proven project structure and timeline from your existing syllabus. 
          Get started immediately with a framework that works.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10"
            >
              <feature.icon className="w-8 h-8 text-indigo-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <MantineButton
            onClick={handleUseSameSyllabus}
            leftSection={<UploadCloud size={20} />}
            size="lg"
            radius="md"
            loading={isProcessing}
            className="w-full md:w-auto"
          >
            {isProcessing ? 'Processing...' : 'Use Same Syllabus'}
          </MantineButton>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MantineButton
              variant="outline"
              onClick={() => router.push('/syllabus/upload')}
              size="lg"
              radius="md"
              className="w-full sm:w-auto"
            >
              Upload New Syllabus
            </MantineButton>
            
            <MantineButton
              variant="subtle"
              onClick={() => router.push('/welcome')}
              size="lg"
              radius="md"
              className="w-full sm:w-auto"
            >
              Back to Welcome
            </MantineButton>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
