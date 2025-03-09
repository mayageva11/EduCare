import { Student, TagOption } from '@/types/tracking';

interface StudentHeaderProps {
  student: Student;
  tagOptions: TagOption[];
  onEditTags: () => void;
  onEditStudentInfo: () => void;
}

const StudentHeader = ({
  student,
  tagOptions,
  onEditTags,
  onEditStudentInfo
}: StudentHeaderProps) => {
  return (
    <div className='bg-white rounded-2xl shadow-xl p-6 mb-8'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-4'>
        <div className='flex flex-col md:flex-row items-start md:items-center'>
          <div>
            <h1 className='text-3xl font-bold text-[#2c5282]'>
              {student.firstName} {student.lastName}
            </h1>
          </div>

          {/* Prominent Edit Button - Added with margin */}
          <button
            onClick={onEditStudentInfo}
            className='mt-3 md:mt-0 md:mr-4 px-3 py-1.5 flex items-center bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md transition-colors'
            aria-label='Edit student info'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 ml-1.5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
            </svg>
            ערוך פרטי תלמיד
          </button>
        </div>

        {/* Tags with Edit Button */}
        <div className='mt-4 md:mt-0'>
          <div className='flex items-center'>
            <button
              onClick={onEditTags}
              className='ml-2 text-blue-500 hover:text-blue-700'
              aria-label='Edit tags'
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
            <h3 className='text-lg font-medium text-gray-700 ml-2'>תגיות:</h3>
            <div className='flex flex-wrap gap-2'>
              {student.tags.map(tag => {
                const tagOption = tagOptions.find(opt => opt.value === tag);
                return (
                  <span
                    key={tag}
                    className='h-6 w-6 rounded-full'
                    style={{ backgroundColor: tagOption?.color }}
                    title={tagOption?.label}
                  ></span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Student Details */}
      <div className='border-t border-gray-200 pt-4 mt-2'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <p className='text-gray-600'>
              <span className='font-semibold'>כיתה:</span> {student.grade}
            </p>
            <p className='text-gray-600 mt-1'>
              <span className='font-semibold'>תאריך רישום:</span>{' '}
              {new Date(student.createdAt).toLocaleDateString('he-IL')}
            </p>
          </div>

          <div>
            <h3 className='text-lg font-medium text-gray-700 mb-2'>
              פרטי הורים / אפוטרופוס:
            </h3>
            <div className='space-y-2'>
              {student.parents.map((parent, index) => (
                <div key={index} className='flex flex-col'>
                  <p className='text-gray-600'>
                    <span className='font-semibold'>הורה {index + 1}:</span>{' '}
                    {parent.name}
                  </p>
                  <p className='text-gray-600'>
                    <span className='font-semibold'>טלפון:</span> {parent.phone}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;
