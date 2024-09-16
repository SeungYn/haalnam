import Image from 'next/image';

export default function PWAInstallGuidePage() {
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
				<section id="cpc" className="mb-10 rounded-lg bg-h_light_black p-4">
					<h1 className="text-3xl font-bold">Chrome 앱 PC 설치 방법 </h1>
					<hr />
					<p className="py-6 text-2xl">
						1. 아래 스크린샷처럼 설치 아이콘을 클릭하시면 됩니다.
					</p>

					<Image
						src={'/event/pwa/chrome-pc.png'}
						alt="Picture of the author"
						sizes="100vw "
						style={{
							width: '100%',
							height: 'auto',
						}}
						width={500}
						height={300}
					/>
				</section>
				<section id="cpc" className="mb-10 rounded-lg bg-h_light_black p-4">
					<h1 className="text-3xl font-bold">
						Chrome 앱 안드로이드 설치 방법{' '}
					</h1>
					<hr />

					<p className="py-6 text-2xl">1. 점 3개를 클릭합니다.</p>

					<Image
						src={'/event/pwa/chrome-and-001.jpeg'}
						alt="Picture of the author"
						sizes="(min-width: 600px) 30vw, 100vw"
						className="max-w-full md:max-w-[50%]"
						style={{
							width: '100%',
							height: 'auto',
							aspectRatio: '1/1.7',
						}}
						width={300}
						height={450}
					/>

					<p className="py-6 text-2xl">2. 홈 화면에 추가를 클립합니다.</p>

					<Image
						src={'/event/pwa/chrome-and-002.jpeg'}
						alt="Picture of the author"
						sizes="(min-width: 600px) 30vw, 100vw"
						className="max-w-full md:max-w-[50%]"
						style={{
							width: '100%',
							height: 'auto',
							aspectRatio: '1/1.7',
						}}
						width={300}
						height={450}
					/>

					<p className="py-6 text-2xl">3. 설치합니다.</p>

					<Image
						src={'/event/pwa/chrome-and-003.jpeg'}
						alt="Picture of the author"
						sizes="(min-width: 600px) 30vw, 100vw"
						className="max-w-full md:max-w-[50%]"
						style={{
							width: '100%',
							height: 'auto',
							aspectRatio: '1/1.7',
						}}
						width={300}
						height={450}
					/>
				</section>

				<section id="cpc" className="mb-10 rounded-lg bg-h_light_black p-4">
					<h1 className="text-3xl font-bold">Chrome 앱 IOS 설치 방법 </h1>
					<hr />

					<p className="py-6 text-2xl">
						1. 공유 아이콘을 클릭하고 홈 화면에 추가를 클릭합니다.
					</p>

					<Image
						src={'/event/pwa/safari-ios-001.jpeg'}
						alt="Picture of the author"
						sizes="(min-width: 600px) 30vw, 100vw"
						className="max-w-full md:max-w-[50%]"
						style={{
							width: '100%',
							height: 'auto',
							aspectRatio: '1/1.7',
						}}
						width={300}
						height={450}
					/>

					<p className="py-6 text-2xl">2.홈 화면에 추가합니다.</p>

					<Image
						src={'/event/pwa/safari-ios-002.jpeg'}
						alt="Picture of the author"
						sizes="(min-width: 600px) 30vw, 100vw"
						className="max-w-full md:max-w-[50%]"
						style={{
							width: '100%',
							height: 'auto',
							aspectRatio: '1/1.7',
						}}
						width={300}
						height={450}
					/>
				</section>

				<section id="cpc" className="mb-10 rounded-lg bg-h_light_black p-4">
					<h1 className="text-3xl font-bold">Safari 앱 PC 설치 방법 </h1>
					<hr />

					<p className="py-6 text-2xl">
						1. 공유 아이콘을 클릭한 후, Dock에 추가합니다.
					</p>

					<Image
						src={'/event/pwa/safari-pc.png'}
						alt="Picture of the author"
						sizes="100vw"
						style={{
							width: '100%',
							height: 'auto',
						}}
						width={500}
						height={300}
					/>
				</section>

				<section id="cpc" className="mb-10 rounded-lg bg-h_light_black p-4">
					<h1 className="text-3xl font-bold">Safari 앱 IOS 설치 방법 </h1>
					<hr />

					<p className="py-6 text-2xl">
						1. 공유 아이콘을 클릭하고 홈 화면에 추가를 클릭합니다.
					</p>

					<Image
						src={'/event/pwa/safari-ios-001.jpeg'}
						alt="Picture of the author"
						sizes="(min-width: 600px) 30vw, 100vw"
						className="max-w-full md:max-w-[50%]"
						style={{
							width: '100%',
							height: 'auto',
							aspectRatio: '1/1.7',
						}}
						width={300}
						height={450}
					/>

					<p className="py-6 text-2xl">2.홈 화면에 추가합니다.</p>

					<Image
						src={'/event/pwa/safari-ios-002.jpeg'}
						alt="Picture of the author"
						sizes="(min-width: 600px) 30vw, 100vw"
						className="max-w-full md:max-w-[50%]"
						style={{
							width: '100%',
							height: 'auto',
							aspectRatio: '1/1.7',
						}}
						width={300}
						height={450}
					/>
				</section>
			</section>
		</>
	);
}
