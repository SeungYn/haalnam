'use client';

import usePopUpStatus from '@/hooks/common/usePopUpStatus';
import { Time } from '@prisma/client';

type Props = {
	item: { start: Time; end?: Time; parseTime: string; status: string } | null;
} & ReturnType<typeof usePopUpStatus>;

export default function TimeDeletePopup({
	setIsMounting,
	setIsOpen,
	isMounting,
	isOpen,
	item,
}: Props) {
	if (!isOpen) return;
	if (item === null) return;

	return (
		<div
			className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center transition-all ${isMounting ? 'bg-slate-950/20' : 'bg-slate-950/0'}`}
		>
			<form
				onSubmit={(e) => e.preventDefault()}
				className={`w-full max-w-md overflow-hidden rounded-xl bg-gray-200 text-center delay-150 ${isMounting ? 'opacity-100' : 'opacity-0'}`}
			>
				<div className="p-6">
					<h2 className="mb-4 text-2xl font-bold text-black">
						기록된 시간이 삭제됩니다!
					</h2>
					<div className="text-xl">
						<p className="text-h_gray_semi_light">
							<span>주제: {item.status}</span>
						</p>
						<p className="text-h_gray_semi_light">
							<span>시간: {item.parseTime}</span>
						</p>
					</div>
				</div>
				<div className="relative flex border-t border-gray-400 text-black">
					<button
						className="grow py-2 text-lg font-bold transition-opacity hover:opacity-70"
						onClick={() => setIsMounting(false)}
					>
						취소
					</button>
					<div className="bg- w-[1px] items-stretch bg-gray-400"></div>
					<button className="grow py-2 text-lg text-red-500 transition-opacity hover:opacity-70">
						삭제
					</button>
				</div>
			</form>
		</div>
	);
}
