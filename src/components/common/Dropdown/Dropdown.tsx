'use client';

import { DownArrowIcon } from '@/components/icons';
import { interFont } from '@/fonts';
import { useAddEventListenerToDocument } from '@/hooks/common';
import { useRef, useState } from 'react';

type Props<T> = {
	list: T[];
	clickedItem: T;
	setClickedItem: (id: number) => void;
	onAddPlanPage: () => void;
};

export default function Dropdown<T extends { id: number; name: string }>({
	list,
	clickedItem,
	setClickedItem,
	onAddPlanPage,
}: Props<T>) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const onDocumentClose = (e: MouseEvent) => {
		if (
			e.target !== null &&
			e.target !== dropdownRef.current &&
			!dropdownRef.current?.contains(e.target as HTMLElement)
		) {
			setIsOpen(false);
			return;
		}
	};

	useAddEventListenerToDocument('click', onDocumentClose);
	return (
		<div
			ref={dropdownRef}
			className={`relative inline-block w-48 ${interFont.className} shrink-0 select-none py-1`}
		>
			<button
				className="flex w-full flex-nowrap items-center text-2xl"
				onClick={() => {
					setIsOpen((f) => !f);
				}}
			>
				<span className="grow select-none overflow-hidden text-ellipsis whitespace-nowrap">
					{clickedItem.name}
				</span>
				<DownArrowIcon
					size="medium"
					className={`ml-2 inline ${isOpen ? 'rotate-180' : 'rotate-0'}`}
				/>
			</button>

			{isOpen && (
				<ul className="absolute left-0 top-full z-50 w-full overflow-hidden rounded-bl-xl rounded-br-xl border border-h_gray bg-h_light_black text-xl tabular-nums">
					{list.map((i) => (
						<button
							key={i.id.toString()}
							className={`block w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap px-2 py-2 tabular-nums hover:bg-h_gray_semi_light ${clickedItem.id === i.id ? 'bg-h_gray_semi_light' : ''} `}
							onClick={() => {
								setClickedItem(i.id);
								setIsOpen(false);
							}}
							tabIndex={0}
							aria-pressed={clickedItem.id === i.id} // 현재 버튼이 눌린 상태인지를 나타냄
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									setClickedItem(i.id);
									setIsOpen(false);
								}
							}}
						>
							<li>{i.name}</li>
						</button>
					))}
					<button
						className="block w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap px-2 py-2 tabular-nums hover:bg-h_gray_semi_light"
						onClick={onAddPlanPage}
					>
						<li>계획 추가하기</li>
					</button>
				</ul>
			)}
		</div>
	);
}

Dropdown.DropdownSkelton = DropdownSkelton;

function DropdownSkelton() {
	return (
		<div
			className={`relative inline-block w-48 ${interFont.className} shrink-0 select-none py-1`}
		>
			<button className="flex w-full flex-nowrap items-center text-2xl">
				<span className="grow select-none overflow-hidden text-ellipsis whitespace-nowrap">
					제목
				</span>
				<DownArrowIcon size="medium" className={`ml-2 inline`} />
			</button>
		</div>
	);
}
