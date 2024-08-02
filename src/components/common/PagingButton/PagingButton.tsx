import Link from 'next/link';
import { PropsWithChildren } from 'react';

const sizeStyle = {
	// small: 'rounded-2xl min-w-[2rem]  text-xl ',
	// medium: 'rounded-2xl min-w-[2rem]  text-2xl',
	large: 'rounded-xl min-w-[2.8rem] min-h-[2.8rem]   text-4xl md:text-2xl',
	none: '',
};

type Props = {
	size?: keyof typeof sizeStyle;
	href?: string;
	active?: boolean;
};

export default function PagingButton({
	href,
	size = 'large',
	active = false,
	children,
}: PropsWithChildren<Props>) {
	if (href === undefined)
		return (
			<div
				className={`flex items-center justify-center border border-h_gray ${sizeStyle[size]} ${active ? 'border-white bg-white text-black' : 'border-h_gray bg-h_black text-white'}`}
			>
				{children}
			</div>
		);
	else if (href === '')
		return (
			<div
				className={`flex items-center justify-center border border-h_gray text-h_gray ${sizeStyle[size]}`}
			>
				{children}
			</div>
		);

	return (
		<Link
			href={href}
			className={`flex items-center justify-center border border-h_gray ${sizeStyle[size]} ${active ? 'bg-white text-black' : 'bg-h_black text-white'}`}
		>
			{children}
		</Link>
	);
}
