import React from 'react';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  className = ''
}) => {
  return (
    <div className='w-full'>
      <label htmlFor={id} className='block text-lg font-medium text-black mb-2'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`
          w-full 
          px-4 
          py-3 
          rounded-lg 
          border-2 
          border-blue-400 
          focus:ring-2 
          focus:ring-blue-500 
          focus:border-blue-500 
          transition-all 
          duration-200 
          text-lg 
          text-black 
          text-right
          ${className}
        `}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;
