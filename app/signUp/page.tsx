'use client';

import React, { useState, useContext } from 'react';
import { User } from '@/types/users';
import Button from '../../components/Button';
import Input from '@/components/Input';
import Navbar from '../../components/NavBar';
import { authService } from '@/services/authService';
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function SignUpPage() {
  const auth = useContext(AuthContext);
  const router = useRouter();

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
    school: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate form data
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword ||
        !formData.school
      ) {
        alert('כל השדות הינם חובה');
        return;
      }

      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        alert('הסיסמאות אינן תואמות');
        return;
      }

      // Use auth service to register
      
      const result = await authService.register(formData);

      if (result) {
        alert(result.message || 'נרשמת בהצלחה! החשבון שלך יאושר בקרוב'); // Handle successful response
        auth?.register(result.token, result.user); // Use AuthContext to store in localStorage
        router.push("/home"); // Redirect after registration
      }
      
    } catch (error: any) {
      console.error('Signup error:', error);
      alert(error.message || 'אירעה שגיאה בתהליך ההרשמה');
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
                name='firstName'
                label='שם פרטי'
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />

              {/* שם משפחה */}
              <Input
                id='lastName'
                name='lastName'
                label='שם משפחה'
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* מייל */}
            <Input
              id='email'
              name='email'
              type='email'
              label='כתובת מייל'
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {/* סיסמא */}
            <Input
              id='school'
              name='school'
              type='school'
              label='שם בית ספר'
              value={formData.school}
              onChange={handleInputChange}
              required
            />

            {/* סיסמא */}
            <Input
              id='password'
              name='password'
              type='password'
              label='סיסמא'
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            {/* אימות סיסמא */}
            <Input
              id='confirmPassword'
              name='confirmPassword'
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
