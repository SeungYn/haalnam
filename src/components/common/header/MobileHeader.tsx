type Props = {
	title: string;
};

export default function MobileHeader({ title }: Props) {
	return (
		<header className="sticky top-0 z-30 mb-4 block border-b border-h_light_black bg-h_black py-4 text-5xl md:hidden">
			{title}
		</header>
	);
}
