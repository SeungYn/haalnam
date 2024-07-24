type Props = {
	time: Date;
};

export default function DateBanner({ time }: Props) {
	return (
		<h2 className="mb-2 mt-2 text-2xl font-bold">{`${time.getFullYear()}년 ${time.getMonth() + 1}월 ${time.getDate()}일의 하루`}</h2>
	);
}
