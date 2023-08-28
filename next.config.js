const path = require('path')

const nextConfig = {
	output: 'standalone',

	webpack: (config, options) => {
		config.resolve.extensions.push('.br')
		config.module.rules.push({
			test: /\.br$/i,
			type: 'asset/source'
		})

		return config
	},

	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	}

	// reactStrictMode: true,
	// distDir: 'dist',
	// output: 'export'

	// reactStrictMode: true,
	// output: "standalone",
	// experimental: {
	//     outputFileTracingRoot: path.join(__dirname, "../../"),
	//     transpilePackages: ["ui"]
	// }
}

module.exports = nextConfig
