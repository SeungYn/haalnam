export default function TimeTableSkeleton() {
	return (
		<div className="mt-20 grid w-full animate-pulse grid-cols-[15%_55%_20%_10%] grid-rows-[minmax(3rem,_auto)] rounded-2xl bg-h_gray_semi_dark text-center text-2xl [&>span]:flex [&>span]:items-center [&>span]:justify-center">
			<span>주제</span>
			<span>기간</span>
			<span>사용시간(원)</span>
			<span>상태</span>
		</div>
	);
}
