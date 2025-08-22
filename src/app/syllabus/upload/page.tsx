'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, Users, Calendar, Target } from 'lucide-react';
import { Button as MantineButton } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function UploadSyllabusPage() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (file: File) => {
    setIsUploading(true);
    // Simulate upload and processing
    setTimeout(() => {
      router.push('/syllabus/analyzing');
    }, 2000);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const features = [
    {
      icon: FileText,
      title: 'Smart Document Parsing',
      description: 'AI-powered extraction of project requirements and structure'
    },
    {
      icon: Users,
      title: 'Team Organization',
      description: 'Automatic role assignment and collaboration setup'
    },
    {
      icon: Calendar,
      title: 'Intelligent Timeline',
      description: 'Data-driven project scheduling and milestone creation'
    },
    {
      icon: Target,
      title: 'Goal Setting',
      description: 'Clear objectives and success metrics definition'
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
        <h1 className="text-5xl font-bold mb-6">Upload New Syllabus</h1>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Upload your course syllabus and let our AI create the perfect project structure 
          for your team collaboration.
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

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div
            className={`border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
              dragActive 
                ? 'border-indigo-400 bg-indigo-500/10' 
                : 'border-white/20 bg-white/5'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <UploadCloud 
                className={`w-16 h-16 mx-auto mb-4 transition-colors duration-300 ${
                  dragActive ? 'text-indigo-400' : 'text-gray-400'
                }`} 
              />
              <h3 className="text-xl font-semibold mb-2">
                {dragActive ? 'Drop your syllabus here' : 'Drag & drop your syllabus'}
              </h3>
              <p className="text-gray-400 mb-6">
                or click to browse files
              </p>
              
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileInput}
                disabled={isUploading}
              />
              
              <MantineButton
                component="label"
                htmlFor="file-upload"
                leftSection={<FileText size={20} />}
                size="lg"
                radius="md"
                loading={isUploading}
                disabled={isUploading}
                className="w-full md:w-auto"
              >
                {isUploading ? 'Processing...' : 'Choose File'}
              </MantineButton>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MantineButton
              variant="outline"
              onClick={() => router.push('/syllabus/use-same')}
              size="lg"
              radius="md"
              className="w-full sm:w-auto"
            >
              Use Same Syllabus
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
