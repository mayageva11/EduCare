'use client';

import React, { useState } from 'react';
import { FormContent, Form } from '@/types/form.types';

interface FunctionalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formContent: FormContent) => void;
  // initialData?: Form;
  studentName?: string;
}

const defaultFormValue: FormContent = {
  academicEvaluation: '',
  behavioralEvaluation: {
    emotionalEvaluation: '',
    socialEvaluation: ''
  }
};

const FunctionalReportModal: React.FC<FunctionalReportModalProps> = ({
  isOpen,
  onClose,
  onSave,
  // initialData,
  studentName
}) => {
  const [formData, setFormData] = useState<FormContent>(defaultFormValue);

  // Initialize form with existing data if available
  // useEffect(() => {
  //   if (initialData) {
  //     setFormData(initialData);
  //   }
  // }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parentField, childField] = name.split('.');

      if (
        parentField === 'behavioralEvaluation' &&
        (childField === 'emotionalEvaluation' ||
          childField === 'socialEvaluation')
      ) {
        setFormData(prev => ({
          ...prev,
          behavioralEvaluation: {
            ...prev?.behavioralEvaluation,
            [childField]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full max-h-[85vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-6 sticky top-0 bg-white pt-2 pb-4 z-10'>
          <h2 className='text-2xl font-bold text-[#2c5282]'>
            דו״ח תפקוד {studentName ? `- ${studentName}` : ''}
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
            <label className='block text-lg font-medium text-gray-700 mb-2'>
              הערכה לימודית
            </label>
            <textarea
              name='academicEvaluation'
              value={formData.academicEvaluation}
              onChange={handleInputChange}
              className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 min-h-[150px]'
              placeholder='הזן הערכה לימודית...'
              dir='rtl'
            />
          </div>

          {/* Behavioral Evaluation */}
          <div>
            <h3 className='text-lg font-medium text-gray-700 mb-2'>
              הערכה רגשית
            </h3>

            {/* Social Evaluation */}
            <div className='mb-4'>
              <label className='block text-md font-medium text-gray-700 mb-2'>
                הערכה חברתית
              </label>
              <textarea
                name='behavioralEvaluation.socialEvaluation'
                value={formData.behavioralEvaluation?.socialEvaluation}
                onChange={handleInputChange}
                className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 min-h-[100px]'
                placeholder='הזן הערכה חברתית...'
                dir='rtl'
              />
            </div>

            {/* Emotional Evaluation */}
            <div>
              <label className='block text-md font-medium text-gray-700 mb-2'>
                הערכה רגשית
              </label>
              <textarea
                name='behavioralEvaluation.emotionalEvaluation'
                value={formData.behavioralEvaluation?.emotionalEvaluation}
                onChange={handleInputChange}
                className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 min-h-[100px]'
                placeholder='הזן הערכה רגשית...'
                dir='rtl'
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className='sticky bottom-0 left-0 right-0 bg-white pt-6 pb-4 border-t border-gray-200 flex justify-center'>
            <button
              type='submit'
              className='px-8 py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-200 shadow-lg'
            >
              שמירה
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FunctionalReportModal;
