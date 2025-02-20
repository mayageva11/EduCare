import Image from 'next/image';
import Link from 'next/link';
import logoImage from '../../assets/logo.png';

export default function PricingPage() {
  return (
    <div
    //   dir='rtl'
    //   className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'
    >
      {/* Navigation */}
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
            <Link
              href='/aboutUs'
              className='px-8 py-3 rounded-xl bg-blue-400 text-black font-semibold 
                      hover:bg-blue-500 transition-all duration-200 shadow-lg'
            >
              אודות
            </Link>
            <Link
              href='/'
              className='px-8 py-3 rounded-xl  bg-blue-400 text-black font-semibold 
                      hover:bg-blue-500 transition-all duration-200 shadow-lg'
            >
              התחברות
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className='bg-gradient-to-r from-blue-500 to-blue-600 text-white py-16'>
        <div className='container mx-auto px-4 max-w-4xl text-center'>
          <h1 className='text-4xl font-bold mb-4'>מחיר הוגן, ערך עצום</h1>
          <p className='text-xl opacity-90'>
            השקעה קטנה לניהול יעיל של המעקב אחר התלמידים שלך
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className='container mx-auto px-4 py-12 max-w-5xl'>
        <div className='bg-white rounded-2xl shadow-xl p-8 md:p-12'>
          {/* Price Card */}
          <div className='max-w-lg mx-auto bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-lg p-8 border-2 border-blue-200'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-[#2c5282] mb-4'>
                חבילה מקצועית
              </h2>
              <div className='flex justify-center items-end text-5xl font-bold text-gray-900 mb-2'>
                30
                <span className='text-lg text-gray-600 font-normal'>
                  ₪ / לחודש
                </span>
              </div>
              <p className='text-gray-600'>למשתמש בודד</p>
            </div>

            <div className='space-y-4 mb-8'>
              <div className='flex items-center gap-3 text-lg'>
                <div className='w-6 h-6 rounded-full bg-green-100 flex items-center justify-center'>
                  <span className='text-green-600'>✓</span>
                </div>
                <span>גישה מלאה לכל התכונות</span>
              </div>
              <div className='flex items-center gap-3 text-lg'>
                <div className='w-6 h-6 rounded-full bg-green-100 flex items-center justify-center'>
                  <span className='text-green-600'>✓</span>
                </div>
                <span>מעקב אחר תלמידים ללא הגבלה</span>
              </div>
              <div className='flex items-center gap-3 text-lg'>
                <div className='w-6 h-6 rounded-full bg-green-100 flex items-center justify-center'>
                  <span className='text-green-600'>✓</span>
                </div>
                <span>יצירת דוחות ותיעוד מתקדם</span>
              </div>
              <div className='flex items-center gap-3 text-lg'>
                <div className='w-6 h-6 rounded-full bg-green-100 flex items-center justify-center'>
                  <span className='text-green-600'>✓</span>
                </div>
                <span>גיבוי נתונים אוטומטי</span>
              </div>
              <div className='flex items-center gap-3 text-lg'>
                <div className='w-6 h-6 rounded-full bg-green-100 flex items-center justify-center'>
                  <span className='text-green-600'>✓</span>
                </div>
                <span>תמיכה טכנית מלאה</span>
              </div>
            </div>

            <Link
              href='/register'
              className='block w-full py-4 px-6 bg-blue-500 text-white text-center text-xl 
                       font-bold rounded-xl shadow-lg hover:bg-blue-600 
                       transform hover:scale-[1.02] transition-all duration-200'
            >
              התחילו עכשיו
            </Link>
          </div>

          {/* Additional Benefits */}
          <div className='mt-16 grid md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center'>
                <div className='w-8 h-8 bg-blue-500 rounded-lg'></div>
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-2'>
                ללא התחייבות
              </h3>
              <p className='text-gray-600'>
                אפשרות לבטל בכל עת, ללא קנסות או דמי ביטול
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center'>
                <div className='w-8 h-8 bg-blue-500 rounded-lg'></div>
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-2'>
                עדכונים שוטפים
              </h3>
              <p className='text-gray-600'>
                גישה לכל התכונות החדשות והשיפורים במערכת
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center'>
                <div className='w-8 h-8 bg-blue-500 rounded-lg'></div>
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-2'>
                אבטחה מתקדמת
              </h3>
              <p className='text-gray-600'>
                הגנה מלאה על המידע הרגיש של התלמידים
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className='mt-16 text-center'>
          <h2 className='text-3xl font-bold text-[#2c5282] mb-8'>
            שאלות נפוצות
          </h2>
          <div className='grid md:grid-cols-2 gap-8 text-right'>
            <div>
              <h3 className='text-xl font-bold text-gray-900 mb-2'>
                איך מתחילים?
              </h3>
              <p className='text-gray-600'>
                פשוט נרשמים למערכת, מאמתים את היותכם יועצים חינוכיים, ומתחילים
                להשתמש!
              </p>
            </div>
            <div>
              <h3 className='text-xl font-bold text-gray-900 mb-2'>
                האם המידע מאובטח?
              </h3>
              <p className='text-gray-600'>
                כן, אנחנו משתמשים בטכנולוגיות אבטחה מתקדמות להגנה על המידע.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
