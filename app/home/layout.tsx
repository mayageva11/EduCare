export default function HomeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir='rtl' className='min-h-screen bg-gray-50'>
      {children}
    </div>
  );
}

export const metadata = {
  title: 'דף הבית - EduCare',
  description: 'מערכת ניהול ותיעוד למעקב אחר תלמידים'
};
