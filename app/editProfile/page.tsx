'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/context/AuthContext';
import Navbar from '@/components/NavBar';
import Button from '@/components/Button';
import { authService } from '@/services/authService';

export default function EditProfilePage() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [school, setSchool] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!auth?.token) {
          router.push('/');
          return;
        }

        const profile = await authService.getProfile();
        setSchool(profile.school || '');
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError('שגיאה בטעינת המידע');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [auth?.token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.updateSchool({ school });
      router.push('/profile');
    } catch (err: any) {
      console.error(err);
      setError('שגיאה בשמירת העדכון');
    }
  };

  const navLinks = [
    { href:'/home', label: 'דף הבית' },
    { href: '/tracking', label: 'מעקב' },
    { href: '/activities', label: 'פעילויות' },
    { href: '/calendar', label: 'יומן' },
    { href: '/contacts', label: 'אנשי קשר' },
  ];

  if (loading) {
    return (
      <>
        <Navbar links={navLinks} />
        <div className="text-center p-8">טוען...</div>
      </>
    );
  }

  return (
    <>
      <Navbar links={navLinks} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold mb-6 text-center text-[#2c5282]">עריכת בית ספר</h1>

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">שם בית ספר</label>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div className="text-center">
              <Button type="submit">שמור</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
