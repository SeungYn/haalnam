'use client';
import { TextareaHTMLAttributes, useEffect, useRef, useState } from 'react';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	className?: string;
};

export default function AutoHeightTextArea({
	className,
	value,
	...props
}: Props) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		const textarea = textareaRef.current!;
		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight + 2}px`;
	}, [value]);

	return (
		<textarea
			ref={textareaRef}
			className={className}
			value={value}
			{...props}
			placeholder="나를 소개해요😊"
		/>
	);
}
