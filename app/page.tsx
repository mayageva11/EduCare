'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/NavBar';
import logoImage from '../assets/logo.png';
import Button from '../components/Button';
import Input from '@/components/Input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navLinks = [
    { href: '/aboutUs', label: 'אודות' },
    { href: '/pricing', label: 'מחירים' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add your login logic here
      console.log('Login attempt:', { email, password });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100' dir='rtl'>
      <Navbar links={navLinks} />

      <div className='container mx-auto px-4 flex justify-center items-center min-h-[calc(100vh-12rem)]'>
        <div className='w-full max-w-md mb-8 bg-white rounded-xl shadow-xl p-8 space-y-8'>
          <div className='flex justify-center items-center mb-8'>
            <Image
              src={logoImage}
              alt='EduCare לוגו'
              width={300}
              height={120}
              className='h-32 w-auto'
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className='space-y-6 flex flex-col items-center'
          >
            {' '}
            <Input
              id='email'
              label='כתובת אימייל'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='הכנס את האימייל שלך'
              required
            />
            <Input
              id='password'
              label='סיסמה'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='הכנס סיסמה'
              required
            />
            <Button type='submit'>התחבר</Button>
          </form>

          <div className='text-center pt-4'>
            <p className='text-black text-lg'>
              חדש כאן?{' '}
              <Link
                href='/signUp'
                className='text-black font-bold hover:underline'
              >
                לחץ כאן
              </Link>{' '}
              להרשמה
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
