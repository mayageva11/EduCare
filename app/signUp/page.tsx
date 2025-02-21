'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoImage from '../../assets/logo.png';
import { User } from '@/types/user'; // Import the interface

export default function SignUpPage() {
  const [formData, setFormData] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    certificate: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        certificate: e.target.files?.[0] || null
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add your signup logic here
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className='w-full bg-white py-4 mb-8 shadow-lg' dir='rtl'>
        <div className='max-w-7xl mx-auto px-6 flex justify-between items-center'>
          <div className='flex items-center space-x-2'>
            <Image
              src={logoImage}
              alt='EduCare לוגו'
              width={300}
              height={120}
              className='h-16 w-auto'
            />
          </div>

          <div className='flex gap-6'>
            <Link
              href='/aboutUs'
              className='px-8 py-3 rounded-xl bg-blue-400 text-black font-semibold 
                      hover:bg-blue-500 transition-all duration-200 shadow-lg'
            >
              אודות
            </Link>
            <Link
              href='/'
              className='px-8 py-3 rounded-xl  bg-blue-400 text-black font-semibold 
                      hover:bg-blue-500 transition-all duration-200 shadow-lg'
            >
              התחברות
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8'>
          <h1 className='text-3xl font-bold text-center text-[#2c5282] mb-8'>
            הרשמה ל-EduCare
          </h1>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid md:grid-cols-2 gap-6'>
              {/* שם פרטי */}
              <div>
                <label className='block text-lg font-medium text-gray-700 mb-2'>
                  שם פרטי
                </label>
                <input
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 rounded-lg border-2 border-blue-400 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                           transition-all duration-200 text-lg'
                  required
                />
              </div>

              {/* שם משפחה */}
              <div>
                <label className='block text-lg font-medium text-gray-700 mb-2'>
                  שם משפחה
                </label>
                <input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 rounded-lg border-2 border-blue-400 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                           transition-all duration-200 text-lg'
                  required
                />
              </div>
            </div>

            {/* מייל */}
            <div>
              <label className='block text-lg font-medium text-gray-700 mb-2'>
                כתובת מייל
              </label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='w-full px-4 py-3 rounded-lg border-2 border-blue-400 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition-all duration-200 text-lg'
                required
              />
            </div>

            {/* העלאת תעודה */}
            <div>
              <label className='block text-lg font-medium text-gray-700 mb-2'>
                תעודת יועץ חינוכי 📄
              </label>
              <p className='text-gray-600 mb-3'>
                נא להעלות את תעודת היועץ החינוכי ממשרד החינוך
              </p>
              <div className='flex items-center gap-4'>
                <label
                  className='px-6 py-3 rounded-lg bg-blue-100 text-blue-600 font-medium
                              hover:bg-blue-200 transition-all duration-200 text-lg 
                              flex items-center gap-2 cursor-pointer'
                >
                  <span>העלאת קובץ</span>
                  <span className='text-2xl'>📎</span>
                  <input
                    type='file'
                    onChange={handleFileChange}
                    className='hidden'
                    accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
                  />
                </label>
                <span className='text-gray-500 text-sm'>
                  {formData.certificate
                    ? formData.certificate.name
                    : 'טרם נבחר קובץ'}
                </span>
              </div>
            </div>

            {/* סיסמא */}
            <div>
              <label className='block text-lg font-medium text-gray-700 mb-2'>
                סיסמא
              </label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                className='w-full px-4 py-3 rounded-lg border-2 border-blue-400 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition-all duration-200 text-lg'
                required
              />
            </div>

            {/* אימות סיסמא */}
            <div>
              <label className='block text-lg font-medium text-gray-700 mb-2'>
                אימות סיסמא
              </label>
              <input
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className='w-full px-4 py-3 rounded-lg border-2 border-blue-400 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition-all duration-200 text-lg'
                required
              />
            </div>

            {/* כפתור שליחה */}
            <div className='flex justify-center pt-4'>
              <button
                type='submit'
                className='w-52 py-4 px-6 bg-blue-400 text-black rounded-2xl 
                         font-bold text-xl shadow-lg hover:bg-blue-500 
                         transform hover:scale-[1.02] transition-all duration-200'
              >
                הרשמה
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
