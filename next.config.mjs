/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	sassOptions: {
		additionalData: `$var: red;`,
	},
};

export default nextConfig;
