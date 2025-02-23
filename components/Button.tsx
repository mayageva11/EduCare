import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  className = '',
  href
}) => {
  const baseStyle = `
    px-8 
    py-3 
    rounded-xl 
    bg-blue-400 
    text-black 
    font-semibold 
    hover:bg-blue-500 
    transition-all 
    duration-200 
    shadow-lg
    text-xl
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
