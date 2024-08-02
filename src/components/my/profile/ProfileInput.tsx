type Props = {
	label: string;
	placeholder: string;
	text: string;
	onChange: (t: string) => void;
};

export default function ProfileInput({
	label,
	placeholder,
	text,
	onChange,
}: Props) {
	return (
		<label className="flex w-full flex-col gap-2">
			<span>{label}</span>
			<input
				type="text"
				className="rounded-xl bg-h_light_black px-4 py-2"
				value={text}
				placeholder={placeholder}
				onChange={(e) => onChange(e.target.value)}
			/>
		</label>
	);
}
