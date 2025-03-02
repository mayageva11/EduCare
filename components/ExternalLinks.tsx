import React from 'react';

export interface ExternalLink {
  title: string;
  url: string;
  icon: string;
  description: string;
}

interface ExternalLinksProps {
  links: ExternalLink[];
}

const ExternalLinks: React.FC<ExternalLinksProps> = ({ links }) => {
  return (
    <div className='bg-white rounded-2xl shadow-xl p-8 mb-10'>
      <h2 className='text-3xl font-bold text-[#2c5282] mb-6'>
        קישורים שימושיים
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target='_blank'
            rel='noopener noreferrer'
            className='bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl p-6 flex flex-col items-center text-center border border-blue-200 hover:border-blue-300'
          >
            <div className='text-3xl mb-3'>{link.icon}</div>
            <h3 className='font-bold text-lg text-blue-800 mb-2'>
              {link.title}
            </h3>
            <p className='text-sm text-gray-600'>{link.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ExternalLinks;
