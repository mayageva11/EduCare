'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/NavBar';
import Button from '@/components/Button';
import PieChart from '@/components/PieChart';
import ExternalLinks from '@/components/ExternalLinks';
import { reminderService, Reminder } from '@/services/reminderService';
import { studentService, StudentStats } from '@/services/studentService';
import { externalLinks } from '@/data/externalLinks';
import { getTagColor, tagLabels } from '@/utils/colors';

export default function HomePage() {
  // State for data
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [statistics, setStatistics] = useState<StudentStats>({
    green: 0,
    yellow: 0,
    orange: 0,
    red: 0,
    blue: 0,
    purple: 0
  });
  const [isLoading, setIsLoading] = useState({
    reminders: true,
    stats: true
  });

  // Navigation links with dropdowns
  const navLinks = [
    { href: '/tracking', label: 'מעקב' },
    {
      href: '/activities',
      label: 'פעילויות',
      dropdown: [
        { href: '/activities/history', label: 'היסטוריית פעילויות' },
        { href: '/activities/new', label: 'הוספת פעילות חדשה' }
      ]
    },
    { href: '/calendar', label: 'יומן' },
    {
      href: '/contacts',
      label: 'אנשי קשר',
      dropdown: [
        { href: '/contacts/forum', label: 'פורום' },
        { href: '/contacts/favorites', label: 'מועדפים' }
      ]
    },
    { href: '/profile', label: 'פרופיל אישי' }
  ];

  // Calculate total students for percentage
  const totalStudents = Object.values(statistics).reduce((a, b) => a + b, 0);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch reminders
        setIsLoading(prev => ({ ...prev, reminders: true }));
        // const remindersData = await reminderService.getReminders();
        // setReminders(remindersData);
        setIsLoading(prev => ({ ...prev, reminders: false }));

        // Fetch student statistics
        setIsLoading(prev => ({ ...prev, stats: true }));
        const statsData = await studentService.getStudentStats();
        setStatistics(statsData);
        setIsLoading(prev => ({ ...prev, stats: false }));
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading({ reminders: false, stats: false });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar links={navLinks} />

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-8'>
        {/* קישורים חיצוניים */}
        <ExternalLinks links={externalLinks} />

        {/* Reminders Section */}
        <div className='bg-white rounded-2xl shadow-xl p-8 mb-10'>
          <h2 className='text-3xl font-bold text-[#2c5282] mb-6'>
            תזכורות קרובות
          </h2>

          {isLoading.reminders ? (
            <div className='py-6 text-center text-gray-500'>
              טוען תזכורות...
            </div>
          ) : reminders.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr>
                    <th className='px-6 py-3 text-right text-sm font-medium text-gray-600 uppercase tracking-wider'>
                      תאריך
                    </th>
                    <th className='px-6 py-3 text-right text-sm font-medium text-gray-600 uppercase tracking-wider'>
                      שעה
                    </th>
                    <th className='px-6 py-3 text-right text-sm font-medium text-gray-600 uppercase tracking-wider'>
                      נושא
                    </th>
                    <th className='px-6 py-3 text-right text-sm font-medium text-gray-600 uppercase tracking-wider'>
                      תלמיד/ה
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {reminders.map(reminder => (
                    <tr key={reminder.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap text-lg text-gray-800'>
                        {reminder.date}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-lg text-gray-800'>
                        {reminder.time}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-lg text-gray-800'>
                        {reminder.title}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-lg text-gray-800'>
                        {reminder.studentName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='py-10 text-center text-gray-500'>
              <p className='text-xl mb-4'>אין תזכורות קרובות</p>
              <Button
                onClick={() => (window.location.href = '/calendar/new')}
                className='mx-auto'
              >
                הוסף תזכורת חדשה
              </Button>
            </div>
          )}
        </div>

        {/* Statistics Section - עם דיאגרמת העוגה */}
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <h2 className='text-3xl font-bold text-[#2c5282] mb-6'>
            סטטיסטיקות תלמידים
          </h2>

          {isLoading.stats ? (
            <div className='py-6 text-center text-gray-500'>
              טוען סטטיסטיקות...
            </div>
          ) : totalStudents > 0 ? (
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
              {/* דיאגרמת עוגה */}
              <div className='flex items-center justify-center'>
                <PieChart
                  statistics={statistics}
                  totalStudents={totalStudents}
                />
              </div>

              {/* מקרא */}
              <div className='flex flex-col justify-center'>
                <div className='space-y-4'>
                  {Object.entries(statistics).map(
                    ([tag, count]) =>
                      count > 0 && (
                        <div key={tag} className='flex items-center'>
                          <div
                            className='w-5 h-5 rounded-sm ml-3'
                            style={{ backgroundColor: getTagColor(tag) }}
                          ></div>
                          <span className='text-lg'>
                            {tagLabels[tag as keyof typeof tagLabels]}
                          </span>
                          <span className='mr-auto text-lg font-bold'>
                            {count} תלמידים (
                            {Math.round((count / totalStudents) * 100)}%)
                          </span>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className='py-10 text-center text-gray-500'>
              <p className='text-xl mb-4'>אין נתוני תלמידים</p>
              <Button
                onClick={() => (window.location.href = '/tracking/new')}
                className='mx-auto'
              >
                הוסף תלמידים למערכת
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
