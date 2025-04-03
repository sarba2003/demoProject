'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const masterTasks = [
  {
    id: 1,
    title: 'Website Redesign',
    deadline: '2024-03-15',
    priority: 'High',
    status: 'In Progress',
    progress: 60
  },
  {
    id: 2,
    title: 'Mobile App Development',
    deadline: '2024-04-30',
    priority: 'Medium',
    status: 'Planning',
    progress: 20
  },
  {
    id: 3,
    title: 'Content Strategy',
    deadline: '2024-03-01',
    priority: 'Low',
    status: 'Completed',
    progress: 100
  }
];

const subtasks = [
  {
    id: 1,
    masterTaskId: 1,
    title: 'Homepage Design',
    assignedTo: 'John Doe',
    status: 'In Progress',
    deadline: '2024-02-28'
  },
  {
    id: 2,
    masterTaskId: 1,
    title: 'Navigation Menu',
    assignedTo: 'Jane Smith',
    status: 'Completed',
    deadline: '2024-02-20'
  },
  {
    id: 3,
    masterTaskId: 2,
    title: 'User Authentication',
    assignedTo: 'Mike Johnson',
    status: 'Planning',
    deadline: '2024-03-15'
  }
];

const assistantProgress = [
  {
    id: 1,
    name: 'John Doe',
    tasksCompleted: 15,
    currentTasks: 3,
    efficiency: 92
  },
  {
    id: 2,
    name: 'Jane Smith',
    tasksCompleted: 12,
    currentTasks: 4,
    efficiency: 88
  },
  {
    id: 3,
    name: 'Mike Johnson',
    tasksCompleted: 10,
    currentTasks: 2,
    efficiency: 95
  }
];

export default function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState('masterTasks');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    deadline: '',
    priority: 'Medium',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock successful API response
    const newTask = {
      id: masterTasks.length + 1,
      ...formData,
      status: 'Planning',
      progress: 0
    };

    masterTasks.push(newTask);
    setIsSubmitting(false);
    setShowCreateForm(false);
    setFormData({
      title: '',
      deadline: '',
      priority: 'Medium',
      description: ''
    });
  };

  const tabs = [
    { id: 'masterTasks', label: 'Master Tasks' },
    { id: 'subtasks', label: 'Subtasks' },
    { id: 'progress', label: 'Progress' }
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
        {activeTab === 'masterTasks' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Assigned Master Tasks
            </h2>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-inner">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCreateForm(true)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg
                         shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300
                         font-semibold text-lg mb-6"
              >
                Create New Task
              </motion.button>

              {showCreateForm && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6"
                >
                  <form onSubmit={handleCreateTask} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Task Title
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                                 dark:text-white"
                        placeholder="Enter task title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Deadline
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                                 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Priority
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                                 dark:text-white"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                                 dark:text-white"
                        rows="3"
                        placeholder="Enter task description"
                      />
                    </div>

                    <div className="flex gap-3 justify-end">
                      <button
                        type="button"
                        onClick={() => setShowCreateForm(false)}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Creating...' : 'Create Task'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              <div className="space-y-4">
                {masterTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{task.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        task.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>{task.priority}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Status: {task.status}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Due: {task.deadline}</span>
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
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'subtasks' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Subtasks Management
            </h2>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-inner">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCreateForm(true)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg
                         shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300
                         font-semibold text-lg mb-6"
              >
                Create New Task
              </motion.button>

              {showCreateForm && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6"
                >
                  <form onSubmit={handleCreateTask} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Task Title
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                                 dark:text-white"
                        placeholder="Enter task title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Deadline
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                                 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Priority
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                                 dark:text-white"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                                 dark:text-white"
                        rows="3"
                        placeholder="Enter task description"
                      />
                    </div>

                    <div className="flex gap-3 justify-end">
                      <button
                        type="button"
                        onClick={() => setShowCreateForm(false)}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                                 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Creating...' : 'Create Task'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg
                           shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300
                           font-semibold text-lg mb-6"
                >
                  Create New Subtask
                </motion.button>
                {subtasks.map((subtask) => (
                  <motion.div
                    key={subtask.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{subtask.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Assigned to: {subtask.assignedTo}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        subtask.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        subtask.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>{subtask.status}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Due: {subtask.deadline}</span>
                      <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-300">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'progress' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Assistant Progress
            </h2>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-inner">
              <div className="space-y-6">
                {assistantProgress.map((assistant) => (
                  <motion.div
                    key={assistant.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{assistant.name}</h3>
                        <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>Completed: {assistant.tasksCompleted}</span>
                          <span>Current: {assistant.currentTasks}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{assistant.efficiency}%</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Efficiency</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${assistant.efficiency}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}