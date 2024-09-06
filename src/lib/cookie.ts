type CookieOption = {
	[key: string]: any;
	samesite?: 'strict' | 'lax' | 'None';
	secure?: 'secure';
	expires?: number | string | Date;
	'max-age'?: number; // 초단위
	domain?: string;
	path?: string;
};

export default class Cookie {
	static getCookie(name: string) {
		let matches = document.cookie.match(
			new RegExp(
				'(?:^|; )' +
					name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
					'=([^;]*)'
			)
		);
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	static setCookie(name: string, value: string, options: CookieOption = {}) {
		options = {
			path: '/',
			// 필요한 경우, 옵션 기본값을 설정할 수도 있습니다.
			...options,
		};

		if (options.expires instanceof Date) {
			options.expires = options.expires.toUTCString();
		}

		let updatedCookie =
			encodeURIComponent(name) + '=' + encodeURIComponent(value);

		for (let optionKey in options) {
			updatedCookie += '; ' + optionKey;
			let optionValue = options[optionKey];
			if (optionValue !== true) {
				updatedCookie += '=' + optionValue;
			}
		}

		document.cookie = updatedCookie;
	}

	static deleteCookie(name: string) {
		Cookie.setCookie(name, '', {
			'max-age': -1,
		});
	}
}
