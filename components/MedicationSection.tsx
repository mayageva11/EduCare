import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import { studentService } from '@/services/studentService';

interface MedicationSectionProps {
  studentId: string;
}

export default function MedicationSection({
  studentId
}: MedicationSectionProps) {
  const [isOnMedication, setIsOnMedication] = useState(false);
  const [medicationDetails, setMedicationDetails] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMedicationInfo = async () => {
      try {
        setLoading(true);
        const medicationInfo = await studentService.getStudentMedicationInfo(
          studentId
        );

        if (medicationInfo) {
          setIsOnMedication(medicationInfo.isOnMedication || false);
          setMedicationDetails(medicationInfo.details || '');
        }
      } catch (error) {
        console.error('Error fetching medication info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicationInfo();
  }, [studentId]);

  const handleSaveMedicationInfo = async () => {
    try {
      setLoading(true);
      await studentService.updateStudentMedicationInfo(studentId, {
        isOnMedication,
        details: medicationDetails
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving medication info:', error);
      alert('שגיאה בשמירת פרטי טיפול תרופתי');
    } finally {
      setLoading(false);
    }
  };

  // Handle the edit button click only if not loading
  const handleEditClick = () => {
    if (!loading) {
      setIsEditing(true);
    }
  };

  // Handle the save button click only if not loading
  const handleSaveClick = () => {
    if (!loading) {
      handleSaveMedicationInfo();
    }
  };

  return (
    <div className='bg-white rounded-md shadow-sm p-6 mb-6'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold text-gray-800'>טיפול תרופתי</h2>
        {isEditing && (
          <Button
            onClick={handleSaveClick}
            className={loading ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {loading ? '...טוען' : 'שמור'}
          </Button>
        )}
        {!isEditing && (
          <Button
            onClick={handleEditClick}
            className={loading ? 'opacity-50 cursor-not-allowed' : ''}
          >
            ערוך
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className='space-y-4'>
          <div className='flex items-center gap-4'>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='radio'
                checked={isOnMedication}
                onChange={() => setIsOnMedication(true)}
                className='h-4 w-4'
              />
              <span>כן</span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='radio'
                checked={!isOnMedication}
                onChange={() => setIsOnMedication(false)}
                className='h-4 w-4'
              />
              <span>לא</span>
            </label>
          </div>

          {isOnMedication && (
            <div>
              <label className='block text-gray-700 mb-2'>
                פרטי הטיפול התרופתי:
              </label>
              <textarea
                value={medicationDetails}
                onChange={e => setMedicationDetails(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-md min-h-[100px] text-right'
                placeholder='הזן פרטי טיפול תרופתי...'
                dir='rtl'
              />
            </div>
          )}
        </div>
      ) : (
        <div className='bg-gray-50 p-4 rounded-md'>
          <p className='font-medium mb-2'>
            מקבל טיפול תרופתי: {isOnMedication ? 'כן' : 'לא'}
          </p>

          {isOnMedication && medicationDetails && (
            <div className='mt-3'>
              <p className='font-medium mb-1'>פרטי הטיפול:</p>
              <p className='whitespace-pre-wrap text-right'>
                {medicationDetails}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
