'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/NavBar';
import logoImage from '../assets/logo.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <div className='min-h-screen bg-gray-100'>
      <Navbar />

      <div className='container mx-auto px-4 flex justify-center items-center min-h-[calc(100vh-12rem)]'>
        <div className='w-full max-w-md mb-8 bg-white rounded-xl shadow-xl p-8 space-y-8'>
          <h1 className='text-3xl font-bold text-center text-black'>
            Welcome Back
          </h1>

          {/* Logo Below Welcome Back */}
          <div className='flex justify-center items-center mb-8'>
            <Image
              src={logoImage}
              alt='EduCare Logo'
              width={300}
              height={120}
              className='h-32 w-auto' // Increased to h-32
            />
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block text-lg font-medium text-black mb-2'
              >
                Email Address
              </label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='w-full px-4 py-3 rounded-lg border-2 border-blue-400 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition-all duration-200 text-lg text-black'
                placeholder='Enter your email'
                required
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-lg font-medium text-black mb-2'
              >
                Password
              </label>
              <input
                id='password'
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='w-full px-4 py-3 rounded-lg border-2 border-blue-400 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         transition-all duration-200 text-lg text-black'
                placeholder='Enter your password'
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
              Submit
            </button>
          </form>

          <div className='text-center pt-4'>
            <p className='text-black text-lg'>
              New here?{' '}
              <Link
                href='/register'
                className='text-black font-bold hover:underline'
              >
                Click here
              </Link>{' '}
              to register
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
