/* eslint-disable*/

'use client';

import Image from 'next/image';
import { IoCameraOutlineIcon } from '../../icons';
import AutoHeightTextArea from '../../common/input/AutoHeightTextArea';
import { FormEvent, useRef, useState } from 'react';
import ProfileInput from './ProfileInput';
import { Button } from '../../common';
import { PostUserProfileRequest } from '@/service/types/user';

type Props = {
	image: string | null;
	nickname: string;
	introduce: string;
	instagram: string;
	id: string;
	onUserProfileModify: (req: PostUserProfileRequest) => void;
};

export default function ProfilePopUpForm({
	image,
	nickname,
	introduce,
	instagram,
	onUserProfileModify,
	id,
}: Props) {
	const fileRef = useRef<HTMLInputElement>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [form, setForm] = useState<{
		image: string | null;
		nickname: string;
		introduce: string;
		instagram: string;
		imageFile: null | File;
	}>({
		image,
		nickname,
		introduce: introduce || '',
		instagram,
		imageFile: null,
	});

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		onUserProfileModify({
			imageFile: form.imageFile,
			id,
			instagram: form.instagram,
			introduce: form.introduce as string,
			nickname: form.nickname,
		});
	};

	return (
		<form
			onSubmit={onSubmit}
			className="mx-auto flex w-full max-w-[512px] flex-col items-center gap-8 text-2xl"
		>
			<div
				className="relative cursor-pointer"
				onClick={() => fileRef.current?.click()}
			>
				<input
					ref={fileRef}
					hidden
					type="file"
					accept={'image/gif, image/jpeg, image/png'}
					onChange={(e) => {
						if (e.target.files) {
							let maxSize = 5 * 1024 * 1024; //* 5MB 사이즈 제한
							const size = e.target.files[0].size;
							if (size > maxSize) {
								alert('파일 사이즈를 5MB이하로 설정해주세요!');
								return;
							}

							const temporalImageUrl = URL.createObjectURL(e.target.files[0]);
							console.log(temporalImageUrl);
							setForm((f) => ({
								...f,
								image: temporalImageUrl,
								imageFile: e.target.files![0],
							}));
						}
					}}
				/>
				<div className="relative h-[68px] w-[68px] overflow-hidden rounded-full md:h-[120px] md:w-[120px]">
					<Image
						fill
						src={form.image || '/assets/user/userimage.jpeg'}
						alt="프로필 이미지"
					/>
				</div>
				<IoCameraOutlineIcon className="absolute left-0 top-[70%] rounded-full bg-h_gray_semi_dark p-1 text-4xl" />
			</div>

			<ProfileInput
				label="닉네임"
				placeholder="님네임"
				text={form.nickname}
				onChange={(t) => setForm((e) => ({ ...e, nickname: t }))}
			/>
			<label htmlFor="introTextArea" className="flex w-full flex-col gap-2">
				<span>자기소개</span>
				<AutoHeightTextArea
					id="introTextArea"
					value={form.introduce}
					onChange={(e) =>
						setForm((t) => ({ ...t, introduce: e.target.value }))
					}
					className="resize-none rounded-xl bg-h_light_black px-4 py-2 outline-0"
				/>
			</label>

			<ProfileInput
				label="인스타그램"
				placeholder="ID만 입력해요. 링크는 자동으로 생성돼요"
				text={form.instagram}
				onChange={(t) => setForm((e) => ({ ...e, instagram: t }))}
			/>

			<div className="relative w-full">
				{isLoading && (
					<div className="absolute inset-0 flex items-center justify-center bg-h_light_black bg-opacity-50">
						<div className="h-10 w-10 animate-spin rounded-full border-4 border-h_light_black border-t-white"></div>
					</div>
				)}
				<Button
					className="w-full py-3"
					onClick={() => {
						console.log('click');
					}}
				>
					저장하기
				</Button>
			</div>
		</form>
	);
}
