import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import { studentService } from '@/services/studentService';

interface CounselorNotesSectionProps {
  studentId: string;
}

export default function CounselorNotesSection({
  studentId
}: CounselorNotesSectionProps) {
  const [notes, setNotes] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const counselorNotes = await studentService.getStudentCounselorNotes(
          studentId
        );
        setNotes(counselorNotes || '');
      } catch (error) {
        console.error('Error fetching counselor notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [studentId]);

  const handleSaveNotes = async () => {
    try {
      setLoading(true);
      await studentService.updateStudentCounselorNotes(studentId, notes);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving counselor notes:', error);
      alert('שגיאה בשמירת הערות היועצת');
    } finally {
      setLoading(false);
    }
  };

  // Handle button click based on current state and loading
  const handleButtonClick = () => {
    if (!loading) {
      if (isEditing) {
        handleSaveNotes();
      } else {
        setIsEditing(true);
      }
    }
  };

  return (
    <div className='bg-white rounded-md shadow-sm p-6 mb-6'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold text-gray-800'>הערות היועצת</h2>
        <Button
          onClick={handleButtonClick}
          // Remove the disabled prop and handle it in the click handler
          className={loading ? 'opacity-50 cursor-not-allowed' : ''}
        >
          {loading ? '...טוען' : isEditing ? 'שמור' : 'ערוך'}
        </Button>
      </div>

      {isEditing ? (
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className='w-full p-3 border border-gray-300 rounded-md min-h-[150px] text-right'
          placeholder='הזן הערות...'
          dir='rtl'
        />
      ) : (
        <div className='bg-gray-50 p-4 rounded-md min-h-[100px] text-right'>
          {notes ? (
            <p className='whitespace-pre-wrap'>{notes}</p>
          ) : (
            <p className='text-gray-400'>אין הערות</p>
          )}
        </div>
      )}
    </div>
  );
}
