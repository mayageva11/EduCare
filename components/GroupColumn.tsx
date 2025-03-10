// components/GroupColumn.tsx
import React from 'react';
import { GROUP_OPTIONS } from '@/types/students';

interface GroupColumnProps {
  group?: string;
}

export default function GroupColumn({ group = 'none' }: GroupColumnProps) {
  const groupOption = GROUP_OPTIONS.find(opt => opt.value === group);

  return (
    <span className='px-3 py-1 text-sm rounded-full bg-gray-100'>
      {groupOption?.label || 'ללא'}
    </span>
  );
}
