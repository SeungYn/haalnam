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
	accent?: boolean;
	isLoading?: boolean;
};

export function Button({
	className = '',
	size = 'none',
	accent = false,
	isLoading = false,
	...props
}: Prop) {
	if (accent)
		return (
			<button
				className={`flex items-center justify-center border-0 bg-white py-3 text-h_black transition-colors hover:border hover:border-h_gray hover:bg-black hover:text-white ${className} ${sizeStyle[size]}`}
				{...props}
			/>
		);
	return (
		<>
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-h_light_black bg-opacity-50">
					<div className="h-10 w-10 animate-spin rounded-full border-4 border-h_light_black border-t-white"></div>
				</div>
			)}
			<button
				className={`flex items-center justify-center border border-h_gray bg-h_black text-white transition-colors hover:bg-h_light_black disabled:text-h_gray ${className} ${sizeStyle[size]}`}
				{...props}
			/>
		</>
	);
}
