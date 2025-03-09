// app/tracking/student/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/Button';
import StudentHeader from '@/components/StudentHeader';
import TasksSection from '@/components/TaskSection';
import FormsSection from '@/components/FormSection';
import AddTaskModal from '@/components/AddTaskModal';
import EditTaskModal from '@/components/EditTaskModal';
import AddFormModal from '@/components/AddFormModal';
import EditTagsModal from '@/components/EditTagsModal';
import { Student, Task, Form, TagOption } from '@/types/tracking';
import { studentService } from '@/services/studentService';

// Available tag options
const tagOptions: TagOption[] = [
  {
    value: 'green',
    label: 'ירוק - תקין, לומד בבית ספר ואין בעיות',
    color: '#4ade80'
  },
  {
    value: 'yellow',
    label: 'צהוב - קשב וריכוז לא מטופל וקשיים לימודיים',
    color: '#facc15'
  },
  {
    value: 'orange',
    label: 'כתום - קשיים לימודיים, רגשיים והתנהגותיים',
    color: '#fb923c'
  },
  {
    value: 'red',
    label: 'אדום - קשיים לימודיים, רגשיים, התנהגותיים, חברתיים ומשפחתיים',
    color: '#f87171'
  },
  { value: 'blue', label: 'כחול - מדווח קב״ס', color: '#60a5fa' },
  { value: 'purple', label: 'סגול - מדווח רווחה', color: '#c084fc' }
];

export default function StudentPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = typeof params.id === 'string' ? params.id : '';

  const [student, setStudent] = useState<Student | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isTagEditModalOpen, setIsTagEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!studentId) {
        router.push('/tracking');
        return;
      }

      try {
        setLoading(true);

        // Fetch all data in parallel
        const [studentData, tasksData, formsData] = await Promise.all([
          studentService.getStudentById(studentId),
          studentService.getStudentTasks(studentId),
          studentService.getStudentForms(studentId)
        ]);

        if (!studentData) {
          throw new Error('תלמיד לא נמצא');
        }

        setStudent(studentData as Student);
        setTasks(tasksData || []);
        setForms(formsData || []);
      } catch (error) {
        console.error('Error fetching student data:', error);
        alert('שגיאה בטעינת נתוני התלמיד');
        router.push('/tracking');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId, router]);

  // Handle adding a new task
  const handleAddTask = async (taskData: Omit<Task, '_id'>) => {
    try {
      if (!studentId) return;

      const newTask = await studentService.addStudentTask(studentId, taskData);
      if (newTask) {
        setTasks(prev => [...prev, newTask]);
        setIsTaskModalOpen(false);
      }
    } catch (error) {
      console.error('Error adding task:', error);
      alert('שגיאה בהוספת משימה');
    }
  };

  // Handle editing a task
  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsEditTaskModalOpen(true);
  };

  // Handle updating a task
  const handleUpdateTask = async (
    taskId: string,
    taskData: Omit<Task, '_id'>
  ) => {
    try {
      if (!studentId) return;

      console.log('Updating task:', { taskId, ...taskData });
      const updatedTask = await studentService.updateStudentTask(
        studentId,
        taskId,
        taskData
      );

      if (updatedTask) {
        setTasks(prev =>
          prev.map(task => (task._id === taskId ? updatedTask : task))
        );
        setIsEditTaskModalOpen(false);
        setTaskToEdit(null);
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert('שגיאה בעדכון משימה');
    }
  };

  // Handle adding a new form
  const handleAddForm = async (formData: { formType: string }) => {
    try {
      if (!studentId) return;

      const newForm = await studentService.addStudentForm(studentId, formData);
      if (newForm) {
        setForms(prev => [...prev, newForm]);
        setIsFormModalOpen(false);
      }
    } catch (error) {
      console.error('Error adding form:', error);
      alert('שגיאה בהוספת טופס');
    }
  };

  // Handle updating student tags
  const handleUpdateTags = async (tags: string[]) => {
    try {
      if (!studentId || !student) return;

      const success = await studentService.updateStudentTags(studentId, tags);
      if (success) {
        setStudent({
          ...student,
          tags
        });
        setIsTagEditModalOpen(false);
      }
    } catch (error) {
      console.error('Error updating tags:', error);
      alert('שגיאה בעדכון תגיות');
    }
  };

  // Handle delete task
  const handleDeleteTask = async (taskId: string) => {
    try {
      if (!studentId) return;

      console.log('Deleting task with ID:', taskId);
      const success = await studentService.deleteStudentTask(studentId, taskId);

      if (success) {
        console.log('Task deleted successfully');
        setTasks(prev => prev.filter(task => task._id !== taskId));
      } else {
        console.error('Failed to delete task');
        alert('שגיאה במחיקת משימה');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('שגיאה במחיקת משימה');
    }
  };

  // Handle delete form
  const handleDeleteForm = async (formId: string) => {
    try {
      if (!studentId) return;

      const success = await studentService.deleteStudentForm(studentId, formId);
      if (success) {
        setForms(prev => prev.filter(form => form._id !== formId));
      }
    } catch (error) {
      console.error('Error deleting form:', error);
      alert('שגיאה במחיקת טופס');
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
        </div>
      </div>
    );
  }

  // Render error state if student not found
  if (!student) {
    return (
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <div className='flex justify-center items-center h-64 flex-col'>
          <div className='text-xl text-red-500 mb-4'>תלמיד לא נמצא</div>
          <Button onClick={() => router.push('/tracking')}>
            חזרה לרשימת התלמידים
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-6 py-8'>
      {/* Back Button */}
      <div className='mb-6'>
        <button
          onClick={() => router.push('/tracking')}
          className='flex items-center text-[#2c5282] hover:text-[#1e3a5f] transition-all duration-200'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 ml-2'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z'
              clipRule='evenodd'
            />
          </svg>
          חזרה לרשימת התלמידים
        </button>
      </div>

      <StudentHeader
        student={student}
        tagOptions={tagOptions}
        onEditTags={() => setIsTagEditModalOpen(true)}
      />

      <TasksSection
        tasks={tasks}
        onAddTask={() => setIsTaskModalOpen(true)}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
      />

      <FormsSection
        forms={forms}
        onAddForm={() => setIsFormModalOpen(true)}
        onDeleteForm={handleDeleteForm}
      />

      {isTaskModalOpen && (
        <AddTaskModal
          onClose={() => setIsTaskModalOpen(false)}
          onAddTask={handleAddTask}
        />
      )}

      {isEditTaskModalOpen && taskToEdit && (
        <EditTaskModal
          task={taskToEdit}
          onClose={() => {
            setIsEditTaskModalOpen(false);
            setTaskToEdit(null);
          }}
          onUpdateTask={handleUpdateTask}
        />
      )}

      {isFormModalOpen && (
        <AddFormModal
          onClose={() => setIsFormModalOpen(false)}
          onAddForm={handleAddForm}
        />
      )}

      {isTagEditModalOpen && (
        <EditTagsModal
          onClose={() => setIsTagEditModalOpen(false)}
          tagOptions={tagOptions}
          selectedTags={student.tags}
          onUpdateTags={handleUpdateTags}
        />
      )}
    </div>
  );
}
