// components/GroupFilter.tsx
// The "All" filter will still be separate from the group options

import React from 'react';
import { GROUP_OPTIONS } from '@/types/students';

interface GroupFilterProps {
  activeFilter: string | null;
  onFilterChange: (group: string | null) => void;
}

export default function GroupFilter({
  activeFilter,
  onFilterChange
}: GroupFilterProps) {
  return (
    <div className='mb-6'>
      <h3 className='text-lg font-medium text-gray-700 mb-3'>
        סינון לפי קבוצה
      </h3>
      <div className='flex flex-wrap gap-3'>
        <button
          className={`py-2 px-4 rounded-md ${
            activeFilter === null
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          } transition-colors duration-200`}
          onClick={() => onFilterChange(null)}
        >
          הכל
        </button>

        {GROUP_OPTIONS.map(option => (
          <button
            key={option.value}
            className={`py-2 px-4 rounded-md ${
              activeFilter === option.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            } transition-colors duration-200`}
            onClick={() => onFilterChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
