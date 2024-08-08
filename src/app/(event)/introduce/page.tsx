'use client';

import FlowingTIme from '@/components/event/introduce/FlowingTIme';
import RandomCounter from '@/components/event/introduce/RandomCounter';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';

export default function IntroducePage() {
	const [paragraph1, setParagraph1] = useState(false);
	const [paragraph2, setParagraph2] = useState(false);
	const [paragraph3, setParagraph3] = useState(false);
	const [paragraph4, setParagraph4] = useState(false);

	useEffect(() => {
		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					const { intersectionRatio } = entries[0];
					if (intersectionRatio >= 0.49 && intersectionRatio < 0.55) {
						setParagraph1(true);
					} else if (intersectionRatio >= 0.59 && intersectionRatio < 0.65) {
						setParagraph2(true);
					} else if (intersectionRatio >= 0.69 && intersectionRatio < 0.75) {
						setParagraph3(true);
					} else if (intersectionRatio >= 0.75 && intersectionRatio < 0.82) {
						setParagraph4(true);
					} else {
						setParagraph1(true);
						setParagraph2(true);
						setParagraph3(true);
						setParagraph4(true);
					}
				}
			},
			{ threshold: [0.5, 0.6, 0.7, 0.75] }
		);

		intersectionObserver.observe(document.querySelector('#description')!);

		return () => {
			intersectionObserver.disconnect();
		};
	}, []);

	return (
		<div className="relative overflow-x-hidden">
			<header className="fixed z-10 w-full bg-h_black py-2">
				<div className="mx-auto max-w-7xl px-4">
					<Image
						width={140}
						height={50}
						src="/logo/haalnam-logo.png"
						alt="로고 이미지"
					/>
				</div>
			</header>
			<section className="relative flex h-screen flex-col justify-center">
				<div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col-reverse items-center justify-start px-4 md:flex-row">
					<div className="z-20 self-start md:self-center">
						<h1 className="mb-4 text-6xl font-bold">
							하<span className="text-base text-h_gray">루가</span>얼
							<span className="text-base text-h_gray">마나</span>남
							<span className="text-base text-h_gray">았는가</span>
						</h1>
						<h2 className="text-4xl font-bold">
							하루를 더 가치있게, 시간을 더 현명하게
						</h2>
						<p className="mb-4 text-h_gray_semi_light">
							효율적인 시간관리 타이머로 빈 곳을 채워보세요
						</p>
						<Link
							href={'/'}
							className="inline-block rounded-lg border border-white px-4 py-2 text-3xl font-bold"
						>
							시작하기
						</Link>
					</div>
					<div className="absolute bottom-20 right-4 md:relative md:bottom-0 md:left-0 md:top-0 md:flex md:grow md:justify-center">
						<div className="main_picture z-0 aspect-[1/1.2] w-[200px] sm:w-[300px] md:relative md:w-[400px] lg:w-[600px]">
							<Image
								src="/event/introduce/main-picture.png"
								className="z-0"
								fill
								alt="이미지"
							/>
						</div>
					</div>
				</div>

				<MdKeyboardDoubleArrowDown
					size={50}
					color="white"
					className="down_arrow"
				/>
			</section>
			<section
				id="description"
				className="relative flex min-h-screen flex-col py-20 pt-40"
			>
				<div className="mx-auto w-full max-w-7xl px-4">
					<div className="text-center">
						<p className="my-20 text-6xl font-bold">
							하루를 어떻게 사용하셨나요?
						</p>
						<div
							className={`${paragraph1 ? 'paragraph-in' : 'paragraph-out'} mb-2 text-4xl transition-all duration-300 ease-linear`}
						>
							만약 1초가 1원이라면, 하루는{' '}
							{paragraph1 && (
								<div className="inline-block">
									<RandomCounter targetNumber={8} delay={5000} />
									<RandomCounter targetNumber={6} delay={5200} />
									<RandomCounter targetNumber={4} delay={5400} />
									<RandomCounter targetNumber={0} delay={5600} />
									<RandomCounter targetNumber={0} delay={5800} />
								</div>
							)}
							원이 지급됩니다.
						</div>
						<p
							className={`${paragraph2 ? 'paragraph-in' : 'paragraph-out'} mb-20 text-4xl transition-all duration-300 ease-linear`}
						>
							지금도 페이지에 접속한지 <FlowingTIme />
							초가 지나가고 있죠.
						</p>
						<p
							className={`${paragraph3 ? 'paragraph-in' : 'paragraph-out'} mb-20 text-3xl transition-all duration-300 ease-linear`}
						>
							이렇게 지나가는 시간을 확인하며, 하루의 빈 곳을 채워보는건
							어떨까요?
						</p>

						<div
							className={`sample_mockup_container ${paragraph4 ? 'sample_mockup_container-fade_in' : 'sample_mockup_container-fade_out'}`}
						>
							<p className="mb-10 text-2xl">
								시간을 기록하는 하얼남과 함께, <br /> 매일매일 더 나은 하루를
								만들어 보세요.
							</p>

							<div className="sample_mockup">
								<Image
									alt="아이패드 이미지"
									width={340}
									height={500}
									className={`sample_mockup_ipad ${paragraph4 ? 'sample_mockup_ipad-fade_in' : ''}`}
									src={'/event/introduce/ipad-sample.png'}
								/>
								<Image
									alt="아이패드 이미지"
									width={600}
									height={500}
									className={`sample_mockup_mac ${paragraph4 ? 'sample_mockup_mac-fade_in' : ''}`}
									src={'/event/introduce/mac-sample.png'}
								/>
								<Image
									alt="아이패드 이미지"
									width={200}
									height={500}
									className={`sample_mockup_iphone ${paragraph4 ? 'sample_mockup_iphone-fade_in' : ''}`}
									src={'/event/introduce/iphone-sample.png'}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* 기능 소개 색션 */}
			<section className="py-20">
				<div className="mx-auto w-full max-w-7xl px-4">
					<ul className="feature">
						<li>
							<h3>깔끔한 시간표 확인</h3>
							<p>사용한 시간을 한눈에 확인해보세요!</p>
						</li>
						<li>
							<Image
								width={400}
								height={300}
								src={'/event/introduce/feature1.png'}
								className="rounded-2xl"
								alt="이미지"
							/>
						</li>
					</ul>
					<ul className="feature">
						<li>
							<h3>지나간 날들을 확인</h3>
							<p>간편하게 지난 날들을 돌이켜봐요!</p>
						</li>
						<li>
							<Image
								width={400}
								height={400}
								src={'/event/introduce/feature2.png'}
								className="rounded-2xl"
								alt="이미지"
							/>
						</li>
					</ul>
					<ul className="feature">
						<li>
							<h3>다른 사용자 시간표 확인</h3>
							<p>사람들은 시간을 어떻게 활용하는지 확인해보세요!</p>
						</li>
						<li>
							<Image
								width={400}
								height={400}
								src={'/event/introduce/feature3.png'}
								className="rounded-2xl"
								alt="이미지"
							/>
						</li>
					</ul>

					<div className="text-center">
						<Link
							href={'/'}
							className="inline-block rounded-lg border border-white px-4 py-2 text-4xl font-bold md:text-3xl"
						>
							지금 시작하기
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
