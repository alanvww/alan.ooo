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
	transpilePackages: ['sanity'],
	typescript: {
		// Set this to false if you want production builds to abort if there's type errors
		//ignoreBuildErrors: true,
	},
	eslint: {
		/// Set this to false if you want production builds to abort if there's lint errors
		//ignoreDuringBuilds: true,
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-DNS-Prefetch-Control',
						value: 'on',
					},
					{
						key: 'Strict-Transport-Security',
						value: 'max-age=63072000; includeSubDomains; preload',
					},
					{
						key: 'X-Frame-Options',
						value: 'SAMEORIGIN',
					},
					{
						key: 'Permissions-Policy',
						value:
							'camera=(), microphone=(), geolocation=(),interest-cohort=(), browsing-topics=(), attribution-reporting=()',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'origin-when-cross-origin',
					},
				],
			},
		];
	},
};

module.exports = nextConfig;