import Image from 'next/image';

export default function AlarmGuidePage() {
	return (
		<>
			<header className="sticky top-0 z-50 w-full bg-h_black py-2">
				<div className="mx-auto max-w-7xl px-4">
					<Image
						width={140}
						height={50}
						src="/logo/haalnam-logo.png"
						alt="로고 이미지"
					/>
				</div>
			</header>
			<section className="mx-auto my-10 w-full max-w-7xl">
				<section className="rounded-lg bg-h_light_black p-4">
					<h1 className="text-3xl font-bold">Chrome 앱 PC 설치 방법 </h1>
					<hr />
				</section>
				<section className="bg-h_light_black">
					<h1>Chrome 앱 안드로이드 설치 방법 </h1>
					<hr />
				</section>
				<section className="bg-h_light_black">
					<h1>Chrome 앱 IOS 설치 방법 </h1>
					<hr />
				</section>
				<section className="bg-h_light_black">
					<h1>Safari 앱 PC 설치 방법 </h1>
					<hr />
				</section>
				<section className="bg-h_light_black">
					<h1>Safari 앱 IOS 설치 방법 </h1>
					<hr />
				</section>
			</section>
		</>
	);
}
