'use client';

import { motion } from 'framer-motion';
import { FileText, UploadCloud, Copy, ArrowRight } from 'lucide-react';
import { Button as MantineButton } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function SyllabusPage() {
  const router = useRouter();

  const options = [
    {
      icon: Copy,
      title: 'Use Same Syllabus',
      description: 'Leverage an existing project structure that has been proven to work',
      action: 'Use Existing',
      route: '/syllabus/use-same',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: UploadCloud,
      title: 'Upload New Syllabus',
      description: 'Upload your course document and let AI create the perfect structure',
      action: 'Upload Document',
      route: '/syllabus/upload',
      color: 'from-green-500 to-emerald-600'
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Choose Your Path</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select how you'd like to get started with your project. You can either use an existing 
            syllabus structure or upload a new one for AI analysis.
          </p>
        </motion.div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {options.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => router.push(option.route)}
            >
              <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <option.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{option.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {option.description}
                </p>
                
                <MantineButton
                  rightSection={<ArrowRight size={16} />}
                  size="lg"
                  radius="md"
                  className="w-full group-hover:scale-105 transition-transform duration-300"
                >
                  {option.action}
                </MantineButton>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MantineButton
            variant="subtle"
            onClick={() => router.push('/welcome')}
            size="lg"
            radius="md"
          >
            Back to Welcome
          </MantineButton>
        </motion.div>
      </motion.div>
    </main>
  );
}
