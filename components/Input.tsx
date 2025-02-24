// app/components/Input.tsx
import React from 'react';

interface InputProps {
  id: string;
  name: string;
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
  name,
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
      <label
        htmlFor={id}
        className='block text-lg font-medium text-gray-700 mb-2'
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 rounded-lg border-2 border-blue-400 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                 transition-all duration-200 text-lg ${className}`}
      />
    </div>
  );
};

export default Input;
