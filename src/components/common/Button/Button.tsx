'use client';

import { ButtonHTMLAttributes } from 'react';

const sizeStyle = {
	small: 'rounded-2xl py-2 px-6 text-xl ',
	medium: 'rounded-2xl py-3 px-10 text-2xl',
	large: 'rounded-2xl py-5 px-16 text-4xl',
	none: '',
};

type Prop = ButtonHTMLAttributes<HTMLButtonElement> & {
	className?: string;
	size?: keyof typeof sizeStyle;
};

export function Button({ className = '', size = 'none', ...props }: Prop) {
	return (
		<button
			className={`flex items-center justify-center border border-h_gray bg-h_black text-white transition-colors hover:bg-h_light_black ${className} ${sizeStyle[size]}`}
			{...props}
		/>
	);
}
