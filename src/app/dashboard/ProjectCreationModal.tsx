'use client';

import { Modal, Button as MantineButton, Tabs, Textarea, FileInput } from '@mantine/core';

// --- Section: InputBox Component ---
// This section defines a reusable component for the input areas.
// It uses Mantine's Tabs component to allow switching between file upload and text paste.
const InputBox = ({ title }: { title: string }) => (
  <div className="flex-1 bg-white/5 p-4 rounded-lg border border-white/10">
    <h3 className="font-semibold text-white mb-4 text-center">{title}</h3>
    <Tabs defaultValue="upload">
      <Tabs.List grow>
        <Tabs.Tab value="upload">Upload File</Tabs.Tab>
        <Tabs.Tab value="paste">Paste Text</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="upload" pt="xs">
        <FileInput placeholder="Select a file (.pdf, .docx)" />
      </Tabs.Panel>
      <Tabs.Panel value="paste" pt="xs">
        <Textarea placeholder="Paste your text here..." minRows={4} />
      </Tabs.Panel>
    </Tabs>
  </div>
);

// --- Section: ProjectCreationModal Component ---
// This is the main component for the modal.
// It orchestrates the layout and includes a placeholder for the AI parsing logic.
export const ProjectCreationModal = ({ opened, onClose }: { opened: boolean; onClose: () => void; }) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Create a New Project" centered size="xl" radius="lg">
      <div className="text-gray-700">
        <p className="text-sm text-gray-500 mb-4">Provide your syllabus and project instructions. Our AI will do the rest.</p>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <InputBox title="Add Syllabus" />
          <InputBox title="Add Project Instructions" />
        </div>
        <div className="text-center">
          <MantineButton 
            onClick={() => alert('AI Parsing to be implemented!')}
          >
            Create Project
          </MantineButton>
        </div>
      </div>
    </Modal>
  );
};
