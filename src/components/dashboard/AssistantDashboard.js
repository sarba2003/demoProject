'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const assignedTasks = [
  {
    id: 1,
    title: 'Homepage Design Implementation',
    description: 'Implement the new homepage design according to the provided mockup',
    status: 'In Progress',
    progress: 75,
    deadline: '2024-02-28',
    priority: 'High'
  },
  {
    id: 2,
    title: 'User Authentication Flow',
    description: 'Develop login and registration functionality',
    status: 'Pending',
    progress: 0,
    deadline: '2024-03-15',
    priority: 'Medium'
  },
  {
    id: 3,
    title: 'Navigation Menu Styling',
    description: 'Apply new styling to the navigation menu components',
    status: 'Completed',
    progress: 100,
    deadline: '2024-02-20',
    priority: 'Low'
  }
];

const statusUpdates = [
  {
    id: 1,
    taskId: 1,
    status: 'In Progress',
    notes: 'Completed main section, working on responsive design',
    hoursWorked: 6,
    lastUpdated: '2024-02-15'
  },
  {
    id: 2,
    taskId: 3,
    status: 'Completed',
    notes: 'All styling implemented and tested across browsers',
    hoursWorked: 4,
    lastUpdated: '2024-02-20'
  }
];

export default function AssistantDashboard() {
  const [activeTab, setActiveTab] = useState('tasks');

  const tabs = [
    { id: 'tasks', label: 'My Tasks' },
    { id: 'status', label: 'Update Status' }
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
              Assigned Subtasks
            </h2>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-inner">
              <div className="space-y-4">
                {assignedTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{task.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          task.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>{task.status}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          task.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>{task.priority}</span>
                      </div>
                    </div>
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
                        <span>Due: {task.deadline}</span>
                        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-300">
                          Update Status
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'status' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Task Status Update
            </h2>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-inner">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                >
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Select Task
                      </label>
                      <select className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {assignedTasks.map(task => (
                          <option key={task.id} value={task.id}>{task.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status
                      </label>
                      <select className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Hours Worked
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter hours worked"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Notes
                      </label>
                      <textarea
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="Add any notes or comments"
                      ></textarea>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg
                               shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300
                               font-semibold text-lg"
                    >
                      Submit Update
                    </motion.button>
                  </form>
                </motion.div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Recent Updates</h3>
                  {statusUpdates.map((update) => (
                    <motion.div
                      key={update.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {assignedTasks.find(task => task.id === update.taskId)?.title}
                        </h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          update.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          update.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>{update.status}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">{update.notes}</p>
                      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>Hours: {update.hoursWorked}</span>
                        <span>Updated: {update.lastUpdated}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}