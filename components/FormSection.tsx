import { FormContent } from '@/types/form.types';
import { Form } from '@/types/form.types';
import { useState } from 'react';
import FunctionalReportModal from './FunctionalReportModal';
import EditFunctionalReportModal from './EditFunctionalReportModal'; // New component for editing
import ViewFunctionalReportModal from './ViewFunctionalFormModal';
import { studentService } from '@/services/studentService';

interface FormsSectionProps {
  forms: Form[];
  onAddForm: () => void;
  onDeleteForm: (formId: string) => void;
  onAddStandardForm: (formType: string) => void;
  studentId: string;
  studentName?: string;
  // Optional handlers from parent component
  onViewFunctionalReport?: (formId: string) => Promise<void> | void;
  onEditFunctionalReport?: (formId: string) => Promise<void> | void;
  onSaveFunctionalReport?: (reportContent: FormContent) => Promise<void> | void;
  onDownloadFunctionalReport?: () => void;
  onFormsUpdate?: (updatedForms: Form[]) => void; // New prop for updating forms
}

const FormsSection = ({
  forms,
  onAddForm,
  onDeleteForm,
  onAddStandardForm,
  studentId,
  studentName,
  onViewFunctionalReport: parentViewFunctionalReport,
  // onEditFunctionalReport: parentEditFunctionalReport,
  // onSaveFunctionalReport: parentSaveFunctionalReport,
  onDownloadFunctionalReport: parentDownloadFunctionalReport,
  onFormsUpdate
}: FormsSectionProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFunctionalReportModalOpen, setIsFunctionalReportModalOpen] =
    useState(false);
  // New state for edit modal
  const [isEditFunctionalReportModalOpen, setIsEditFunctionalReportModalOpen] =
    useState(false);
  const [isViewFunctionalReportModalOpen, setIsViewFunctionalReportModalOpen] =
    useState(false);
  const [currentFormId, setCurrentFormId] = useState<string>('');
  const [functionalReportData, setFunctionalReportData] = useState<Form | null>(
    null
  );
  const [isFunctionalityFormModalOpen, setIsFunctionalityFormModalOpen] =
    useState(false);
  const [
    isViewFunctionalityFormModalOpen,
    setIsViewFunctionalityFormModalOpen
  ] = useState(false);
  const [functionalityFormData, setFunctionalityFormData] = useState<any>({
    section1: '',
    section2: '',
    section3: ''
  });
  const [currentFunctionalityForm, setCurrentFunctionalityForm] =
    useState<Form | null>(null);

  const handleDownload = (fileUrl: string, fileName: string) => {
    // Create an anchor element and trigger download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle download functional report as PDF
  const handleDownloadFunctionalReport = () => {
    console.log('Downloading form with ID:', currentFormId);
    // If parent component provided a handler, use it
    if (parentDownloadFunctionalReport) {
      parentDownloadFunctionalReport();
    }
    console.log(currentFormId);
    if (currentFormId) {
      studentService.downloadFunctionalReport(currentFormId);
    }
  };

  // Handle standard form creation
  const handleStandardFormClick = (formType: string) => {
    onAddStandardForm(formType);
    setShowDropdown(false);
  };

  // Handle file upload form
  const handleFileUploadClick = () => {
    onAddForm();
    setShowDropdown(false);
  };

  // Handle functional report view
  const handleViewFunctionalReport = async (formId: string) => {
    try {
      console.log('Viewing functional report with ID:', formId);
      setCurrentFormId(formId);

      // If parent component provided a handler, use it
      if (parentViewFunctionalReport) {
        parentViewFunctionalReport(formId);
        return;
      }

      // Otherwise, use the local implementation
      const reportData = await studentService.getFunctionalReport(formId);
      console.log('Received report data:', reportData);

      if (reportData) {
        setFunctionalReportData(reportData);
        setIsViewFunctionalReportModalOpen(true);
      } else {
        console.log('No report data found, opening edit form');
      }
    } catch (error) {
      console.error('Error loading functional report:', error);
      alert('שגיאה בטעינת דו״ח התפקוד');
    }
  };

  // Handle functionality form view
  const handleViewFunctionalityForm = async (formId: string) => {
    try {
      const form = forms.find(f => f._id === formId);
      setCurrentFunctionalityForm(form || null);
      setCurrentFormId(formId);

      // If parent component provided a handler, use it
      if (handleViewFunctionalityForm) {
        handleViewFunctionalityForm(formId);
        return;
      }

      // Otherwise, use the local implementation
      const result = await studentService.getFunctionalReport(formId);
      const content = result;
      if (
        result?.content &&
        result.content.academicEvaluation &&
        result.content.behavioralEvaluation
      ) {
        setFunctionalityFormData(content);
        setIsViewFunctionalityFormModalOpen(true);
      }
    } catch (error) {
      console.error('Error loading functionality form:', error);
      alert('שגיאה בטעינת הטופס');
    }
  };

  // Handle save functional report
  const handleSaveFunctionalReport = async (reportContent: FormContent) => {
    try {
      // // If parent component provided a handler, use it
      // if (parentSaveFunctionalReport) {
      //   parentSaveFunctionalReport(reportContent?.content);
      //   return;
      // }

      // Find the current form
      const currentForm = forms.find(f => f._id === currentFormId);

      if (!currentForm) {
        console.error('Form not found when saving:', currentFormId);
        alert('שגיאה: לא נמצא טופס');
        return;
      }

      let success;
      if (reportContent) {
        // If the form already has content, update it
        if (currentForm.status === 'completed') {
          // Edit existing report
          success = await studentService.editFunctionalReport(
            currentFormId,
            reportContent
          );
        } else {
          // Create new report
          success = await studentService.saveFunctionalReport(
            currentFormId,
            studentId,
            currentForm.name || 'דו״ח תפקוד',
            'functional_report',
            reportContent
          );
        }
      }

      if (success) {
        setIsFunctionalReportModalOpen(false);

        // Update the form status in the local state
        const updatedForms = forms.map(form => {
          if (form._id === currentFormId) {
            return { ...form, status: 'completed' };
          }
          return form;
        });

        // If you have a state update function for forms, use it
        if (onFormsUpdate) {
          onFormsUpdate(updatedForms);
        }

        alert(
          currentForm.status === 'completed'
            ? 'דו״ח התפקוד עודכן בהצלחה'
            : 'דו״ח התפקוד נשמר בהצלחה'
        );
      } else {
        alert('שגיאה בשמירת דו״ח התפקוד');
      }
    } catch (error) {
      console.error('Error saving functional report:', error);
      alert('שגיאה בשמירת דו״ח התפקוד');
    }
  };

  // New handler specifically for updating existing reports
  // Handler for updating existing reports via the edit modal
  const handleUpdateFunctionalReport = async (reportForm: Form | null) => {
    if (!reportForm?.content) {
      // TODO: Report an error

      return;
    }
    try {
      console.log('Updating functional report for form ID:', currentFormId);

      // Edit existing report
      const success = await studentService.editFunctionalReport(
        currentFormId, // Use the currentFormId from state
        reportForm.content // Use the reportContent passed from the modal
      );

      if (success) {
        setIsEditFunctionalReportModalOpen(false);

        // Update forms in parent component if handler provided
        if (onFormsUpdate) {
          onFormsUpdate([...forms]);
        }

        alert('דו״ח התפקוד עודכן בהצלחה');
      } else {
        alert('שגיאה בעדכון דו״ח התפקוד');
      }
    } catch (error) {
      console.error('Error updating functional report:', error);
      alert('שגיאה בעדכון דו״ח התפקוד');
    }
  };

  // Function to handle edit button click
  const handleEditButtonClick = async (formId: string) => {
    try {
      console.log('Loading functional report for editing, form ID:', formId);
      setCurrentFormId(formId);

      const reportData = await studentService.getFunctionalReport(formId);

      if (reportData) {
        setFunctionalReportData(reportData);
      } else {
        // Initialize with empty data if not found
        setFunctionalReportData(null);
      }

      // Open the edit modal
      setIsEditFunctionalReportModalOpen(true);
    } catch (error) {
      console.error('Error loading functional report for edit:', error);
      alert('שגיאה בטעינת דו״ח התפקוד לעריכה');
    }
  };

  // if (!functionalReportData) {
  //   return null;
  // }

  return (
    <div className='mb-8'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          <div className='relative'>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
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
              הוספת טופס
            </button>

            {showDropdown && (
              <div className='absolute left-0 mt-2 w-56 rounded-xl bg-white shadow-lg py-1 z-10'>
                <button
                  onClick={handleFileUploadClick}
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right'
                >
                  העלאת קובץ
                </button>
                <button
                  onClick={() => handleStandardFormClick('functional_report')}
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right'
                >
                  דו״ח תפקוד
                </button>
                <button
                  onClick={() => handleStandardFormClick('meeting_summary')}
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right'
                >
                  סיכום פגישה
                </button>
                <button
                  onClick={() =>
                    handleStandardFormClick('confidentiality_waiver')
                  }
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right'
                >
                  ויתור סודיות
                </button>
                <button
                  onClick={() => handleStandardFormClick('parent_consent')}
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right'
                >
                  טופס הסכמת הורים להיבחנות מותאמת
                </button>
                <button
                  onClick={() =>
                    handleStandardFormClick('teacher_questionnaire')
                  }
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right'
                >
                  שאלון מחנכת
                </button>
              </div>
            )}
          </div>
          <h2 className='text-2xl font-bold text-[#2c5282]'>טפסים</h2>
        </div>
      </div>

      {/* Forms Table */}
      <div className='bg-white rounded-2xl shadow-xl p-6 overflow-hidden'>
        <div className='overflow-x-auto'>
          {forms.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
              אין טפסים להצגה
            </div>
          ) : (
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    שם הטופס
                  </th>
                  <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    תאריך הוספה
                  </th>
                  <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    סטטוס
                  </th>
                  <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    פעולות
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {forms.map(form => (
                  <tr key={form._id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900'>
                      {form.name}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-md text-gray-900'>
                      {new Date(form.createdAt).toLocaleDateString('he-IL')}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-md'>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          form.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : form.status === 'inProgress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {form.status === 'completed'
                          ? 'הושלם'
                          : form.status === 'inProgress'
                          ? 'בתהליך'
                          : 'ממתין'}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex gap-4'>
                        {/* Preview Button - FIXED with arrow function wrapper */}
                        {form.formType === 'functional_report' ? (
                          <button
                            onClick={() => handleViewFunctionalReport(form._id)}
                            className='text-blue-500 hover:text-blue-700'
                            title='לחץ לצפייה'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-5 w-5'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                              <path
                                fillRule='evenodd'
                                d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </button>
                        ) : form.fileUrl ? (
                          <a
                            href={form.fileUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-500 hover:text-blue-700'
                            title='לחץ לצפייה'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-5 w-5'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                              <path
                                fillRule='evenodd'
                                d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </a>
                        ) : (
                          <button
                            className='text-blue-500 hover:text-blue-700'
                            title='לחץ לצפייה'
                            onClick={() => {
                              if (form.formType === 'functional_report') {
                                handleViewFunctionalReport(form._id);
                              }
                            }}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-5 w-5'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                              <path
                                fillRule='evenodd'
                                d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </button>
                        )}

                        {form.formType === 'functional_report' ? (
                          <button
                            className='text-green-500 hover:text-green-700'
                            title='הורד קובץ'
                            onClick={() => {
                              setCurrentFormId(form._id);
                              handleDownloadFunctionalReport();
                            }}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-5 w-5'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </button>
                        ) : form.fileUrl ? (
                          <button
                            className='text-green-500 hover:text-green-700'
                            title='הורד קובץ'
                            onClick={() => {
                              if (form.fileUrl) {
                                handleDownload(
                                  form.fileUrl || '',
                                  form.fileName || form.name
                                );
                              } else {
                                setCurrentFormId(form._id);
                                handleDownloadFunctionalReport();
                              }
                            }}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-5 w-5'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </button>
                        ) : (
                          <button
                            className='text-green-500 hover:text-green-700'
                            title='הורד קובץ'
                            onClick={() => {
                              if (form.formType === 'functional_report') {
                                setCurrentFormId(form._id);
                                handleDownloadFunctionalReport();
                              }
                            }}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-5 w-5'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </button>
                        )}

                        {/* Edit Button - FIXED with arrow function wrapper */}
                        {form.editable &&
                        form.formType === 'functional_report' &&
                        form.status === 'completed' ? (
                          <button
                            className='text-yellow-500 hover:text-yellow-700'
                            title='עריכת דו״ח'
                            onClick={() => handleEditButtonClick(form._id)}
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
                        ) : form.editable ? (
                          <button
                            className='text-yellow-500 hover:text-yellow-700'
                            title='עריכת קובץ'
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
                        ) : (
                          <span className='text-gray-400 text-sm px-2'>
                            אין אפשרות לעריכה
                          </span>
                        )}

                        {/* Delete Button - FIXED with arrow function wrapper */}
                        <button
                          className='text-red-500 hover:text-red-700'
                          title='מחק קובץ'
                          onClick={() => onDeleteForm(form._id)}
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

      {/* Regular FunctionalReportModal for adding new reports */}
      <FunctionalReportModal
        isOpen={isFunctionalReportModalOpen}
        onClose={() => setIsFunctionalReportModalOpen(false)}
        onSave={handleSaveFunctionalReport}
        studentName={studentName}
      />

      {/* New EditFunctionalReportModal specifically for editing */}
      {functionalReportData !== null && (
        <EditFunctionalReportModal
          isOpen={isEditFunctionalReportModalOpen}
          onClose={() => setIsEditFunctionalReportModalOpen(false)}
          onSave={handleUpdateFunctionalReport}
          initialData={functionalReportData}
          studentName={studentName}
        />
      )}

      {!parentViewFunctionalReport && (
        <ViewFunctionalReportModal
          isOpen={isViewFunctionalReportModalOpen}
          onClose={() => setIsViewFunctionalReportModalOpen(false)}
          data={functionalReportData}
          studentName={studentName}
          onDownload={handleDownloadFunctionalReport}
          onEdit={() => {
            setIsViewFunctionalReportModalOpen(false);
            setIsEditFunctionalReportModalOpen(true);
          }}
          canEdit={true}
        />
      )}
    </div>
  );
};

export default FormsSection;
