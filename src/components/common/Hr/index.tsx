export default function Hr({ className = '' }: { className?: string }) {
	return (
		<hr className={`my-8 h-[4px] border-none bg-h_light_black ${className}`} />
	);
}
