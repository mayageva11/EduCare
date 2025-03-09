// components/EditTaskModal.tsx
import { useState } from 'react';
import { Task } from '@/types/tracking';
import Input from '@/components/Input';
import Button from '@/components/Button';

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onUpdateTask: (taskId: string, taskData: Omit<Task, '_id'>) => void;
}

const EditTaskModal = ({ task, onClose, onUpdateTask }: EditTaskModalProps) => {
  const [taskData, setTaskData] = useState<Omit<Task, '_id'>>({
    title: task.title,
    startDate: task.startDate,
    status: task.status,
    priority: task.priority || 'בינוני',
    notes: task.notes || ''
  });

  // Fixed function with proper typing
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskData.title.trim()) {
      onUpdateTask(task._id, taskData);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-[#2c5282]'>עריכת משימה</h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600'
            aria-label='Close modal'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        <form className='space-y-6' onSubmit={handleSubmit}>
          {/* שם משימה */}
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              שם המשימה
            </label>
            <Input
              id='title'
              type='text'
              name='title'
              value={taskData.title}
              onChange={handleInputChange}
              required
              label={''}
            />
          </div>

          {/* תאריך התחלה */}
          <div>
            <label
              htmlFor='startDate'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              תאריך התחלה
            </label>
            <input
              id='startDate'
              type='date'
              name='startDate'
              value={taskData.startDate}
              onChange={handleInputChange}
              className='w-full px-4 py-2 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
              required
            />
          </div>

          {/* סטטוס */}
          <div>
            <label
              htmlFor='status'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              סטטוס
            </label>
            <select
              id='status'
              name='status'
              value={taskData.status}
              onChange={handleInputChange}
              className='w-full px-4 py-2 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
              required
            >
              <option value='לביצוע'>לביצוע</option>
              <option value='בתהליך'>בתהליך</option>
              <option value='הושלם'>הושלם</option>
              <option value='מבוטל'>מבוטל</option>
            </select>
          </div>

          {/* דחיפות */}
          <div>
            <label
              htmlFor='priority'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              דחיפות
            </label>
            <select
              id='priority'
              name='priority'
              value={taskData.priority}
              onChange={handleInputChange}
              className='w-full px-4 py-2 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
              required
            >
              <option value='נמוך'>נמוך</option>
              <option value='בינוני'>בינוני</option>
              <option value='גבוה'>גבוה</option>
            </select>
          </div>

          {/* הערות */}
          <div>
            <label
              htmlFor='notes'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              הערות
            </label>
            <textarea
              id='notes'
              name='notes'
              value={taskData.notes}
              onChange={handleInputChange}
              rows={3}
              className='w-full px-4 py-2 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
            ></textarea>
          </div>

          <div className='mt-8 flex justify-center'>
            <Button type='submit'>שמירה</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
