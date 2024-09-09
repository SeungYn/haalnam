/* eslint-disable */
'use client';

import Dropdown from '@/components/common/Dropdown/Dropdown';

import {
	IoEllipsisHorizontalSharpIcon,
	IoPencilOutlineIcon,
	IoStarOutlineIcon,
	IoTrashIcon,
} from '@/components/icons';
import { useDialogContext } from '@/context/DialogContext';
import {
	useDeletePlanPage,
	useGetPlanPagesWithSuspense,
	useGetPlanPageWithSuspense,
	usePatchDefaultPlanPage,
	usePatchModifyPlanPage,
	usePostCreatePlanPage,
} from '@/hooks/api/plan';
import { useAddEventListenerToDocument } from '@/hooks/common';
import { useSelectedPlanStore } from '@/store/SelectPlanStore';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

export default function PlanTimeHeader() {
	const { selectedPlan, setSelectedPlan, selectedPlanId, setSelectedPlanId } =
		useSelectedPlanStore();
	const { initDialog, reset } = useDialogContext();
	const { data, update } = useSession();

	const pageTitleRef = useRef<HTMLInputElement>(null);

	// 현재 수정모드 상태
	const [isTitleModify, setIsTitleModify] = useState(false);
	// 옵션 open 상태
	const [isTitleOptionOpen, setIsTitleOptionOpen] = useState(false);
	const titleOptionRef = useRef<HTMLUListElement>(null);
	const pageOptionRef = useRef<HTMLDivElement>(null);
	const [title, setTitle] = useState('');

	const { data: planPages = [] } = useGetPlanPagesWithSuspense();
	const { data: planPage } = useGetPlanPageWithSuspense(
		selectedPlanId || data!.user.defaultMainPlanPageId
	);

	const { mutate: mutatePlanPage } = usePostCreatePlanPage();
	const { mutate: mutateDefaultPlanPage } = usePatchDefaultPlanPage(
		(id: number) => {
			setSelectedPlanId(id);
			update();
		}
	);
	const { mutate: mudateDeletePlanPage } = useDeletePlanPage();
	const { mutate: mutatePlanPageTitle } = usePatchModifyPlanPage(() => {
		setIsTitleModify(false);
	});

	const currentItem = selectedPlanId
		? planPages.find((i) => i.id === selectedPlanId)!
		: planPages.find((i) => i.id === data?.user.defaultMainPlanPageId)!;
	const isDefaultPlanPage = selectedPlanId
		? data?.user.defaultMainPlanPageId === selectedPlanId
		: data?.user.defaultMainPlanPageId === currentItem.id;

	const onAddPlanPage = () => {
		//if (!pageTitleRef.current) return;

		initDialog({
			title: '계획 페이지 제목을 입력해주세요!',
			body: (
				<input
					type="text"
					ref={pageTitleRef}
					className="px-2 text-2xl"
					placeholder="주말 계획"
					maxLength={30}
				/>
			),
			actionType: 'CONFIRM_CANCEL',
			cancel: () => {
				reset();
			},
			confirm: () => {
				if (pageTitleRef.current!.value === '') {
					alert('제목을 입력해주세요');
					return;
				}

				mutatePlanPage(pageTitleRef.current!.value);
				reset();
			},
		});
	};

	const onDeletePlanPage = () => {
		if (
			selectedPlanId === null ||
			selectedPlanId === data?.user.defaultMainPlanPageId
		) {
			toast.error('메인 페이지는 삭제 할 수 없습니다.');
			setIsTitleOptionOpen(false);
			return;
		}
		if (planPages!.length === 1) {
			initDialog({
				title: (
					<p className="text-red-500">
						남은 페이지가 1개면 삭제할 수 없습니다.
					</p>
				),
				body: null,
				actionType: 'CONFIRM',
				cancel: () => {
					reset();
				},
				confirm: () => {
					reset();
				},
			});
			return;
		}

		initDialog({
			title: '정말로 현재 페이지를 삭제하시겠습니까?',
			body: null,
			actionType: 'CONFIRM_CANCEL',
			cancel: () => {
				reset();
			},
			confirm: () => {
				mudateDeletePlanPage(selectedPlanId!);
				reset();
			},
		});

		setIsTitleOptionOpen(false);
	};

	const onModifyPageTitle = () => {
		if (title === '') {
			alert('제목을 입력해주세요');
			return;
		}

		mutatePlanPageTitle({
			planPageId: selectedPlanId || data!.user.defaultMainPlanPageId,
			name: title,
		});
	};

	useAddEventListenerToDocument('click', (e: MouseEvent) => {
		if (
			e.target !== null &&
			e.target !== pageOptionRef.current &&
			!pageOptionRef.current?.contains(e.target as HTMLElement)
		) {
			setIsTitleOptionOpen(false);
			return;
		}
	});

	return (
		<header className="flex w-full select-none items-center py-2">
			<Dropdown
				// @ts-ignore
				list={planPages!}
				clickedItem={planPage!}
				setClickedItem={setSelectedPlanId}
				onAddPlanPage={onAddPlanPage}
			/>
			<div className="relative shrink grow text-center text-4xl">
				{isTitleModify ? (
					<form
						className="flex items-center gap-4 px-2"
						onSubmit={(e) => e.preventDefault()}
					>
						<input
							type="text"
							className="shrink grow overflow-hidden text-ellipsis rounded-lg text-center text-black"
							size={1}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<button
							onClick={() => {
								onModifyPageTitle();
								setIsTitleModify(false);
							}}
						>
							<IoPencilOutlineIcon className="text-2xl" />
						</button>
					</form>
				) : (
					<div className="flex items-center gap-4 px-2">
						{isDefaultPlanPage && (
							<span>
								<IoStarOutlineIcon className="text-2xl" />
							</span>
						)}
						<h2 className="grow overflow-hidden text-ellipsis">
							{currentItem.name}
						</h2>

						<div ref={pageOptionRef} className="relative flex items-center">
							<button
								onClick={() => setIsTitleOptionOpen(true)}
								className="border-none"
							>
								<IoEllipsisHorizontalSharpIcon
									size="medium"
									title="옵션 버튼"
								/>
							</button>
							{isTitleOptionOpen && (
								<ul
									ref={titleOptionRef}
									className="absolute right-0 top-full z-50 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-h_gray bg-h_light_black text-2xl"
								>
									{!isDefaultPlanPage && (
										<li
											role="button"
											className="flex flex-nowrap items-center gap-4 whitespace-nowrap px-4 py-2 hover:bg-h_gray_semi_light"
											onClick={() => {
												mutateDefaultPlanPage({ planPageId: selectedPlanId! });
												setIsTitleOptionOpen(true);
											}}
										>
											<IoStarOutlineIcon className="text-2xl" />
											<p>메인 페이지로 지정하기</p>
										</li>
									)}
									<li
										role="button"
										className="flex w-full flex-nowrap items-center gap-4 whitespace-nowrap px-4 py-2 hover:bg-h_gray_semi_light"
										onClick={() => {
											setIsTitleModify(true);
											setIsTitleOptionOpen(false);
										}}
									>
										<IoPencilOutlineIcon className="text-2xl" />
										<p>수정하기</p>
									</li>
									<li
										role="button"
										className="flex w-full items-center gap-4 px-4 py-2 hover:bg-h_gray_semi_light"
										onClick={() => {
											onDeletePlanPage();
										}}
									>
										<IoTrashIcon className="text-2xl" />
										<p>삭제하기</p>
									</li>
								</ul>
							)}
						</div>
					</div>
				)}
			</div>
		</header>
	);
}

export function PlanTimeHeaderSkelton() {
	return (
		<header className="flex w-full animate-pulse select-none items-center py-2">
			<Dropdown.DropdownSkelton />
			<div className="relative shrink grow text-center text-4xl">
				<div className="flex items-center gap-4 px-2">
					<h2 className="grow overflow-hidden text-ellipsis">계획표</h2>
					<div className="relative flex items-center">
						<button className="border-none">
							<IoEllipsisHorizontalSharpIcon size="medium" title="옵션 버튼" />
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}

PlanTimeHeader.PlanTimeHeaderSkelton = PlanTimeHeaderSkelton;
