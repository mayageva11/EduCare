import { useState } from 'react';
import Button from '@/components/Button';

interface AddFormModalProps {
  onClose: () => void;
  onAddForm: (formData: { formType: string }) => void;
}

const AddFormModal = ({ onClose, onAddForm }: AddFormModalProps) => {
  const [formType, setFormType] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formType) {
      onAddForm({ formType });
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-[#2c5282]'>הוספת טופס חדש</h2>
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
          <div>
            <label
              htmlFor='formType'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              סוג טופס
            </label>
            <select
              id='formType'
              name='formType'
              value={formType}
              onChange={e => setFormType(e.target.value)}
              className='w-full px-4 py-2 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
              required
            >
              <option value=''>בחר סוג טופס</option>
              <option value='fileUpload'>העלאת קובץ</option>
              <option value='meetingSummary'>סיכום פגישה</option>
              <option value='teacherQuestionnaire'>שאלון מחנכת</option>
              <option value='confidentialityWaiver'>ויתור סודיות</option>
              <option value='parentConsent'>
                טופס הסכמת הורים להיבחנות מותאמת
              </option>
            </select>
          </div>

          <div className='mt-8 flex justify-center'>
            {formType ? (
              <Button type='submit'>המשך</Button>
            ) : (
              <button
                type='button'
                className='px-6 py-2 bg-gray-300 text-gray-500 rounded-xl font-semibold cursor-not-allowed shadow-md'
              >
                המשך
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFormModal;
