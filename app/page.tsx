'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/NavBar';
import logoImage from '../assets/logo.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Modify your handleSubmit function in the LoginPage component
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Login successful
      console.log('Login successful:', data);
      // Redirect to dashboard or home page
      window.location.href = '/pricing'; // or use Next.js router
    } else {
      // Handle login error
      console.error('Login failed:', data.error);
      // Show error message to user
      alert(data.error);
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred during login');
  }
};

  return (
    <div className='min-h-screen bg-gray-100' dir='rtl'>
      <Navbar />

      <div className='container mx-auto px-4 flex justify-center items-center min-h-[calc(100vh-12rem)]'>
        <div className='w-full max-w-md mb-8 bg-white rounded-xl shadow-xl p-8 space-y-8'>
          {/* <h1 className='text-3xl font-bold text-center text-black'>
            ברוכים השבים
          </h1> */}

          {/* Logo Below Welcome Back */}
          <div className='flex justify-center items-center mb-8'>
            <Image
              src={logoImage}
              alt='EduCare לוגו'
              width={300}
              height={120}
              className='h-32 w-auto'
            />
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block text-lg font-medium text-black mb-2'
              >
                כתובת אימייל
              </label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='w-full px-4 py-3 rounded-lg border-2 border-blue-400 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition-all duration-200 text-lg text-black text-right'
                placeholder='הכנס את האימייל שלך'
                required
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-lg font-medium text-black mb-2'
              >
                סיסמה
              </label>
              <input
                id='password'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='w-full px-4 py-3 rounded-lg border-2 border-blue-400 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition-all duration-200 text-lg text-black text-right'
                placeholder='הכנס את הסיסמה שלך'
                required
              />
            </div>

            <button
              type='submit'
              className='w-52 py-4 px-6 mt-6 bg-blue-400 text-black rounded-2xl 
             font-bold text-xl shadow-lg hover:bg-blue-500 
             transform hover:scale-[1.02] transition-all duration-200
             mx-auto block'
            >
              התחבר
            </button>
          </form>

          <div className='text-center pt-4'>
            <p className='text-black text-lg'>
              חדש כאן?{' '}
              <Link
                href='/register'
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
