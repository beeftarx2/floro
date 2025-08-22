'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader } from 'lucide-react';

export default function LoadingPage() {
  const [step, setStep] = useState(0); // 0=loader, 1=msg1, 2=msg2, 3=msg3, 4=redirect
  const [userName, setUserName] = useState('');
  const router = useRouter();

  // Step 1: Initialize and fetch user
  useEffect(() => {
    const init = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setUserName(user.user_metadata?.full_name || 'Welcome');
          // Start message sequence
          setTimeout(() => setStep(1), 1000);
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Init error:', error);
        router.push('/');
      }
    };
    
    init();
  }, [router]);

  // Step 2: Message sequence timing
  useEffect(() => {
    if (step === 0) return; // Don't start until initialized

    const timers = [];
    
    if (step === 1) {
      // Show first message for 5 seconds
      timers.push(setTimeout(() => setStep(2), 5000));
    }
    
    if (step === 2) {
      // Show second message for 5 seconds
      timers.push(setTimeout(() => setStep(3), 5000));
    }
    
    if (step === 3) {
      // Show third message for 5 seconds, then redirect
      timers.push(setTimeout(() => setStep(4), 5000));
    }
    
    if (step === 4) {
      // Final delay before redirect
      timers.push(setTimeout(() => router.push('/welcome'), 3000));
    }

    // Cleanup all timers
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [step, router]);

  // Render based on current step
  if (step === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#1E293B] to-[#4C1D95]">
        <Loader className="animate-spin text-white" size={48} />
      </main>
    );
  }

  const messages = [
    `Hello, ${userName}`,
    'Welcome to the future of group projects.',
    'Now, let\'s Floro your first project.'
  ];

  const currentMessage = messages[step - 1];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#1E293B] to-[#4C1D95]">
      <h1 
        className="text-xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[4rem] text-white p-4 opacity-0 blur-[20px] translate-y-5 animate-[fadeIn_4.5s_ease-in-out_forwards]"
        style={{
          animation: 'fadeIn 4.5s cubic-bezier(0.42, 0, 0.58, 1) forwards'
        }}
      >
        {currentMessage}
      </h1>
      
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            filter: blur(20px);
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0px);
          }
        }
      `}</style>
    </main>
  );
}
