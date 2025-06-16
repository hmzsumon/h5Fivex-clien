/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	sassOptions: {
		additionalData: `$var: red;`,
	},

	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination:
					'https://h5fivex-api-f483cf4d7ab3.herokuapp.com/api/:path*',
			},
		];
	},
};

export default nextConfig;
