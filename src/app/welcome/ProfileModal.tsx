'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button as MantineButton, TextInput, Select, Switch, Modal } from '@mantine/core';

// TODO: Add profanity filtering back with correct import
const hasProfanity = (text: string) => {
  const badWords = ['inappropriate', 'bad', 'word']; // Simple placeholder
  return badWords.some(word => text.toLowerCase().includes(word));
};

export const ProfileModal = ({ opened, onClose }: { opened: boolean; onClose: () => void; }) => {
  const [profileData, setProfileData] = useState({ username: '', year: '' });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSaveProfile = async () => {
    setIsLoading(true);
    if (!profileData.username || !profileData.year) {
      alert('Please complete all required fields.');
      setIsLoading(false);
      return;
    }
    if (hasProfanity(profileData.username)) {
      alert('Username contains inappropriate language.');
      setIsLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase.from('profiles').update({
        username: profileData.username,
        year: profileData.year,
        onboarding_complete: true
      }).eq('id', user.id);

      if (error) {
        alert('Error saving profile: ' + error.message);
      } else {
        router.push('/dashboard');
      }
    }
    setIsLoading(false);
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Create Your Profile" centered radius="lg">
      <div className="space-y-4">
        <Select
          label="What is your current year?"
          placeholder="Select your year"
          data={['Freshman', 'Sophomore', 'Junior', 'Senior']}
          value={profileData.year}
          onChange={(value) => setProfileData(p => ({ ...p, year: value || '' }))}
        />
        <TextInput
          label="Choose a Username"
          placeholder="e.g., ryan_the_designer"
          value={profileData.username}
          onChange={(event) => {
            const value = event?.currentTarget?.value || '';
            setProfileData(p => ({ ...p, username: value }));
          }}
        />
        <MantineButton onClick={handleSaveProfile} fullWidth loading={isLoading}>
          Save and Continue
        </MantineButton>
      </div>
    </Modal>
  );
};
