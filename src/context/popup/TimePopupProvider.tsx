'use client';

import CommonPopUpHeader from '@/components/common/header/CommonPopUpHeader';
import TimeChartAddForm from '@/components/home/time/chart/modify/TimeChartAddForm/TimeChartAddForm';
import TimePopUp from '@/components/home/time/TimePopUp/TimePopUp';
import usePopUpStatus from '@/hooks/common/usePopUpStatus';
import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
} from 'react';

interface TimePopupContext {
	isMounting: boolean;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setIsMounting: Dispatch<SetStateAction<boolean>>;
}

const initContext = {
	isMounting: false,
	isOpen: false,
	setIsOpen: () => {},
	setIsMounting: () => {},
};

const TimePopupContext = createContext<TimePopupContext>({ ...initContext });

export default function TimePopupContextProvider({
	children,
	animtionDuration = 300,
}: PropsWithChildren<{ animtionDuration?: number }>) {
	const { isMounting, isOpen, setIsOpen, setIsMounting } =
		usePopUpStatus(animtionDuration);
	return (
		<TimePopupContext.Provider
			value={{ isMounting, isOpen, setIsOpen, setIsMounting }}
		>
			<TimePopUp
				isMounting={isMounting}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				setIsMounting={setIsMounting}
			>
				<CommonPopUpHeader
					title={'시간 추가'}
					onEvent={() => setIsMounting(false)}
				/>
				<div>
					<TimeChartAddForm closePopUp={() => setIsMounting(false)} />
				</div>
			</TimePopUp>
		</TimePopupContext.Provider>
	);
}

const useTimePopupContext = () => {
	return useContext(TimePopupContext);
};
