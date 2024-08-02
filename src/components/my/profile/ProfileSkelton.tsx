import { Button } from '@/components/common';
import { IoLogoInstagramIcon } from '@/components/icons';

export default function ProfileSkelton() {
	return (
		<section className="animate-pulse pt-8">
			<div className="mb-6 flex gap-4">
				<div className="relative h-[68px] w-[68px] overflow-hidden rounded-full bg-h_light_black md:h-[120px] md:w-[120px]"></div>
				<div className="flex grow flex-col justify-center gap-4">
					<p className="h-8 w-1/2 bg-h_light_black text-4xl">{` `} </p>
					<ul className="flex gap-8 text-2xl">
						<li>총 사용시간</li>
						<li>오늘 사용시간</li>
					</ul>
				</div>
			</div>
			<div className="mb-8 flex flex-col gap-2">
				<p className="2xl h-6 w-1/2 bg-h_light_black"></p>
				<div className="flex items-center gap-2">
					<IoLogoInstagramIcon />
					<p className="2xl h-6 w-1/2 bg-h_light_black"></p>
				</div>
			</div>

			<Button className="mx-auto w-3/4 py-3 md:py-2 md:text-xl">
				프로필 편집
			</Button>
		</section>
	);
}
