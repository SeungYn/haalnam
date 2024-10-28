import { interFont } from '@/fonts';
import usePopUpStatus from '@/hooks/common/usePopUpStatus';
import { PropsWithChildren } from 'react';

type YesterAnalyzePopupType = {} & ReturnType<typeof usePopUpStatus>;

export default function YesterdayAnalyzePopup({
	isOpen,
	isMounting,
	children,
}: PropsWithChildren<YesterAnalyzePopupType>) {
	if (!isOpen) return null;
	return (
		<section
			className={`fixed inset-0 bg-h_black ${isMounting ? 'bg-h_black/50' : 'bg-h_black/0'} flex items-center justify-center`}
		>
			<div
				className={`mx-4 w-full max-w-full overflow-hidden rounded-xl bg-h_light_black text-center delay-150 md:mx-0 md:max-w-4xl ${isMounting ? 'opacity-100' : 'opacity-0'}`}
			>
				{children}
			</div>
		</section>
	);
}
