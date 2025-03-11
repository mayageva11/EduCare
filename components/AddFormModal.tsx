import React, { useState, useRef } from 'react';

interface AddFormModalProps {
  onClose: () => void;
  onAddForm: (formData: any) => void;
}

const AddFormModal: React.FC<AddFormModalProps> = ({ onClose, onAddForm }) => {
  const [formName, setFormName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('אנא בחר קובץ להעלאה');
      return;
    }

    if (!formName) {
      alert('אנא הזן שם לקובץ');
      return;
    }

    try {
      onAddForm({
        formType: 'file_upload',
        file: selectedFile,
        name: formName
      });
    } catch (error) {
      console.error('Error in form submission:', error);
      alert('שגיאה בהעלאת הטופס');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl'>
        <h2 className='text-2xl font-bold text-[#2c5282] mb-6 text-right'>
          העלאת קובץ
        </h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2 text-right'>
              שם הקובץ
            </label>
            <input
              type='text'
              value={formName}
              onChange={e => setFormName(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right'
              placeholder='הזן שם לקובץ'
            />
          </div>

          <div className='mb-4'>
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileSelect}
              className='hidden'
            />
            <div className='flex items-center justify-between space-x-4'>
              <button
                type='button'
                onClick={triggerFileInput}
                className='px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 focus:outline-none'
              >
                בחר קובץ
              </button>
              <span className='text-gray-600 text-right flex-grow'>
                {selectedFile ? selectedFile.name : 'לא נבחר קובץ'}
              </span>
            </div>
          </div>

          <div className='flex justify-between mt-8'>
            <button
              type='button'
              onClick={onClose}
              className='px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 focus:outline-none'
            >
              ביטול
            </button>
            <button
              type='submit'
              className='px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 focus:outline-none'
            >
              שמור
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFormModal;
