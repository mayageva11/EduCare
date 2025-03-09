// components/TasksSection.tsx
import { Task } from '@/types/tracking';

interface TasksSectionProps {
  tasks: Task[];
  onAddTask: () => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask?: (task: Task) => void;
}

const TasksSection = ({
  tasks,
  onAddTask,
  onDeleteTask,
  onEditTask
}: TasksSectionProps) => {
  console.log(
    'Tasks in TasksSection:',
    tasks.map(t => ({ id: t._id, title: t.title }))
  );

  const handleDeleteClick = (taskId: string) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את המשימה?')) {
      onDeleteTask(taskId);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'הושלם':
        return 'bg-green-100 text-green-800';
      case 'בתהליך':
        return 'bg-yellow-100 text-yellow-800';
      case 'מבוטל':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'גבוה':
        return 'bg-red-100 text-red-800';
      case 'בינוני':
        return 'bg-yellow-100 text-yellow-800';
      case 'נמוך':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='mb-8'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          <button
            onClick={onAddTask}
            className='px-6 py-2 rounded-xl bg-blue-400 text-black font-semibold 
                  hover:bg-blue-500 transition-all duration-200 shadow-md flex items-center ml-4'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 ml-2'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
            הוספת משימה
          </button>
          <h2 className='text-2xl font-bold text-[#2c5282]'>משימות</h2>
        </div>
      </div>

      {/* Tasks Table */}
      <div className='bg-white rounded-2xl shadow-xl p-6 overflow-hidden'>
        <div className='overflow-x-auto'>
          {tasks.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
              אין משימות להצגה
            </div>
          ) : (
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    שם המשימה
                  </th>
                  <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    תאריך התחלה
                  </th>
                  <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    סטטוס
                  </th>
                  <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    דחיפות
                  </th>
                  <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    הערות
                  </th>
                  <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    פעולות
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {tasks.map(task => (
                  <tr key={task._id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900'>
                      {task.title}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-md text-gray-900'>
                      {task.startDate
                        ? new Date(task.startDate).toLocaleDateString('he-IL')
                        : ''}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityClass(
                          task.priority || 'בינוני'
                        )}`}
                      >
                        {task.priority || 'בינוני'}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-md text-gray-900'>
                      {task.notes}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <div className='flex space-x-2'>
                        {/* Edit Button */}
                        <button
                          className='text-blue-500 hover:text-blue-700 ml-2'
                          onClick={() => onEditTask && onEditTask(task)}
                          aria-label='ערוך משימה'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                          </svg>
                        </button>

                        {/* Delete Button */}
                        <button
                          className='text-red-500 hover:text-red-700'
                          onClick={() => handleDeleteClick(task._id)}
                          aria-label='מחק משימה'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5 w-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksSection;
