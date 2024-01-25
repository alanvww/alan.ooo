/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
				port: '',
			},
		],
	},
	typescript: {
		// Set this to false if you want production builds to abort if there's type errors
		//ignoreBuildErrors: true,
	},
	eslint: {
		/// Set this to false if you want production builds to abort if there's lint errors
		//ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
