'use client';

import React, { useState, useEffect } from 'react';
import type { Student, StudentFormData } from '@/types/students';
import { studentService } from '@/services/studentService';
import TableHeaderCell from '@/components/TableHeaderCell';
import Button from '@/components/Button';

const TrackingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    grade: '',
    tags: [],
    parent1Name: '',
    parent1Phone: '',
    parent2Name: '',
    parent2Phone: ''
  });

  // Fetch students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentList = await studentService.getStudents();

        setStudents(studentList);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const tagOptions = [
    {
      value: 'green',
      label: 'ירוק - תקין, לומד בבית ספר ואין בעיות',
      color: '#4ade80'
    },
    {
      value: 'yellow',
      label: 'צהוב - קשב וריכוז לא מטופל וקשיים לימודיים',
      color: '#facc15'
    },
    {
      value: 'orange',
      label: 'כתום - קשיים לימודיים, רגשיים והתנהגותיים',
      color: '#fb923c'
    },
    {
      value: 'red',
      label: 'אדום - קשיים לימודיים, רגשיים, התנהגותיים, חברתיים ומשפחתיים',
      color: '#f87171'
    },
    { value: 'blue', label: 'כחול - מדווח קב״ס', color: '#60a5fa' },
    { value: 'purple', label: 'סגול - מדווח רווחה', color: '#c084fc' }
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagToggle = (tag: string) => {
    setFormData(prev => {
      if (prev.tags.includes(tag)) {
        return {
          ...prev,
          tags: prev.tags.filter(t => t !== tag)
        };
      } else {
        return {
          ...prev,
          tags: [...prev.tags, tag]
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // וידוא שהטופס מלא ותקין
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.grade ||
        formData.tags.length === 0 ||
        !formData.parent1Name ||
        !formData.parent1Phone ||
        !formData.parent2Name ||
        !formData.parent2Phone
      ) {
        alert('יש למלא את כל שדות החובה');
        return;
      }

      // קריאה לפונקציית createStudent של ה-controller עם נתוני הטופס ישירות
      const newStudent = await studentService.createStudent(formData);

      if (!newStudent) {
        throw new Error('שגיאה בהוספת תלמיד');
      }

      // הוספת התלמיד החדש לרשימת התלמידים בממשק
      setStudents(prevStudents => [...prevStudents, newStudent]);

      // איפוס הטופס וסגירת החלונית
      setFormData({
        firstName: '',
        lastName: '',
        grade: '',
        tags: [],
        parent1Name: '',
        parent1Phone: '',
        parent2Name: '',
        parent2Phone: ''
      });

      setIsModalOpen(false);

      // הודעת הצלחה למשתמש
      alert(
        `התלמיד ${newStudent.firstName} ${newStudent.lastName} נוסף בהצלחה`
      );
      window.location.reload();
    } catch (error) {
      console.error('Error adding student:', error);
      alert(
        'שגיאה בהוספת התלמיד: ' +
          (error instanceof Error ? error.message : 'אנא נסה שנית')
      );
    }
  };

  const filteredStudents = students.filter(student => {
    const fullName = `${student.firstName} ${student.lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const navigateToPersonalTracking = (studentId: string) => {
    // Navigate to personal tracking page
    window.location.href = `/tracking/${studentId}`;
  };

  return (
    <div className='max-w-7xl mx-auto px-6 py-8'>
      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
        </div>
      ) : (
        <>
          <h1 className='text-3xl font-bold text-[#2c5282] mb-8'>
            מעקב תלמידים
          </h1>

          {/* Add Student Button */}
          <div className='mb-8'>
            <button
              onClick={() => setIsModalOpen(true)}
              className='px-8 py-3 rounded-xl bg-blue-400 text-black font-semibold 
                     hover:bg-blue-500 transition-all duration-200 shadow-lg flex items-center'
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
              הוספת תלמיד חדש
            </button>
          </div>

          {/* Search */}
          <div className='mb-6'>
            <div className='relative'>
              <input
                type='text'
                placeholder='חיפוש לפי שם תלמיד...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='w-full px-4 py-3 rounded-lg border-2 border-blue-200 
                       focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
                       transition-all duration-200 text-lg'
              />
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Students Table */}
          <div className='bg-white rounded-2xl shadow-xl p-6 overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <TableHeaderCell>שם פרטי</TableHeaderCell>
                    <TableHeaderCell>שם משפחה</TableHeaderCell>
                    <TableHeaderCell>כיתה</TableHeaderCell>
                    <TableHeaderCell>תגיות</TableHeaderCell>
                    <TableHeaderCell>פרטי הורים</TableHeaderCell>
                    <TableHeaderCell>פעולות</TableHeaderCell>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {filteredStudents.map(student => (
                    <tr key={student._id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900'>
                        {student.firstName}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-md text-gray-900'>
                        {student.lastName}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-md text-gray-900'>
                        {student.grade}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex flex-wrap gap-2'>
                          {student.tags.map(tag => {
                            const tagOption = tagOptions.find(
                              opt => opt.value === tag
                            );
                            return (
                              <span
                                key={tag}
                                className='h-6 w-6 rounded-full'
                                style={{ backgroundColor: tagOption?.color }}
                                title={tagOption?.label}
                              ></span>
                            );
                          })}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-md text-gray-900'>
                        <div>
                          <p>
                            {student.parents[0].name}-{student.parents[0].phone}
                          </p>
                          {student.parents[1] && (
                            <p>
                              {student.parents[1].name}-
                              {student.parents[1].phone}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                        <div className='flex space-x-4'>
                          {/* Personal Tracking Button */}
                          <button
                            className='px-4 py-2 rounded-lg bg-[#2c5282] text-white 
                                   hover:bg-[#1e3a5f] transition-all duration-200'
                            onClick={() => {
                              if (student._id) {
                                navigateToPersonalTracking(student._id);
                              }
                            }}
                          >
                            מעקב אישי
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Student Modal */}
          {isModalOpen && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
              <div className='bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full max-h-[85vh] overflow-y-auto'>
                <div className='flex justify-between items-center mb-6 sticky top-0 bg-white pt-2 pb-4 z-10'>
                  <h2 className='text-2xl font-bold text-[#2c5282]'>
                    הוספת תלמיד חדש
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
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

                <form
                  id='studentForm'
                  onSubmit={handleSubmit}
                  className='space-y-8 mt-8 mb-24'
                >
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* שם פרטי */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        שם פרטי
                      </label>
                      <input
                        type='text'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
                        required
                      />
                    </div>

                    {/* שם משפחה */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        שם משפחה
                      </label>
                      <input
                        type='text'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className='w-full px-4 py-2 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
                        required
                      />
                    </div>
                  </div>

                  {/* כיתה */}
                  <div className='mt-6'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      כיתה
                    </label>
                    <input
                      type='text'
                      name='grade'
                      value={formData.grade}
                      onChange={handleInputChange}
                      className='w-full px-4 py-2 rounded-lg border border-gray-300 
                     focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
                      required
                    />
                  </div>

                  {/* תגיות */}
                  <div className='mt-8'>
                    <label className='block text-sm font-medium text-gray-700 mb-3'>
                      בחירת תגיות (ניתן לבחור יותר מתגית אחת)
                    </label>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
                      {tagOptions.map(option => (
                        <div
                          key={option.value}
                          className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                            formData.tags.includes(option.value)
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
                  </div>

                  {/* פרטי הורים */}
                  <div className='mt-10 space-y-6'>
                    <div>
                      <h3 className='text-lg font-medium text-gray-700 border-b pb-2'>
                        פרטי הורים
                      </h3>
                    </div>

                    {/* הורה 1 */}
                    <div className='space-y-4 mt-4 p-4 bg-gray-50 rounded-lg'>
                      <p className='text-sm font-medium text-gray-700'>
                        הורה 1 (חובה)
                      </p>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            שם
                          </label>
                          <input
                            type='text'
                            name='parent1Name'
                            value={formData.parent1Name}
                            onChange={handleInputChange}
                            className='w-full px-4 py-2 rounded-lg border border-gray-300 
                           focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
                            required
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            טלפון
                          </label>
                          <input
                            type='tel'
                            name='parent1Phone'
                            value={formData.parent1Phone}
                            onChange={handleInputChange}
                            className='w-full px-4 py-2 rounded-lg border border-gray-300 
                           focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* הורה 2 */}
                    <div className='space-y-4 mt-4 p-4 bg-gray-50 rounded-lg'>
                      <p className='text-sm font-medium text-gray-700'>
                        הורה 2 (לא חובה)
                      </p>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            שם
                          </label>
                          <input
                            type='text'
                            name='parent2Name'
                            value={formData.parent2Name}
                            onChange={handleInputChange}
                            className='w-full px-4 py-2 rounded-lg border border-gray-300 
                           focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
                          />
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            טלפון
                          </label>
                          <input
                            type='tel'
                            name='parent2Phone'
                            value={formData.parent2Phone}
                            onChange={handleInputChange}
                            className='w-full px-4 py-2 rounded-lg border border-gray-300 
                           focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* כפתור שליחה תחתון */}
                  <div className='sticky bottom-0 left-0 right-0 bg-white pt-6 pb-4 mt-10 border-t border-gray-200 flex justify-center'>
                    <Button type='submit'>שמירה</Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrackingPage;
