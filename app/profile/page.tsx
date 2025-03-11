'use client';

import React, { useState, useEffect, useContext } from 'react';
import Button from '@/components/Button';
import Navbar from '@/components/NavBar';
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import { authService } from "@/services/authService";

export default function ProfilePage() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    school: '',
    isVerified: false,
    createdAt: ''
  });

  const navLinks = [
    { href:'/home', label: 'דף הבית' },
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
  ];

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (auth?.token === undefined) return; // Wait until token is initialized
        if (!auth?.token) {
          router.push('/');
          return;
        }
  
        const userData = await authService.getProfile();
        setUserData(userData);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        setError(error.message || 'שגיאה בטעינת הפרופיל');
        setLoading(false);
        
        if (error.message.includes('לא מאומת') || error.message.includes('אסימון לא תקף')) {
          auth?.logout();
          router.push('/');
        }
      }
    };
  
    fetchUserProfile();
  }, [auth?.token, router]);

  if (loading) {
    return (
      <>
        <Navbar links={navLinks} />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-xl">טוען...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar links={navLinks} />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-red-700">{error}</p>
            <Button 
              type="button" 
              onClick={() => router.push('/home')}
              className="mt-4"
            >
              חזרה לדף הבית
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Format the date if available
  const formattedDate = userData.createdAt 
    ? new Date(userData.createdAt).toLocaleDateString('he-IL') 
    : '';

  return (
    <>
      {/* Navigation */}
      <Navbar links={navLinks} />

      {/* Main Content */}
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8'>
          <h1 className='text-3xl font-bold text-center text-[#2c5282] mb-8'>
            הפרופיל שלי
          </h1>

          {userData.isVerified ? (
            <div className="mb-6 text-center">
              <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full">
                החשבון מאומת ✓
              </span>
            </div>
          ) : (
            <div className="mb-6 text-center">
              <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full">
                החשבון בהמתנה לאימות
              </span>
            </div>
          )}

          <div className="space-y-6">
            {/* Profile information displayed in a card-like format */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-gray-500 text-sm">שם פרטי</p>
                  <p className="font-medium text-lg">{userData.firstName}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-gray-500 text-sm">שם משפחה</p>
                  <p className="font-medium text-lg">{userData.lastName}</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <p className="text-gray-500 text-sm">כתובת מייל</p>
                <p className="font-medium text-lg">{userData.email}</p>
              </div>
              
              <div className="mt-6 space-y-2">
                <p className="text-gray-500 text-sm">בית ספר</p>
                <p className="font-medium text-lg">{userData.school}</p>
              </div>
              
              {formattedDate && (
                <div className="mt-6 space-y-2">
                  <p className="text-gray-500 text-sm">תאריך הרשמה</p>
                  <p className="font-medium">{formattedDate}</p>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </>
  );
}