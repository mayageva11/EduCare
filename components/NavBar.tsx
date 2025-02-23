import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoImage from '../assets/logo.png';

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  links: NavLink[];
}

export default function Navbar({ links }: NavbarProps) {
  return (
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
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className='px-8 py-3 rounded-xl bg-blue-400 text-black font-semibold 
                      hover:bg-blue-500 transition-all duration-200 shadow-lg'
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
