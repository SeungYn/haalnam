'use client';

import { ButtonHTMLAttributes } from 'react';

const sizeStyle = {
  small: 'rounded-2xl py-2 px-6 text-xl ',
  medium: 'rounded-2xl py-5 px-10 text-2xl',
  large: 'rounded-2xl py-7 px-16 text-4xl',
  none: '',
};

type Prop = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  size?: keyof typeof sizeStyle;
};

export function Button({ className = '', size = 'none', ...props }: Prop) {
  return (
    <button
      className={`flex justify-center items-center bg-h_black text-white border border-h_gray hover:bg-h_light_black transition-colors ${className} ${sizeStyle[size]}`}
      {...props}
    />
  );
}
