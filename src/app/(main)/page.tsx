import { IntroLogin, ReduceTimer } from '@/components/home';
import YesterdayAnalyzePopupContainer from '@/container/analyze/YesterdayAnalyzePopupContainer';
import { auth } from '@/lib/auth';

export default async function Home() {
	const session = await auth();
	const user = session?.user;

	return (
		<div className="flex h-full w-full flex-col items-center">
			<h1 className={`mt-8 text-center text-5xl font-bold text-neutral-100`}>
				하루를 <strong className="text-red-300">어떻게</strong> <br />{' '}
				사용하셨나요?
			</h1>
			<ReduceTimer />
			{!user && <IntroLogin />}
			{user && (
				<h2 className="mt-4 text-4xl text-white">{`안녕하세요! ${user.name}님!`}</h2>
			)}
			{user && <YesterdayAnalyzePopupContainer />}
		</div>
	);
}
