'use client';

import { Button } from '@/components/common';
import { PostTimeRequest } from '@/service/types/time';
import { Status } from '@prisma/client';
import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';

type Props = {
	onStart: ({ subject, time, status }: PostTimeRequest) => void;
	onEndTime: () => void;
};

export default function TimeForm({ onStart, onEndTime }: Props) {
	const [timeTitle, setTimeTitle] = useState('');

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setTimeTitle(value);
	};

	const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		if (timeTitle === '') {
			alert('주제를 입력해주세요');
			return;
		}
		const date = new Date();
		onStart({ time: date, subject: timeTitle, status: Status.START });
	};

	return (
		<form
			onSubmit={onSubmit}
			className="flex w-full flex-col items-center gap-4"
		>
			<input
				type="text"
				className="w-full max-w-2xl rounded-[100px] border-2 border-h_light_black bg-h_black px-7 py-2 text-2xl focus:border-white"
				onChange={onChange}
				value={timeTitle}
				placeholder="주제 ex: 운동하기"
			/>
			<Button size="medium">타이머 시작하기</Button>
		</form>
	);
}
