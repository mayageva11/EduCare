import React, { useState, useEffect } from 'react';
import { Form } from '@/types/form.types';

interface EditFunctionalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reportContent: Form | null) => Promise<void> | void;
  initialData: Form;
  studentName?: string;
}

const EditFunctionalReportModal: React.FC<EditFunctionalReportModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  studentName
}) => {
  const [formData, setFormData] = useState<Form>(initialData);

  // Initialize form data when modal opens or initialData changes
  useEffect(() => {
    if (initialData) {
      console.log(
        'Setting initial data in EditFunctionalReportModal:',
        initialData
      );
      setFormData(initialData);
    }
  }, [initialData, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: string,
    nestedField?: string
  ) => {
    if (nestedField) {
      setFormData(prev => ({
        ...prev,
        content: {
          ...prev?.content,
          behavioralEvaluation: {
            ...prev?.content?.behavioralEvaluation,
            [nestedField]: e.target.value
          }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        content: {
          [field]: e.target.value
        }
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting edited report data:', formData);

    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving report:', error);
      alert('שגיאה בשמירת דו״ח התפקוד');
    }
  };

  if (!isOpen || !formData) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full max-h-[85vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-6 sticky top-0 bg-white pt-2 pb-4 z-10'>
          <h2 className='text-2xl font-bold text-[#2c5282]'>
            עריכת דו״ח תפקוד {studentName && `- ${studentName}`}
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600'
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

        <form onSubmit={handleSubmit} className='space-y-8'>
          {/* Academic Evaluation */}
          <div>
            <label className='block text-md font-medium text-gray-700 mb-2'>
              הערכה אקדמית
            </label>
            <textarea
              value={formData.content?.academicEvaluation}
              onChange={e => handleInputChange(e, 'academicEvaluation')}
              rows={6}
              className='w-full px-4 py-2 rounded-lg border border-gray-300 
                      focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
              placeholder='הכנס הערכה אקדמית כאן...'
            ></textarea>
          </div>

          {/* Emotional Evaluation */}
          <div>
            <label className='block text-md font-medium text-gray-700 mb-2'>
              הערכה רגשית
            </label>
            <textarea
              value={
                formData?.content?.behavioralEvaluation?.emotionalEvaluation
              }
              onChange={e =>
                handleInputChange(
                  e,
                  'behavioralEvaluation',
                  'emotionalEvaluation'
                )
              }
              rows={6}
              className='w-full px-4 py-2 rounded-lg border border-gray-300 
                      focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
              placeholder='הכנס הערכה רגשית כאן...'
            ></textarea>
          </div>

          {/* Social Evaluation */}
          <div>
            <label className='block text-md font-medium text-gray-700 mb-2'>
              הערכה חברתית
            </label>
            <textarea
              value={formData?.content?.behavioralEvaluation?.socialEvaluation}
              onChange={e =>
                handleInputChange(e, 'behavioralEvaluation', 'socialEvaluation')
              }
              rows={6}
              className='w-full px-4 py-2 rounded-lg border border-gray-300 
                      focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
              placeholder='הכנס הערכה חברתית כאן...'
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className='flex justify-center'>
            <button
              type='submit'
              className='px-8 py-3 rounded-xl bg-blue-500 text-white font-semibold 
                      hover:bg-blue-600 transition-all duration-200 shadow-lg'
            >
              עדכן דו״ח
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFunctionalReportModal;
