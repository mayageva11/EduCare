'use client';

import Link from 'next/link';
import Navbar from '../../components/NavBar';

export default function AboutUsPage() {
  const navLinks = [
    { href: '/pricing', label: 'מחירים' },
    { href: '/', label: 'התחברות' }
  ];
  return (
    <div dir='rtl'>
      {/* Navigation */}
      <Navbar links={navLinks} />

      {/* Hero Section */}
      <div className='bg-gradient-to-r from-blue-500 to-blue-600 text-white py-20 mb-12'>
        <div className='container mx-auto px-4 max-w-4xl text-center'>
          <h1 className='text-5xl font-bold mb-6'>
            מעצימים יועצים חינוכיים בישראל
          </h1>
          <p className='text-2xl opacity-90'>
            מובילים את המהפכה הדיגיטלית בתמיכה בתלמידים
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className='container mx-auto px-4 max-w-4xl pb-20'>
        <div className='space-y-16'>
          {/* Mission Section */}
          <section className='bg-white rounded-2xl shadow-xl p-10 transform hover:scale-[1.01] transition-all duration-300'>
            <h2 className='text-3xl font-bold text-[#2c5282] mb-6'>
              החזון שלנו
            </h2>
            <p className='text-xl text-gray-700 leading-relaxed'>
              ב-EduCare, אנחנו מבינים את האתגרים שעומדים בפני יועצים חינוכיים
              המנהלים אוכלוסיות תלמידים גדולות. הפלטפורמה שלנו הופכת את המעקב
              המסורתי מבוסס האקסל למערכת דיגיטלית אינטואיטיבית, מאובטחת ויעילה.
            </p>
          </section>

          {/* Features Grid */}
          <section className='space-y-8'>
            <h2 className='text-3xl font-bold text-[#2c5282] text-center mb-10'>
              מה אנחנו מציעים
            </h2>
            <div className='grid md:grid-cols-2 gap-8'>
              <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300'>
                <div className='w-16 h-16 bg-blue-100 rounded-xl mb-6 flex items-center justify-center'>
                  <div className='w-8 h-8 bg-blue-500 rounded-lg'></div>
                </div>
                <h3 className='text-2xl font-bold text-[#2c5282] mb-4'>
                  תיעוד מתקדם
                </h3>
                <p className='text-lg text-gray-700'>
                  החליפו גליונות אקסל מסורבלים במערכת דיגיטלית אינטואיטיבית,
                  המיועדת במיוחד לניהול רשומות תלמידים ואינטראקציות.
                </p>
              </div>

              <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300'>
                <div className='w-16 h-16 bg-blue-100 rounded-xl mb-6 flex items-center justify-center'>
                  <div className='w-8 h-8 bg-blue-500 rounded-lg'></div>
                </div>
                <h3 className='text-2xl font-bold text-[#2c5282] mb-4'>
                  רשת מקצועית
                </h3>
                <p className='text-lg text-gray-700'>
                  התחברו עם עמיתים למקצוע, שתפו ידע והחליפו חוויות על עבודה עם
                  אנשי מקצוע שונים בתחום.
                </p>
              </div>

              <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300'>
                <div className='w-16 h-16 bg-blue-100 rounded-xl mb-6 flex items-center justify-center'>
                  <div className='w-8 h-8 bg-blue-500 rounded-lg'></div>
                </div>
                <h3 className='text-2xl font-bold text-[#2c5282] mb-4'>
                  מעקב פעילויות
                </h3>
                <p className='text-lg text-gray-700'>
                  שמרו על תיעוד מפורט של כל האינטראקציות עם תלמידים, פגישות
                  והתערבויות באמצעות מערכת מעקב מבוססת תאריכים קלה לשימוש.
                </p>
              </div>

              <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300'>
                <div className='w-16 h-16 bg-blue-100 rounded-xl mb-6 flex items-center justify-center'>
                  <div className='w-8 h-8 bg-blue-500 rounded-lg'></div>
                </div>
                <h3 className='text-2xl font-bold text-[#2c5282] mb-4'>
                  פלטפורמה מאומתת
                </h3>
                <p className='text-lg text-gray-700'>
                  תוכלו להיות רגועים עם מדיניות המשתמשים המאומתים שלנו, המבטיחה
                  סביבה מקצועית ומאובטחת לכל היועצים.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className='bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-xl p-12 text-center text-white'>
            <h2 className='text-3xl font-bold mb-6'>
              מוכנים לשנות את דרך העבודה שלכם?
            </h2>
            <p className='text-xl mb-8 opacity-90'>
              הצטרפו למאות היועצים החינוכיים שכבר משתמשים ב-EduCare לשיפור
              תהליכי העבודה שלהם.
            </p>
            <Link
              href='/signUp'
              className='inline-block px-10 py-4 bg-white text-blue-600 rounded-xl text-xl 
                        font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 
                        transition-all duration-200'
            >
              הצטרפו ל-EduCare עכשיו
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
