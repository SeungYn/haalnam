'use client';

import Dialog from '@/components/common/dialog/Dialog';
import usePopUpStatus from '@/hooks/common/usePopUpStatus';
import {
	createContext,
	PropsWithChildren,
	ReactNode,
	useContext,
	useState,
} from 'react';

type Actions = 'CONFIRM' | 'CONFIRM_CANCEL';

export type DialogContextType = {
	isOpen: boolean;
	isMounting: boolean;
	reset: () => void;
	initDialog: (info: DialogStateType) => void;
} & DialogStateType;

type DialogStateType = {
	cancel: () => void;
	confirm: () => void;
	body: ReactNode | null;
	title: string | null;
	actionType: Actions;
};

const initContext: DialogContextType = {
	isOpen: false,
	isMounting: false,
	reset: () => {},
	initDialog: () => {},
	cancel: () => {},
	confirm: () => {},
	body: null,
	title: null,
	actionType: 'CONFIRM' as Actions,
};

const initState = {
	cancel: () => {},
	confirm: () => {},
	body: null,
	title: null,
	actionType: 'CONFIRM' as Actions,
};

const DialogContext = createContext<DialogContextType>({ ...initContext });

export default function DialogContextProvider({ children }: PropsWithChildren) {
	const { isMounting, isOpen, setIsMounting, setIsOpen } = usePopUpStatus();
	const [dialog, setDialog] = useState<DialogStateType>({
		...initState,
	});

	const initDialog = (info: DialogStateType) => {
		setDialog({ ...info });
		setIsOpen(true);
	};

	const reset = () => {
		setIsMounting(false);
		// 애니메이션이 적용된 후 초기화 시켜야함.
		//setTimeout(() => setDialog({ ...initState }), 150);
	};

	return (
		<DialogContext.Provider
			value={{ isMounting, isOpen, initDialog, reset, ...dialog }}
		>
			{children}
			<Dialog />
		</DialogContext.Provider>
	);
}

export function useDialogContext() {
	const context = useContext(DialogContext);
	return context;
}
