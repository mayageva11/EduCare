// components/AllTasksSection.tsx
import { useState } from 'react';
import { Task } from '@/types/tracking';
import { useRouter } from 'next/navigation';

interface AllTasksSectionProps {
  tasks: Task[];
  isLoading: boolean;
}

const AllTasksSection = ({ tasks, isLoading }: AllTasksSectionProps) => {
  const router = useRouter();

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
      case 'הושלם':
        return 'bg-green-100 text-green-800';
      case 'inProgress':
      case 'בתהליך':
        return 'bg-yellow-100 text-yellow-800';
      case 'canceled':
      case 'מבוטל':
        return 'bg-red-100 text-red-800';
      case 'pending':
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusTranslation = (status: string) => {
    switch (status) {
      case 'completed':
        return 'הושלם';
      case 'inProgress':
        return 'בתהליך';
      case 'canceled':
        return 'מבוטל';
      case 'pending':
        return 'ממתין';
      default:
        return status;
    }
  };

  const getPriorityClass = (priority: string = '') => {
    switch (priority.toLowerCase()) {
      case 'high':
      case 'גבוה':
        return 'bg-red-100 text-red-800';
      case 'medium':
      case 'בינוני':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
      case 'נמוך':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityTranslation = (priority: string = '') => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'גבוה';
      case 'medium':
        return 'בינוני';
      case 'low':
        return 'נמוך';
      default:
        return priority;
    }
  };

  // Handle navigation to student page
  const navigateToStudentPage = (studentId: string) => {
    router.push(`/tracking/student/${studentId}`);
  };

  return (
    <div className='bg-white rounded-2xl shadow-xl p-8'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-3xl font-bold text-[#2c5282]'>משימות מערכתיות</h2>
        <button
          onClick={() => router.push('/tracking')}
          className='px-6 py-2 rounded-xl bg-blue-400 text-black font-semibold 
                  hover:bg-blue-500 transition-all duration-200 shadow-md flex items-center'
        >
          צפה בכל המשימות
        </button>
      </div>

      {isLoading ? (
        <div className='py-6 text-center text-gray-500'>טוען משימות...</div>
      ) : tasks.length > 0 ? (
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  שם המשימה
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  תלמיד
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  סטטוס
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  דחיפות
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {tasks.slice(0, 5).map(task => (
                <tr
                  key={task._id}
                  className='hover:bg-gray-50 cursor-pointer'
                  onClick={() =>
                    task.studentId && navigateToStudentPage(task.studentId)
                  }
                >
                  <td className='px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900'>
                    {task.title}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-md text-gray-900'>
                    {task.studentName || 'לא צוין'}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                        task.status
                      )}`}
                    >
                      {getStatusTranslation(task.status)}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityClass(
                        task.priority || 'medium'
                      )}`}
                    >
                      {getPriorityTranslation(task.priority || 'medium')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {tasks.length > 5 && (
            <div className='mt-4 text-center'>
              <button
                onClick={() => router.push('/tracking')}
                className='text-blue-600 hover:text-blue-800 font-medium'
              >
                צפה בעוד {tasks.length - 5} משימות נוספות
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className='py-10 text-center text-gray-500'>
          <p className='text-xl mb-4'>אין משימות להצגה</p>
          <button
            onClick={() => router.push('/tracking')}
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
          >
            הוסף משימה חדשה
          </button>
        </div>
      )}
    </div>
  );
};

export default AllTasksSection;
