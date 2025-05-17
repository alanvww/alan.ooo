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
	turbopack: {
		// Example: adding an alias and custom file extension
		resolveAlias: {
			underscore: 'lodash',
		},
		resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
	},
};

module.exports = nextConfig;
