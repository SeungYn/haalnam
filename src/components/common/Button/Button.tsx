'use client';

import { ButtonHTMLAttributes } from 'react';

const sizeStyle = {
  small: 'rounded-6 py-7 px-11 text-xl ',
  medium: 'rounded-8 py-9 px-13 text-2xl',
  large: 'rounded-10 py-11 px-15 text-4xl',
  none: '',
};

type Prop = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  size?: keyof typeof sizeStyle;
};

export function Button({ className = '', size = 'none', ...props }: Prop) {
  return (
    <button
      className={`flex justify-center items-center ${className} ${sizeStyle[size]}`}
      {...props}
    />
  );
}
