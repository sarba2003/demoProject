'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import ManagerDashboard from '@/components/dashboard/ManagerDashboard';
import AssistantDashboard from '@/components/dashboard/AssistantDashboard';

export default function Dashboard() {
  const [userRole, setUserRole] = useState('admin');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-900 text-white transition-colors duration-300"
    >
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-4xl font-bold mb-8 text-center text-white"
        >
          Task Management Dashboard
        </motion.h1>

        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-gray-200 bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white shadow-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300 hover:border-blue-400"
          >
            <option value="admin">Admin Dashboard</option>
            <option value="manager">Manager Dashboard</option>
            <option value="assistant">Assistant Dashboard</option>
          </select>
        </motion.div>

        <motion.div
          key={userRole}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700 transition-all duration-300"
        >
          {userRole === 'admin' && <AdminDashboard />}
          {userRole === 'manager' && <ManagerDashboard />}
          {userRole === 'assistant' && <AssistantDashboard />}
        </motion.div>
      </div>
    </motion.div>
  );
}