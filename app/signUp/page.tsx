'use client';

import React, { useState } from 'react';
import { User } from '@/types/user';
import Button from '../../components/Button';
import Input from '@/components/Input';
import Navbar from '../../components/NavBar';

export default function SignUpPage() {
  const navLinks = [
    { href: '/aboutUs', label: 'אודות' },
    { href: '/', label: 'התחברות' }
  ];
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
      <Navbar links={navLinks} />

      {/* Main Content */}
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8'>
          <h1 className='text-3xl font-bold text-center text-[#2c5282] mb-8'>
            הרשמה ל-EduCare
          </h1>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid md:grid-cols-2 gap-6'>
              {/* שם פרטי */}
              <Input
                id='firstName'
                label='שם פרטי'
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />

              {/* שם משפחה */}
              <Input
                id='lastName'
                label='שם משפחה'
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* מייל */}
            <Input
              id='email'
              type='email'
              label='כתובת מייל'
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            {/* העלאת תעודה */}
            <div>
              <label className='block text-lg font-medium text-gray-700 mb-2'>
                תעודת יועץ חינוכי 📄
              </label>
              <p className='text-gray-600 mb-3'>
                נא להעלות את רישיון היעוץ ממשרד החינוך
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
            <Input
              id='password'
              type='password'
              label='סיסמא'
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            {/* אימות סיסמא */}
            <Input
              id='confirmPassword'
              type='password'
              label='אימות סיסמא'
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />

            {/* כפתור שליחה */}
            <div className='flex justify-center pt-4'>
              <Button type='submit'>הרשמה</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
