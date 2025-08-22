'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ScrollingText } from '@/app/components/ScrollingText';
import { Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud } from 'lucide-react';
import { Button as MantineButton } from '@mantine/core';
import { DemoDashboard } from './components'; 
import { ProfileModal } from './ProfileModal';

export default function WelcomePage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0=loader, 1=msg1, 2=msg2, 3=msg3, 4=options
  const [userName, setUserName] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Step 1: Initialize and fetch user
  useEffect(() => {
    const init = async () => {
      try {
        const supabase = createClient();
        if (supabase) {
          const { data: { user } } = await supabase.auth.getUser();
          
          if (user) {
            setUserName(user.user_metadata?.full_name || 'Welcome');
            // Start message sequence
            setTimeout(() => setStep(1), 1000);
          } else {
            setUserName('Welcome');
            setTimeout(() => setStep(1), 1000);
          }
        } else {
          setUserName('Welcome');
          setTimeout(() => setStep(1), 1000);
        }
      } catch (error) {
        console.error('Init error:', error);
        setUserName('Welcome');
        setTimeout(() => setStep(1), 1000);
      }
    };
    
    init();
  }, []);

  // Step 2: Message sequence timing
  useEffect(() => {
    if (step === 0) return; // Don't start until initialized

    const timers: NodeJS.Timeout[] = [];
    
    if (step === 1) {
      timers.push(setTimeout(() => setStep(2), 3500));
    }
    
    if (step === 2) {
      timers.push(setTimeout(() => setStep(3), 3500));
    }
    
    if (step === 3) {
      timers.push(setTimeout(() => setStep(4), 3500));
    }

    // Cleanup all timers
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [step]);

  const handleStartProcess = () => {
    setIsParsing(true);
    setTimeout(() => {
      setIsParsing(false);
      setShowDashboard(true);
    }, 2000);
  };

  // Show loading spinner
  if (step === 0) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 text-white bg-gradient-to-br from-[#1E293B] to-[#4C1D95]">
        <Loader className="animate-spin text-white" size={48} />
      </main>
    );
  }

  // Show message sequence
  if (step >= 1 && step <= 3) {
    const messages = [
      `Hello, ${userName}`,
      'Welcome to the future of group projects.',
      'Now, let\'s start your first project.'
    ];

    const currentMessage = messages[step - 1];
    return (
      <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 text-white bg-gradient-to-br from-[#1E293B] to-[#4C1D95]">
        <ScrollingText text={currentMessage} isFirstMessage={step === 1} />
      </main>
    );
  }

  // Show syllabus options after sequence
  if (step === 4) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 text-white bg-gradient-to-br from-[#1E293B] to-[#4C1D95]">
        <ProfileModal opened={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl font-bold mb-4">Welcome to Floro</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-xl">
            Let's organize your first project. Use an existing syllabus or upload a new one.
          </p>
          
          <div className="space-y-4">
            <MantineButton 
              onClick={() => router.push('/syllabus/use-same')}
              leftSection={<UploadCloud size={20} />} 
              size="lg" 
              radius="md"
              className="w-full md:w-auto"
            >
              Use Same Syllabus
            </MantineButton>
            
            <MantineButton 
              onClick={() => router.push('/syllabus')}
              variant="outline"
              size="lg" 
              radius="md"
              className="w-full md:w-auto"
            >
              Upload New Syllabus
            </MantineButton>
            
            <MantineButton 
              onClick={handleStartProcess} 
              variant="subtle"
              size="sm" 
              radius="md"
              className="w-full md:w-auto"
            >
              Use Sample Syllabus (Demo)
            </MantineButton>
          </div>
        </motion.div>
      </main>
    );
  }

  // Show loading spinner while parsing
  if (isParsing) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 text-white bg-gradient-to-br from-[#1E293B] to-[#4C1D95]">
        <Loader className="animate-spin text-white" size={48} />
        <p className="mt-4 text-xl">Processing your syllabus...</p>
      </main>
    );
  }

  // Show demo dashboard after processing
  if (showDashboard) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 text-white bg-gradient-to-br from-[#1E293B] to-[#4C1D95]">
        <ProfileModal opened={isModalOpen} onClose={() => setIsModalOpen(false)} />
        
        <DemoDashboard isVisible={showDashboard} />
        
        <motion.div
          key="cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-center bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20"
        >
          <h2 className="text-2xl font-bold mb-2">Ready to start your own?</h2>
          <p className="text-gray-300 mb-4">Create your profile to save this project and unlock all features.</p>
          <MantineButton size="lg" radius="md" onClick={() => setIsModalOpen(true)}>
            Create My Profile
          </MantineButton>
        </motion.div>
      </main>
    );
  }

  // Fallback
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 text-white bg-gradient-to-br from-[#1E293B] to-[#4C1D95]">
      <Loader className="animate-spin text-white" size={48} />
    </main>
  );
}
