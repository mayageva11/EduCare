import React from 'react';
import { Form } from '@/types/form.types';

interface ViewFunctionalityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  studentName?: string;
  onDownload?: () => void;
  onEdit: () => void;
  canEdit: boolean;
  form?: Form;
}

const ViewFunctionalityFormModal: React.FC<ViewFunctionalityFormModalProps> = ({
  isOpen,
  onClose,
  data,
  studentName,
  onDownload,
  onEdit,
  canEdit,
  form
}) => {
  const handleDownloadClick = () => {
    console.log('Download clicked in modal, form:', form);

    if (onDownload) {
      onDownload();
    }
  };
  // If not open, don't render anything
  if (!isOpen || !data) return null;

  console.log('ViewFunctionalityFormModal rendering with data:', data);
  console.log('Form:', form);

  // Determine the form structure based on form type
  const renderFormContent = () => {
    // If no form or no content data, show empty message
    if (!data) {
      console.log('No form or data available');
      return (
        <div className='text-center py-8 text-gray-500'>
          אין מידע זמין לטופס זה.
        </div>
      );
    }

    // Handle functional report
    if (data?.formType === 'functional_report' || data) {
      console.log('Rendering functional report content');
      return (
        <div className='space-y-8'>
          {/* Academic Evaluation */}
          <div>
            <h3 className='text-lg font-medium text-gray-700 mb-2'>
              הערכה אקדמית
            </h3>
            <div className='bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[150px] whitespace-pre-wrap'>
              {data.content.academicEvaluation || 'אין מידע זמין'}
            </div>
          </div>

          {/* Emotional Evaluation */}
          <div>
            <h3 className='text-lg font-medium text-gray-700 mb-2'>
              הערכה רגשית
            </h3>
            <div className='bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[150px] whitespace-pre-wrap'>
              {data.content.behavioralEvaluation?.emotionalEvaluation ||
                'אין מידע זמין'}
            </div>
          </div>

          {/* Social Evaluation */}
          <div>
            <h3 className='text-lg font-medium text-gray-700 mb-2'>
              הערכה חברתית
            </h3>
            <div className='bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[150px] whitespace-pre-wrap'>
              {data.content.behavioralEvaluation?.socialEvaluation ||
                'אין מידע זמין'}
            </div>
          </div>
        </div>
      );
    }

    // Handle meeting summary
    if (data?.formType === 'meeting_summary') {
      console.log('Rendering meeting summary content');
      return (
        <div className='space-y-8'>
          <div>
            <h3 className='text-lg font-medium text-gray-700 mb-2'>
              תאריך פגישה
            </h3>
            <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
              {data.meetingDate || 'לא צוין'}
            </div>
          </div>
          <div>
            <h3 className='text-lg font-medium text-gray-700 mb-2'>משתתפים</h3>
            <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
              {data.participants || 'לא צוינו'}
            </div>
          </div>
          <div>
            <h3 className='text-lg font-medium text-gray-700 mb-2'>
              תוכן הפגישה
            </h3>
            <div className='bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[150px] whitespace-pre-wrap'>
              {data.content || 'אין מידע זמין'}
            </div>
          </div>
          <div>
            <h3 className='text-lg font-medium text-gray-700 mb-2'>
              החלטות ומשימות להמשך
            </h3>
            <div className='bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[100px] whitespace-pre-wrap'>
              {data.decisions || 'אין מידע זמין'}
            </div>
          </div>
        </div>
      );
    }

    // Handle confidentiality waiver
    if (data?.formType === 'confidentiality_waiver') {
      console.log('Rendering confidentiality waiver content');
      return (
        <div className='space-y-8'>
          <div>
            <h3 className='text-lg font-medium text-gray-700 mb-2'>
              פרטי הורה/אפוטרופוס
            </h3>
            <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
              <p>
                <strong>שם:</strong> {data.parentName || 'לא צוין'}
              </p>
              <p>
                <strong>ת.ז.:</strong> {data.parentId || 'לא צוין'}
              </p>
            </div>
          </div>
          <div>
            <h3 className='text-lg font-medium text-gray-700 mb-2'>
              גורמים מאושרים להעברת מידע
            </h3>
            <div className='bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[100px] whitespace-pre-wrap'>
              {data.authorizedEntities?.join(', ') || 'לא צוינו'}
            </div>
          </div>
          <div>
            <h3 className='text-lg font-medium text-gray-700 mb-2'>הסכמה</h3>
            <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
              <p>
                <strong>חתימה דיגיטלית:</strong>{' '}
                {data.signature ? 'נחתם' : 'לא נחתם'}
              </p>
              <p>
                <strong>תאריך:</strong> {data.date || 'לא צוין'}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Generic form content for other types
    console.log('Rendering generic content');
    return (
      <div className='space-y-8'>
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <h3 className='text-lg font-medium text-gray-700 mb-2'>{key}</h3>
            <div className='bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[100px] whitespace-pre-wrap'>
              {typeof value === 'string'
                ? value
                : value && typeof value === 'object'
                ? JSON.stringify(value, null, 2)
                : 'אין מידע זמין'}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full max-h-[85vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-6 sticky top-0 bg-white pt-2 pb-4 z-10'>
          <h2 className='text-2xl font-bold text-[#2c5282]'>
            {form?.name || 'צפייה בטופס'}{' '}
            {studentName ? `- ${studentName}` : ''}
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

        {renderFormContent()}

        {/* Buttons */}
        <div className='mt-8 flex justify-center space-x-4'>
          {canEdit && (
            <button
              onClick={onEdit}
              className='px-6 py-2 rounded-xl bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-all duration-200 shadow-lg ml-4'
            >
              עריכה
            </button>
          )}
          {onDownload && (
            <button
              onClick={handleDownloadClick}
              className='px-6 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-200 shadow-lg'
            >
              הורדה כ-PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewFunctionalityFormModal;
