'use client';

import YesterdayAnalyzePopup from '@/components/analyze/YesterdayAnalyzePopup';
import { Button } from '@/components/common';
import usePopUpStatus from '@/hooks/common/usePopUpStatus';

import YesterdayAnalyzeContainer, {
	YesterdayAnalyzeSuspense,
} from './YesterdayAnalyzeContainer';

export default function YesterdayAnalyzePopupContainer() {
	const { isMounting, isOpen, setIsMounting, setIsOpen } = usePopUpStatus();
	return (
		<>
			<Button size="medium" className="mt-10" onClick={() => setIsOpen(true)}>
				어제 시간표 분석하기
			</Button>

			<YesterdayAnalyzePopup
				isMounting={isMounting}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				setIsMounting={setIsMounting}
			>
				<YesterdayAnalyzeContainer>
					<YesterdayAnalyzeSuspense setIsMounting={setIsMounting} />
				</YesterdayAnalyzeContainer>
			</YesterdayAnalyzePopup>
		</>
	);
}
