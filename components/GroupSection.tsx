// components/GroupSection.tsx
import React, { useState, useEffect } from 'react';
import { StudentGroup, GROUP_OPTIONS } from '@/types/students';
import { studentService } from '@/services/studentService';

interface GroupSectionProps {
  studentId: string;
  initialGroup?: string;
}

export default function GroupSection({
  studentId,
  initialGroup = StudentGroup.NONE // Ensure default is NONE
}: GroupSectionProps) {
  const [group, setGroup] = useState(initialGroup);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Update local state if prop changes
    if (initialGroup) {
      setGroup(initialGroup);
    }
  }, [initialGroup]);

  const handleGroupChange = async (newGroup: string) => {
    try {
      setIsUpdating(true);
      setError(null);

      // Call API to update the student's group
      const success = await studentService.updateStudentGroup(
        studentId,
        newGroup
      );

      if (success) {
        setGroup(newGroup);
      } else {
        setError('שגיאה בעדכון קבוצה');
      }
    } catch (error) {
      console.error('Error updating group:', error);
      setError('שגיאה בעדכון קבוצה');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className='bg-white rounded-lg shadow-md p-6 mb-6'>
      <h2 className='text-xl font-bold mb-4 text-[#2c5282]'>קבוצה</h2>

      <div className='flex flex-wrap gap-3'>
        {GROUP_OPTIONS.map(option => (
          <button
            key={option.value}
            className={`py-2 px-4 rounded-md ${
              group === option.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            } transition-colors duration-200`}
            onClick={() => handleGroupChange(option.value)}
            disabled={isUpdating || group === option.value}
          >
            {option.label}
          </button>
        ))}
      </div>

      {isUpdating && <div className='mt-2 text-blue-500 text-sm'>מעדכן...</div>}

      {error && <div className='mt-2 text-red-500 text-sm'>{error}</div>}
    </section>
  );
}
