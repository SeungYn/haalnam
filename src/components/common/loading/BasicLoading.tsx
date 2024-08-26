'use client';

import { useBasicLoadingStore } from '@/store/basicLoadingStore';

export default function BasicLoading() {
	const { loading, message } = useBasicLoadingStore();

	if (!loading) return;

	return (
		<div className="fixed left-0 top-0 z-[999999] flex h-screen w-screen items-center justify-center bg-black/70">
			<div className="flex flex-col items-center gap-4">
				<div className="h-10 w-10 animate-spin rounded-full border-4 border-h_light_black border-t-white"></div>
				<p className="text-2xl">{message}</p>
			</div>
		</div>
	);
}
