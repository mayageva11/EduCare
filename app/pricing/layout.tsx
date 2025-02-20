interface PricingLayoutProps {
  children: React.ReactNode;
}

export default function PricingLayout({ children }: PricingLayoutProps) {
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
  title: 'מחירים - EduCare',
  description: 'תמחור ותוכניות מנוי למערכת EduCare'
};
