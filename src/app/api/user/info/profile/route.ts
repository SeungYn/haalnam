import { auth } from '@/lib/auth';
import { postUserProfileById } from '@/service/server/userServerService';
import { escapeHTML } from '@/utils/security';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { Readable } from 'stream';

export async function POST(req: NextRequest) {
	const session = await auth();
	if (!session)
		return new NextResponse('Authentication Error ee', { status: 401 });

	const formData = await req.formData();
	const nickname = formData.get('nickname') as string;
	const introduce = escapeHTML(formData.get('introduce') as string);
	const instagram = formData.get('instagram') as string;
	const imageFile = formData.get('imageFile') as File | null;
	const id = formData.get('id') as string;

	// 이미지 파일 저장하고 url 만들어야함
	// 1. 파일을 저장
	let filename = '';
	if (imageFile) {
		// 버퍼 방식의 파일 저장
		// const buffer = Buffer.from(await imageFile?.arrayBuffer());
		// writeFile(
		// 	`${process.cwd()}/public/assets/user/personal/buffer.jpg`,
		// 	buffer
		// );

		const extenison = imageFile.name.split('.')[1];
		filename = `${Date.now()}.${extenison}`;
		try {
			const stream = await imageFile.stream();
			const fileStream = fs.createWriteStream(
				`${process.cwd()}/public/assets/user/personal/${filename}`
			);
			const readableStream = await webReadableStreamToNodeReadable(stream);
			readableStream.pipe(fileStream);
		} catch (err) {
			return NextResponse.json(
				{ message: '에러가 발생했습니다.' },
				{ status: 500 }
			);
		}
	}

	const imageUrl = filename === '' ? null : `/assets/user/personal/${filename}`;

	const profile = await postUserProfileById({
		id,
		image: imageUrl === '' ? null : imageUrl,
		instagram,
		introduce,
		nickname,
	});

	return NextResponse.json(profile, { status: 200 });
}

async function webReadableStreamToNodeReadable(webStream: ReadableStream) {
	const nodeStream = new Readable({
		// highWaterMark: 1024,
		read() {
			// No-op: data is pushed from the web stream
		},
	});

	const reader = webStream.getReader();

	async function push() {
		await reader
			.read()
			.then(({ done, value }) => {
				if (done) {
					nodeStream.push(null); // End of stream
					return;
				}
				nodeStream.push(value); // Push data to Node.js stream
				push();
			})
			.catch((err) => {
				nodeStream.destroy(err); // Handle error
				throw new Error('파일 저장 실패');
			});
	}

	await push(); // Start reading from the web stream
	return nodeStream;
}

function logMemoryUsage() {
	const memoryUsage = process.memoryUsage();
	console.log(`Memory Usage: 
    RSS: ${memoryUsage.rss / 1024 / 1024} MB
    Heap Total: ${memoryUsage.heapTotal / 1024 / 1024} MB
    Heap Used: ${memoryUsage.heapUsed / 1024 / 1024} MB
  `);
}

// Monitor memory usage periodically during processing
