/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'http', hostname: '**' },
			{ protocol: 'https', hostname: '**' },
		],
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},

	async headers() {
		return [
			{
				source: '/api/:path*',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: 'https://haalnam.site', // Set your origin
					},
				],
			},
			{
				source: '/api/:path*',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: 'http://haalnam.site', // Set your origin
					},
				],
			},
			{
				source: '/api/:path*',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: 'https://localhost', // Set your origin
					},
				],
			},
			{
				source: '/api/:path*',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: 'https://localhost', // Set your origin
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
