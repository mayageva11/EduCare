import { useState } from 'react';
import { TagOption } from '@/types/tracking';
import Button from '@/components/Button';

interface EditTagsModalProps {
  onClose: () => void;
  tagOptions: TagOption[];
  selectedTags: string[];
  onUpdateTags: (tags: string[]) => void;
}

const EditTagsModal = ({
  onClose,
  tagOptions,
  selectedTags,
  onUpdateTags
}: EditTagsModalProps) => {
  const [tags, setTags] = useState<string[]>([...selectedTags]);

  const handleTagToggle = (tag: string) => {
    setTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTags(tags);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-[#2c5282]'>עריכת תגיות</h2>
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

        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
            {tagOptions.map(option => (
              <div
                key={option.value}
                className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                  tags.includes(option.value)
                    ? 'bg-blue-100 border-2 border-blue-400'
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleTagToggle(option.value)}
              >
                <div
                  className='w-5 h-5 rounded-full ml-3 flex-shrink-0'
                  style={{ backgroundColor: option.color }}
                ></div>
                <span className='text-sm'>{option.label}</span>
              </div>
            ))}
          </div>

          <div className='mt-8 flex justify-center'>
            <Button type='submit'>שמירה</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTagsModal;
