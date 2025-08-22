'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, FileText, MessageSquare, Users, Calendar, Target, Plus } from 'lucide-react';
import { Button as MantineButton } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: CheckCircle },
    { id: 'tasks', label: 'Tasks', icon: FileText },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'chat', label: 'Chat', icon: MessageSquare }
  ];

  const projectData = {
    title: 'Advanced Software Engineering Project',
    course: 'CS 161 - Software Engineering',
    dueDate: 'December 15, 2025',
    progress: 35,
    tasks: [
      { id: 1, title: 'Project Requirements Analysis', status: 'completed', assignee: 'Team Lead', dueDate: 'Oct 30, 2025' },
      { id: 2, title: 'System Architecture Design', status: 'in-progress', assignee: 'Architect', dueDate: 'Nov 15, 2025' },
      { id: 3, title: 'Database Schema Design', status: 'pending', assignee: 'Database Admin', dueDate: 'Nov 20, 2025' },
      { id: 4, title: 'Frontend Development', status: 'pending', assignee: 'Frontend Dev', dueDate: 'Dec 1, 2025' },
      { id: 5, title: 'Backend API Development', status: 'pending', assignee: 'Backend Dev', dueDate: 'Dec 5, 2025' },
      { id: 6, title: 'Testing & Quality Assurance', status: 'pending', assignee: 'QA Engineer', dueDate: 'Dec 10, 2025' },
      { id: 7, title: 'Documentation & Final Review', status: 'pending', assignee: 'Team Lead', dueDate: 'Dec 15, 2025' }
    ],
    team: [
      { name: 'Alex Chen', role: 'Team Lead', email: 'alex.chen@ucdavis.edu', avatar: 'AC' },
      { name: 'Sarah Johnson', role: 'Architect', email: 'sarah.j@ucdavis.edu', avatar: 'SJ' },
      { name: 'Mike Rodriguez', role: 'Frontend Dev', email: 'mike.r@ucdavis.edu', avatar: 'MR' },
      { name: 'Emily Wang', role: 'Backend Dev', email: 'emily.w@ucdavis.edu', avatar: 'EW' },
      { name: 'David Kim', role: 'Database Admin', email: 'david.k@ucdavis.edu', avatar: 'DK' },
      { name: 'Lisa Thompson', role: 'QA Engineer', email: 'lisa.t@ucdavis.edu', avatar: 'LT' }
    ],
    milestones: [
      { date: 'Oct 30, 2025', title: 'Requirements Finalized', status: 'completed' },
      { date: 'Nov 15, 2025', title: 'Architecture Approved', status: 'in-progress' },
      { date: 'Nov 30, 2025', title: 'Development Phase 1', status: 'pending' },
      { date: 'Dec 10, 2025', title: 'Testing Complete', status: 'pending' },
      { date: 'Dec 15, 2025', title: 'Project Delivery', status: 'pending' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'in-progress': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'pending': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{projectData.title}</h1>
            <p className="text-gray-400">{projectData.course}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Due Date</p>
              <p className="font-semibold">{projectData.dueDate}</p>
            </div>
            <MantineButton
              onClick={() => router.push('/syllabus')}
              leftSection={<Plus size={16} />}
              size="sm"
              radius="md"
            >
              New Project
            </MantineButton>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-6 py-4 bg-gray-800/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Project Progress</span>
          <span className="text-sm text-gray-400">{projectData.progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${projectData.progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="px-6 py-4 border-b border-gray-700">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Content Area */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Tasks Summary */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Tasks Overview</h3>
                <FileText className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Completed</span>
                  <span className="text-green-400 font-semibold">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">In Progress</span>
                  <span className="text-yellow-400 font-semibold">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Pending</span>
                  <span className="text-gray-400 font-semibold">5</span>
                </div>
              </div>
            </div>

            {/* Team Summary */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Team Members</h3>
                <Users className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Members</span>
                  <span className="font-semibold">6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Roles</span>
                  <span className="font-semibold">6</span>
                </div>
              </div>
            </div>

            {/* Timeline Summary */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Timeline</h3>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Days Remaining</span>
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Next Milestone</span>
                  <span className="font-semibold">Nov 15</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'tasks' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Project Tasks</h2>
              <MantineButton size="sm" radius="md">Add Task</MantineButton>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              {projectData.tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border-b border-gray-700 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg border ${getStatusColor(task.status)}`}>
                      {getStatusIcon(task.status)}
                    </div>
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-gray-400">Assigned to {task.assignee}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Due: {task.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'team' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Team Members</h2>
              <MantineButton size="sm" radius="md">Invite Member</MantineButton>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectData.team.map((member) => (
                <div key={member.email} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-semibold">
                      {member.avatar}
                    </div>
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-gray-400">{member.role}</p>
                      <p className="text-xs text-gray-500">{member.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'timeline' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Project Timeline</h2>
              <MantineButton size="sm" radius="md">Add Milestone</MantineButton>
            </div>
            <div className="space-y-4">
              {projectData.milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    milestone.status === 'completed' ? 'bg-green-500 border-green-500' :
                    milestone.status === 'in-progress' ? 'bg-yellow-500 border-yellow-500' :
                    'bg-gray-600 border-gray-500'
                  }`} />
                  <div className="flex-1 bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{milestone.title}</h4>
                        <p className="text-sm text-gray-400">{milestone.date}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        milestone.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        milestone.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {milestone.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'chat' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Team Chat</h2>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Team Collaboration Space</h3>
              <p className="text-gray-400 mb-4">
                This is where your team can discuss project progress, share updates, and collaborate effectively.
              </p>
              <MantineButton size="lg" radius="md">Start Chat</MantineButton>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}