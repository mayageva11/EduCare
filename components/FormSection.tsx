import { Form } from '@/types/tracking';

interface FormsSectionProps {
  forms: Form[];
  onAddForm: () => void;
  onDeleteForm: (formId: string) => void;
}

const FormsSection = ({
  forms,
  onAddForm,
  onDeleteForm
}: FormsSectionProps) => {
  return (
    <div className='mb-8'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center'>
          <div className='relative'>
            <button
              onClick={onAddForm}
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
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex gap-4'>
                        {/* Preview Button */}
                        <button
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

                        {/* Download Button */}
                        <button
                          className='text-green-500 hover:text-green-700'
                          title='הורד קובץ'
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

                        {/* Edit Button (conditional) */}
                        {form.editable ? (
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

                        {/* Delete Button */}
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
    </div>
  );
};

export default FormsSection;
