'use client';

import { useState } from 'react';

export default function ProfileIntroduce({
	introduce,
}: {
	introduce: string | null;
}) {
	const [isFold, setIsFold] = useState(false);

	return (
		<p className="max-w-md cursor-pointer" onClick={() => setIsFold((s) => !s)}>
			{displayIntroduce(introduce, isFold)}
		</p>
	);
}

function displayIntroduce(introduce: string | null, isFold: boolean) {
	if (introduce === '' || introduce === null) return '아직 자기소개가 없어요';

	if (!isFold && introduce.length <= 80) return `${introduce}`;
	if (!isFold && introduce.length > 80)
		return `${introduce.slice(0, 80)}... 더보기`;
	return `${introduce}`;
}
