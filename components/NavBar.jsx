import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoImage from '../assets/logo.png';

export default function Navbar() {
  return (
    <nav className='w-full bg-white py-4 mb-8 shadow-lg' dir='rtl'>
      <div className='max-w-7xl mx-auto px-6 flex justify-between items-center'>
        <div className='flex items-center space-x-2'>
          <Image
            src={logoImage}
            alt='EduCare לוגו'
            width={256}
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
            href='/pricing'
            className='px-8 py-3 rounded-xl bg-blue-400 text-black font-semibold 
                      hover:bg-blue-500 transition-all duration-200 shadow-lg'
          >
            מחירים
          </Link>
          <Link
            href='/signIn'
            className='px-8 py-3 rounded-xl bg-blue-400 text-black font-semibold 
                      hover:bg-blue-500 transition-all duration-200 shadow-lg'
          >
            התחברות
          </Link>
        </div>
      </div>
    </nav>
  );
}
