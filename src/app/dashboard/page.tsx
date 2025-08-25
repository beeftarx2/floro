'use client';

import { useState } from 'react';
import { Button as MantineButton } from '@mantine/core';
import { Plus, FileText } from 'lucide-react';
import { ProjectCreationModal } from './ProjectCreationModal';

// --- Section: Main Dashboard Component ---
// This section defines the main dashboard page.
// It manages the state for the project list and the visibility of the creation modal.
export default function DashboardPage() {
  // --- Section: State Management ---
  // This section is responsible for managing the component's state.
  // `projects` will hold the user's project data, and `isModalOpen` controls the modal.
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Section: JSX Render ---
  // This section is responsible for rendering the UI.
  // It conditionally renders either the EmptyState or the ProjectView based on whether projects exist.
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1E293B] to-[#4C1D95] text-white">
      <ProjectCreationModal opened={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {projects.length === 0 
        ? <EmptyState onCreateProject={() => setIsModalOpen(true)} /> 
        : <ProjectView projects={projects} onCreateProject={() => setIsModalOpen(true)} />
      }
    </div>
  );
}

// --- Section: Empty State View ---
// This component is shown when a user has no projects.
// Its purpose is to guide the user to their first action: creating a project.
const EmptyState = ({ onCreateProject }: { onCreateProject: () => void }) => (
  <main className="flex h-screen items-center justify-center">
    <div className="text-center flex flex-col items-center">
      <div className="w-40 h-40 bg-white/5 rounded-full mb-8 flex items-center justify-center border-2 border-white/10">
        <FileText size={60} className="text-white/20" />
      </div>
      <h2 className="text-3xl font-bold text-white">Let's turn chaos into clarity.</h2>
      <p className="text-gray-300 mt-2 mb-6 max-w-md">
        Create your first project by uploading your syllabus to get started.
      </p>
      <MantineButton 
        size="lg" 
        radius="md"
        onClick={onCreateProject}
      >
        Create Your First Project
      </MantineButton>
    </div>
  </main>
);

// --- Section: Populated Project View (Command Center) ---
// This component is shown when a user has active projects.
// It includes the main header and the grid for displaying project cards.
const ProjectView = ({ projects, onCreateProject }: { projects: any[], onCreateProject: () => void }) => (
  <div>
    <header className="p-4 flex justify-between items-center border-b border-white/10">
      <h1 className="text-xl font-bold">Floro</h1>
      <MantineButton 
        leftSection={<Plus size={16} />}
        onClick={onCreateProject}
        radius="md"
      >
        Create New Project
      </MantineButton>
    </header>
    <main className="p-8">
      <ProjectGrid projects={projects} />
    </main>
  </div>
);

// --- Section: Project Grid Component ---
// This component is responsible for laying out the 'Smart Project Cards'.
// It is currently a placeholder.
const ProjectGrid = ({ projects }: { projects: any[] }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
    {/* We will build the 'Smart Project Cards' here in a future step */}
    <p>Project cards will be displayed here.</p>
  </div>
);