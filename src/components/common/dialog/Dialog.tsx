import { useDialogContext } from '@/context/DialogContext';
import { ButtonHTMLAttributes } from 'react';

export default function Dialog() {
	const {
		isMounting,
		isOpen,
		initDialog,
		reset,
		body,
		title,
		actionType,
		cancel,
		confirm,
	} = useDialogContext();

	if (!isOpen) return;

	return (
		<div
			className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center transition-all ${isMounting ? 'bg-slate-950/20' : 'bg-slate-950/0'}`}
		>
			<form
				onSubmit={(e) => e.preventDefault()}
				className={`w-full max-w-md overflow-hidden rounded-xl bg-gray-200 text-center delay-150 ${isMounting ? 'opacity-100' : 'opacity-0'}`}
			>
				<div className="p-6">
					<h2 className="mb-4 text-2xl font-bold text-black">{title}</h2>
					<div className="text-xl text-h_gray_semi_light">{body}</div>
				</div>
				<div className="relative flex border-t border-gray-400 text-black">
					{actionType === 'CONFIRM' ? (
						<Confirm confirm={confirm} />
					) : (
						<ConfirmCancel cancel={cancel} confirm={confirm} />
					)}
				</div>
			</form>
		</div>
	);
}

function Confirm({ confirm }: { confirm: () => void }) {
	return (
		<Button className="text-black" onClick={confirm}>
			확인
		</Button>
	);
}

function ConfirmCancel({
	confirm,
	cancel,
}: {
	confirm: () => void;
	cancel: () => void;
}) {
	return (
		<>
			<Button className="text-black" onClick={cancel}>
				취소
			</Button>
			<div className="bg- w-[1px] items-stretch bg-gray-400"></div>
			<Button className="text-main" onClick={confirm}>
				확인
			</Button>
		</>
	);
}

function Button({
	className,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={`grow py-2 text-lg transition-opacity hover:opacity-70 ${className}`}
			{...props}
		/>
	);
}
