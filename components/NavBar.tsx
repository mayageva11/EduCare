'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoImage from '../assets/logo.png';

interface DropdownItem {
  href: string;
  label: string;
}

interface NavLink {
  href: string;
  label: string;
  dropdown?: DropdownItem[];
}

interface NavbarProps {
  links: NavLink[];
}

export default function Navbar({ links }: NavbarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

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

        <div className='flex items-center gap-6'>
          {links.map(link => (
            <div key={link.href} className='relative'>
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className='px-8 py-3 rounded-xl bg-blue-400 text-black font-semibold 
                             hover:bg-blue-500 transition-all duration-200 shadow-lg flex items-center'
                  >
                    {link.label}
                    <svg
                      className='mr-2 h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </button>

                  {activeDropdown === link.label && (
                    <div className='absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-10'>
                      {link.dropdown.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className='block px-4 py-2 text-gray-700 hover:bg-blue-100'
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  className='px-8 py-3 rounded-xl bg-blue-400 text-black font-semibold 
                          hover:bg-blue-500 transition-all duration-200 shadow-lg'
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
