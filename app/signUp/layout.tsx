interface SignupLayoutProps {
  children: React.ReactNode;
}

export default function SignupLayout({ children }: SignupLayoutProps) {
  return (
    <div
      dir='rtl'
      className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'
    >
      {children}
    </div>
  );
}

export const metadata = {
  title: 'הרשמה - EduCare',
  description: 'הרשמה למערכת EduCare ליועצים חינוכיים'
};
