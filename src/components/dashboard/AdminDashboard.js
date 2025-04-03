'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const dummyTasks = [
  {
    id: 1,
    title: 'Q4 Marketing Campaign',
    description: 'Plan and execute Q4 marketing initiatives',
    status: 'In Progress',
    progress: 65,
    assignedTo: 'Marketing Team',
    deadline: '2024-03-31'
  },
  {
    id: 2,
    title: 'Product Launch',
    description: 'New product feature rollout',
    status: 'Pending',
    progress: 25,
    assignedTo: 'Product Team',
    deadline: '2024-04-15'
  },
  {
    id: 3,
    title: 'Customer Support Enhancement',
    description: 'Improve response time and satisfaction',
    status: 'Completed',
    progress: 100,
    assignedTo: 'Support Team',
    deadline: '2024-02-28'
  }
];

const progressMetrics = {
  pending: 5,
  inProgress: 8,
  completed: 12,
  delayed: 3
};

const recentReports = [
  {
    id: 1,
    title: 'Monthly Progress Summary',
    date: '2024-02-01',
    type: 'Progress Report',
    hours: 120
  },
  {
    id: 2,
    title: 'Team Performance Analysis',
    date: '2024-01-25',
    type: 'Performance Report',
    hours: 85
  },
  {
    id: 3,
    title: 'Resource Allocation Review',
    date: '2024-01-15',
    type: 'Resource Report',
    hours: 95
  }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    assignedTo: '',
    priority: 'Medium'
  });

  const tabs = [
    { id: 'tasks', label: 'Master Tasks' },
    { id: 'progress', label: 'Task Progress' },
    { id: 'reports', label: 'Reports' }
  ];

  return (
    <div>
      <div className="flex gap-4 mb-6 justify-center">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-300/50 dark:shadow-blue-900/50'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md'
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl"
      >
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Master Tasks Management
            </h2>
            <div className="grid gap-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 font-semibold text-lg"
              >
                Create New Master Task
              </motion.button>

              {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg shadow-2xl"
                  >
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                      Create New Master Task
                    </h3>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        toast.success('Task created successfully!');
                        setShowCreateModal(false);
                        setFormData({
                          title: '',
                          description: '',
                          deadline: '',
                          assignedTo: '',
                          priority: 'Medium'
                        });
                      }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter task title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Description
                        </label>
                        <textarea
                          required
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows="4"
                          placeholder="Enter task description"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Deadline
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.deadline}
                          onChange={(e) =>
                            setFormData({ ...formData, deadline: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Assign To
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.assignedTo}
                          onChange={(e) =>
                            setFormData({ ...formData, assignedTo: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter team or person name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Priority
                        </label>
                        <select
                          value={formData.priority}
                          onChange={(e) =>
                            setFormData({ ...formData, priority: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                      <div className="flex justify-end gap-3 mt-6">
                        <button
                          type="button"
                          onClick={() => setShowCreateModal(false)}
                          className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
                        >
                          Create Task
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </div>
              )}

              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-inner">
                <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
                  Assigned Tasks
                </h3>
                <div className="space-y-4">
                  {dummyTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {task.title}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            task.status === 'Completed'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : task.status === 'In Progress'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {task.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                          <span>Assigned: {task.assignedTo}</span>
                          <span>Due: {task.deadline}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Task Progress Tracking
            </h2>
            <div className="grid gap-6">
              <div className="grid grid-cols-4 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 p-6 rounded-xl shadow-lg"
                >
                  <h4 className="text-blue-700 dark:text-blue-200 font-semibold mb-2">
                    Pending
                  </h4>
                  <span className="text-3xl font-bold text-blue-800 dark:text-blue-100">
                    {progressMetrics.pending}
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 p-6 rounded-xl shadow-lg"
                >
                  <h4 className="text-yellow-700 dark:text-yellow-200 font-semibold mb-2">
                    In Progress
                  </h4>
                  <span className="text-3xl font-bold text-yellow-800 dark:text-yellow-100">
                    {progressMetrics.inProgress}
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 p-6 rounded-xl shadow-lg"
                >
                  <h4 className="text-green-700 dark:text-green-200 font-semibold mb-2">
                    Completed
                  </h4>
                  <span className="text-3xl font-bold text-green-800 dark:text-green-100">
                    {progressMetrics.completed}
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900 dark:to-red-800 p-6 rounded-xl shadow-lg"
                >
                  <h4 className="text-red-700 dark:text-red-200 font-semibold mb-2">
                    Delayed
                  </h4>
                  <span className="text-3xl font-bold text-red-800 dark:text-red-100">
                    {progressMetrics.delayed}
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Task Reports
            </h2>
            <div className="grid gap-6">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
                  Completion Reports
                </h3>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                            {report.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {report.type}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {report.date}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
                  Time Logs
                </h3>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                            {report.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Hours Logged: {report.hours}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {report.date}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
