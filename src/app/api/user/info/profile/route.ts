import { auth } from '@/lib/auth';
import {
	checkUser,
	postUserProfileById,
} from '@/service/server/userServerService';
import { escapeHTML } from '@/utils/security';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { Readable } from 'stream';
import sharp from 'sharp';
import os from 'os';
import { whereHost } from '@/utils/util';

export async function POST(req: NextRequest) {
	const session = await auth();
	let user;
	try {
		user = await checkUser(session?.user?.id, session);
	} catch {
		return NextResponse.json(
			{ message: '유저 정보가 올바르지 않습니다.' },
			{ status: 401 }
		);
	}

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
		filename = `${Date.now()}`;
		try {
			// const stream = await imageFile.stream();
			// const fileStream = fs.createWriteStream(`~/image/user/${filename}`);
			// const readableStream = await webReadableStreamToNodeReadable(stream);
			// readableStream.pipe(fileStream);

			await sharp(await imageFile.arrayBuffer())
				.jpeg({ quality: 80 })
				.toFile(`${os.homedir()}/image/user/${filename}.jpeg`);
		} catch (err) {
			console.log(err);
			return NextResponse.json(
				{ message: '에러가 발생했습니다.' },
				{ status: 500 }
			);
		}
	}

	const imageUrl =
		filename === ''
			? null
			: `${whereHost()}/api/user/info/profile?name=${filename}`;

	const profile = await postUserProfileById({
		id,
		image: imageUrl === '' ? null : imageUrl,
		instagram,
		introduce,
		nickname,
	});

	return NextResponse.json(profile, { status: 200 });
}

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const imageName = searchParams.get('name');

	try {
		const imageFile = fs.readFileSync(
			`${os.homedir()}/image/user/${imageName}.jpeg`
		);

		return new Response(imageFile, {
			status: 200,
			headers: {
				'Content-Type': 'image/jpeg',
			},
		});
	} catch (e) {
		return NextResponse.json({ message: 'Image not found' }, { status: 404 });
	}
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
