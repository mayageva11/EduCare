import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/NavBar';

export const metadata = {
  title: 'מעקב תלמידים',
  description: 'מערכת מעקב תלמידים'
};

export default function TrackingLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Navigation links with dropdown options
  const navLinks = [
    { href: '/home', label: 'דף הבית' },
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
        { href: '/contacts/teachers', label: 'מורים' }
      ]
    },
    { href: '/profile', label: 'פרופיל אישי' }
  ];

  return (
    <div dir='rtl' className='min-h-screen bg-gray-50'>
      {/* Navigation Bar */}
      <Navbar links={navLinks} />

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-6 py-8'>{children}</main>
    </div>
  );
}
