import { useState } from 'react';
import Button from '@/components/Button';
import { Student } from '@/types/tracking';

interface ParentFormData {
  name: string;
  phone: string;
}

interface EditStudentModalProps {
  student: Student;
  onClose: () => void;
  onUpdateStudent: (
    studentId: string,
    studentData: {
      firstName: string;
      lastName: string;
      grade: string;
      parents: { name: string; phone: string }[];
    }
  ) => Promise<void>;
}

const EditStudentModal = ({
  student,
  onClose,
  onUpdateStudent
}: EditStudentModalProps) => {
  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);
  const [grade, setGrade] = useState(student.grade);
  const [parents, setParents] = useState<ParentFormData[]>(
    student.parents.map(parent => ({
      name: parent.name,
      phone: parent.phone
    }))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle parent input change
  const handleParentChange = (
    index: number,
    field: keyof ParentFormData,
    value: string
  ) => {
    const updatedParents = [...parents];
    updatedParents[index] = {
      ...updatedParents[index],
      [field]: value
    };
    setParents(updatedParents);
  };

  // Add a new parent field
  const addParent = () => {
    setParents([...parents, { name: '', phone: '' }]);
  };

  // Remove a parent field
  const removeParent = (index: number) => {
    if (parents.length > 1) {
      const updatedParents = [...parents];
      updatedParents.splice(index, 1);
      setParents(updatedParents);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      // Filter out empty parent entries
      const validParents = parents.filter(
        parent => parent.name.trim() !== '' || parent.phone.trim() !== ''
      );

      await onUpdateStudent(student._id, {
        firstName,
        lastName,
        grade,
        parents: validParents
      });

      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('שגיאה בעדכון פרטי התלמיד');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-[#2c5282]'>
            עריכת פרטי תלמיד
          </h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'
            aria-label='Close'
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

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* First Name */}
            <div>
              <label
                htmlFor='firstName'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                שם פרטי*
              </label>
              <input
                type='text'
                id='firstName'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor='lastName'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                שם משפחה*
              </label>
              <input
                type='text'
                id='lastName'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              />
            </div>
          </div>

          {/* Grade */}
          <div>
            <label
              htmlFor='grade'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              כיתה*
            </label>
            <input
              type='text'
              id='grade'
              value={grade}
              onChange={e => setGrade(e.target.value)}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            />
          </div>

          {/* Parents Section */}
          <div>
            <div className='flex justify-between items-center mb-2'>
              <h3 className='text-lg font-medium text-gray-700'>פרטי הורים</h3>
              <button
                type='button'
                onClick={addParent}
                className='text-blue-500 hover:text-blue-700 flex items-center'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 mr-1'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                    clipRule='evenodd'
                  />
                </svg>
                הוסף הורה
              </button>
            </div>

            {parents.map((parent, index) => (
              <div key={index} className='bg-gray-50 p-4 rounded-md mb-4'>
                <div className='flex justify-between items-center mb-2'>
                  <h4 className='font-medium'>הורה {index + 1}</h4>
                  {parents.length > 1 && (
                    <button
                      type='button'
                      onClick={() => removeParent(index)}
                      className='text-red-500 hover:text-red-700'
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
                  )}
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {/* Parent Name */}
                  <div>
                    <label
                      htmlFor={`parentName-${index}`}
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      שם
                    </label>
                    <input
                      type='text'
                      id={`parentName-${index}`}
                      value={parent.name}
                      onChange={e =>
                        handleParentChange(index, 'name', e.target.value)
                      }
                      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>

                  {/* Parent Phone */}
                  <div>
                    <label
                      htmlFor={`parentPhone-${index}`}
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      טלפון
                    </label>
                    <input
                      type='tel'
                      id={`parentPhone-${index}`}
                      value={parent.phone}
                      onChange={e =>
                        handleParentChange(index, 'phone', e.target.value)
                      }
                      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='flex justify-end space-x-4'>
            <Button
              type='button'
              onClick={onClose}
              className='bg-gray-200 hover:bg-gray-300 text-gray-800'
            >
              ביטול
            </Button>
            <button
              type='submit'
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'מעדכן...' : 'עדכן פרטים'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
