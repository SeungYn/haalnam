import Image from 'next/image';
import Link from 'next/link';

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
				<section className="mb-10 rounded-lg bg-h_light_black p-4">
					<Link
						href={
							'https://support.google.com/chrome/answer/3220216?hl=ko&co=GENIE.Platform%3DDesktop&oco=1'
						}
						className="text-3xl font-bold"
						target="_blank"
					>
						Chrome 앱 PC 알림 설정 방법 바로가기
					</Link>
					<hr className="mb-8" />
					<Image
						src={'/event/pwa/chrome-alarm-pc.png'}
						alt="Picture of the author"
						sizes="(min-width: 600px) 30vw, 100vw"
						style={{
							width: '100%',
							height: 'auto',
							aspectRatio: '1/1.7',
						}}
						width={300}
						height={450}
					/>
				</section>
				<section className="mb-10 rounded-lg bg-h_light_black p-4">
					<Link
						href={
							'https://support.google.com/chrome/answer/3220216?hl=ko&co=GENIE.Platform%3DAndroid&oco=1'
						}
						target="_blank"
						className="text-3xl font-bold"
					>
						Chrome 앱 안드로이드 알림 설정 방법 바로가기
					</Link>
					<hr className="mb-8" />
					<Image
						src={'/event/pwa/chrome-alarm-and.png'}
						alt="Picture of the author"
						sizes="(min-width: 600px) 30vw, 100vw"
						style={{
							width: '100%',
							height: 'auto',
							aspectRatio: '1/1.7',
						}}
						width={300}
						height={450}
					/>
				</section>
				<section className="mb-10 rounded-lg bg-h_light_black p-4">
					<Link
						href={
							'https://support.google.com/chrome/answer/3220216?hl=ko&co=GENIE.Platform%3DiOS&oco=1'
						}
						target="_blank"
						className="text-3xl font-bold"
					>
						Chrome 앱 IOS 알림 설정 방법 바로가기
					</Link>
					<hr className="mb-8" />
					<Image
						src={'/event/pwa/chrome-alarm-ios.png'}
						alt="Picture of the author"
						sizes="(min-width: 600px) 30vw, 100vw"
						style={{
							width: '100%',
							height: 'auto',
							aspectRatio: '1/1.7',
						}}
						width={300}
						height={450}
					/>
				</section>
				<section className="mb-10 rounded-lg bg-h_light_black p-4">
					<Link
						href={'https://support.apple.com/ko-kr/guide/safari/sfri40734/mac'}
						className="text-3xl font-bold"
						target="_blank"
					>
						Safari 앱 PC 알림 설정 방법 바로가기
					</Link>
					<hr />
				</section>
				<section className="mb-10 rounded-lg bg-h_light_black p-4">
					<Link
						href={'https://support.apple.com/ko-kr/guide/safari/sfri40734/mac'}
						className="text-3xl font-bold"
						target="_blank"
					>
						Safari 앱 IOS 알림 설정 방법 바로가기
					</Link>
					<hr />
				</section>
			</section>
		</>
	);
}
