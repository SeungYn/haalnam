import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { NextAuthConfig } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import KakaoProvider from 'next-auth/providers/kakao';
import dbClient from './db';
import { findUserById } from '@/repository/userRepository';
import { generateNickname } from './user';
import client from './db';

export const nextOptions: NextAuthConfig = {
	pages: { error: '/error' },
	// 타입 Adapter를 명시해 줘야함
	adapter: PrismaAdapter(client) as Adapter,
	providers: [
		KakaoProvider({
			clientId: process.env.KAKAO_ID || ``,
			clientSecret: process.env.KAKAO_SECRET || ``,
		}),
	],
	events: {
		async linkAccount({ user }) {
			await dbClient.$transaction(async (tx) => {
				const planPage = await tx.planPage.create({
					data: {
						name: '기본 페이지',
						userId: user.id!,
					},
				});

				await tx.user.update({
					where: { id: user.id },
					data: {
						nickname: generateNickname(),
						default_main_plan_page_id: planPage.id,
					},
				});
			});
		},
	},
	callbacks: {
		async signIn(context) {
			// signIn이 session보다 먼저 호출 됨
			//console.log(context, 'context signin', context.user.id);
			//console.log('signin', context);

			return true;
		},
		async session({ session, token, user: test }) {
			// Send properties to the client, like an access_token and user id from a provider.
			const user = session?.user;
			const existingUser = await findUserById(user.id);
			//console.log(existingUser?.id, session);
			if (!existingUser) return session;

			if (user) {
				session.user = {
					...user,
					id: token.sub!,
				};
			}
			if (existingUser) {
				session.user = {
					...session.user,
					nickname: existingUser.nickname,
					defaultMainPlanPageId: existingUser.default_main_plan_page_id!,
					is_webpush_privilege: existingUser.is_webpush_privilege,
				};
			}

			return session;
		},
		async jwt(context) {
			//console.log('jwt', context);
			//console.log(context, 'console.log context');
			//console.log(context.user, 'context user');
			//console.log(context, 'token');
			return context.token;
		},
	},
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
	trustHost: true,

	// InvalidCheck: PKCE code_verifier cookie was missing 에러 제거를 위한 옵션
	//cookies: {
	// csrfToken: {
	// 	name: 'next-auth.csrf-token',
	// 	options: {
	// 		httpOnly: true,
	// 		sameSite: 'none',
	// 		path: '/',
	// 		secure: true,
	// 	},
	// },
	// 로컬 호스트에서 pkce를 지정하면 사파리에서 에러가 발생함
	// pkceCodeVerifier: {
	// 	name: 'next-auth.pkce.code_verifier',
	// 	options: {
	// 		httpOnly: true,
	// 		sameSite: 'none',
	// 		path: '/',
	// 		secure: true,
	// 	},
	// },
	//},
	...cookiesConfig(),
};

function cookiesConfig(): Pick<NextAuthConfig, 'cookies'> {
	if (process.env.NODE_ENV !== 'development')
		return {
			cookies: {
				pkceCodeVerifier: {
					name: 'next-auth.pkce.code_verifier',
					options: {
						httpOnly: true,
						sameSite: 'none',
						path: '/',
						secure: true,
					},
				},
			},
		};
	return { cookies: {} };
}

const handler = NextAuth(nextOptions);

export const {
	handlers: { GET, POST },
	auth,
} = handler;
