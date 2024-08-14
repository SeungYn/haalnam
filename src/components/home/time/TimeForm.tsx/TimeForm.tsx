'use client';

import { Button } from '@/components/common';
import { IoAddCircleIcon } from '@/components/icons';
import { PostTimeRequest } from '@/service/types/time';
import { Status } from '@prisma/client';
import {
	ChangeEvent,
	Dispatch,
	FormEventHandler,
	SetStateAction,
	useState,
} from 'react';

type Props = {
	onStart: ({ subject, time, status }: PostTimeRequest) => void;
	onEndTime: () => void;
	onAddPopUpOpen: Dispatch<SetStateAction<boolean>>;
};

export default function TimeForm({
	onStart,
	onEndTime,
	onAddPopUpOpen,
}: Props) {
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
		<>
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
				<div className="relative">
					<Button size="medium">타이머 시작하기</Button>
					<Button
						type="button"
						size="medium"
						className="absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 rounded-full border-none !p-0"
						onClick={() => onAddPopUpOpen(true)}
						title="시간 추가하기"
					>
						<IoAddCircleIcon size="large" />
					</Button>
				</div>
			</form>
		</>
	);
}
