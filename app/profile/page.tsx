import React from 'react';
import { User } from '@/types/users';
import Navbar from '../../components/NavBar';
import Button from '@/components/Button';
import { authService } from '@/services/authService';
import { GetServerSideProps } from 'next';

interface ProfilePageProps {
  user: User | null;
}

export default function ProfilePage({ user }: ProfilePageProps) {
  const navLinks = [
    { href: '/home', label: 'דף הבית' },
    { href: '/logout', label: 'התנתקות' }
  ];

  const handleLogout = () => {
    // TODO: Implement logout logic
  };

  return (
    <>
      <Navbar links={navLinks} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-[#2c5282] mb-8">
            הפרופיל שלי
          </h1>

          {user ? (
            <div className="space-y-6">
              <p className="text-lg font-semibold text-gray-700">
                שם פרטי: {user.firstName}
              </p>
              <p className="text-lg font-semibold text-gray-700">
                שם משפחה: {user.lastName}
              </p>
              <p className="text-lg font-semibold text-gray-700">
                כתובת מייל: {user.email}
              </p>

              {user.certificate && (
                <div>
                  <p className="text-lg font-semibold text-gray-700">תעודה:</p>
                  <a
                    href={user.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    הורדת תעודה 📄
                  </a>
                </div>
              )}

              <div className="flex justify-center pt-4">
                <Button onClick={handleLogout}>התנתקות</Button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">משתמש לא נמצא.</p>
          )}
        </div>
      </div>
    </>
  );
}

// 🔥 Fetch user data on the server
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const userData = await authService.getProfile();
    return { props: { user: userData } };
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return { props: { user: null } };
  }
};
