'use client';

import Image from 'next/image';
import Link from 'next/link';
import logoImage from '../../assets/logo.png';

export default function AboutUsPage() {
  return (
    <>
      {/* Navigation */}
      <nav className='w-full bg-white py-6 mb-8 shadow-lg'>
        <div className='max-w-7xl mx-auto px-6 flex justify-between items-center'>
          <div className='flex items-center space-x-2'>
            <Image
              src={logoImage}
              alt='EduCare Logo'
              width={120}
              height={48}
              className='h-12 w-auto'
              priority
            />
            <span className='text-2xl font-bold text-[#2c5282] ml-2'>
              EduCare
            </span>
          </div>

          <div className='flex gap-6'>
            <Link
              href='/pricing'
              className='px-8 py-3 rounded-xl bg-blue-400 text-black font-semibold 
                        hover:bg-blue-500 transition-all duration-200 shadow-lg 
                        hover:shadow-xl hover:-translate-y-0.5 text-xl'
            >
              Pricing
            </Link>
            <Link
              href='/'
              className='px-8 py-3 rounded-xl bg-blue-400 text-black font-semibold 
                        hover:bg-blue-500 transition-all duration-200 shadow-lg 
                        hover:shadow-xl hover:-translate-y-0.5 text-xl'
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className='bg-gradient-to-r from-blue-500 to-blue-600 text-white py-20 mb-12'>
        <div className='container mx-auto px-4 max-w-4xl text-center'>
          <h1 className='text-5xl font-bold mb-6'>
            Empowering School Counselors in Israel
          </h1>
          <p className='text-2xl opacity-90'>
            Transforming student support through digital organization
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className='container mx-auto px-4 max-w-4xl pb-20'>
        <div className='space-y-16'>
          {/* Mission Section */}
          <section className='bg-white rounded-2xl shadow-xl p-10 transform hover:scale-[1.01] transition-all duration-300'>
            <h2 className='text-3xl font-bold text-[#2c5282] mb-6'>
              Our Mission
            </h2>
            <p className='text-xl text-gray-700 leading-relaxed'>
              At EduCare, we understand the challenges faced by school
              counselors managing large student populations. Our platform
              transforms the traditional Excel-based tracking into an intuitive,
              secure, and efficient digital solution.
            </p>
          </section>

          {/* Features Grid */}
          <section className='space-y-8'>
            <h2 className='text-3xl font-bold text-[#2c5282] text-center mb-10'>
              What We Offer
            </h2>
            <div className='grid md:grid-cols-2 gap-8'>
              <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300'>
                <div className='w-16 h-16 bg-blue-100 rounded-xl mb-6 flex items-center justify-center'>
                  <div className='w-8 h-8 bg-blue-500 rounded-lg'></div>
                </div>
                <h3 className='text-2xl font-bold text-[#2c5282] mb-4'>
                  Streamlined Documentation
                </h3>
                <p className='text-lg text-gray-700'>
                  Replace cumbersome spreadsheets with our intuitive digital
                  system, designed specifically for managing student records and
                  interactions.
                </p>
              </div>

              <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300'>
                <div className='w-16 h-16 bg-blue-100 rounded-xl mb-6 flex items-center justify-center'>
                  <div className='w-8 h-8 bg-blue-500 rounded-lg'></div>
                </div>
                <h3 className='text-2xl font-bold text-[#2c5282] mb-4'>
                  Professional Network
                </h3>
                <p className='text-lg text-gray-700'>
                  Connect with fellow counselors, share knowledge, and exchange
                  experiences about working with various professionals in the
                  field.
                </p>
              </div>

              <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300'>
                <div className='w-16 h-16 bg-blue-100 rounded-xl mb-6 flex items-center justify-center'>
                  <div className='w-8 h-8 bg-blue-500 rounded-lg'></div>
                </div>
                <h3 className='text-2xl font-bold text-[#2c5282] mb-4'>
                  Activity Tracking
                </h3>
                <p className='text-lg text-gray-700'>
                  Keep detailed records of all student interactions, meetings,
                  and interventions with our easy-to-use date-based tracking
                  system.
                </p>
              </div>

              <div className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300'>
                <div className='w-16 h-16 bg-blue-100 rounded-xl mb-6 flex items-center justify-center'>
                  <div className='w-8 h-8 bg-blue-500 rounded-lg'></div>
                </div>
                <h3 className='text-2xl font-bold text-[#2c5282] mb-4'>
                  Verified Platform
                </h3>
                <p className='text-lg text-gray-700'>
                  Rest assured with our verified-users-only policy, ensuring a
                  secure and professional environment for all counselors.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className='bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-xl p-12 text-center text-white'>
            <h2 className='text-3xl font-bold mb-6'>
              Ready to Transform Your Work?
            </h2>
            <p className='text-xl mb-8 opacity-90'>
              Join hundreds of school counselors already using EduCare to
              improve their workflow.
            </p>
            <Link
              href='/register'
              className='inline-block px-10 py-4 bg-white text-blue-600 rounded-xl text-xl 
                        font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 
                        transition-all duration-200'
            >
              Join EduCare Today
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
