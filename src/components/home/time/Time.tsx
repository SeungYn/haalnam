type Prop = {
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
};

export function Time({ hours, minutes, seconds, milliseconds }: Prop) {
	return (
		<h2 className="flex flex-col items-center justify-center text-center text-5xl text-neutral-200 sm:flex-row md:gap-2 md:text-6xl">
			<span>현재 </span>
			<div className="flex text-red-300 md:gap-2">
				<p className="w-16" suppressHydrationWarning>
					{hours}
				</p>
				<span>시간</span>
				<p className="w-16" suppressHydrationWarning>
					{minutes}
				</p>
				<span>분</span>
				<p className="w-16" suppressHydrationWarning>
					{seconds}
				</p>
				<span>초</span>
				<p className="w-20" suppressHydrationWarning>
					{milliseconds}
				</p>
			</div>
			<span>남았습니다</span>
		</h2>
	);
}
