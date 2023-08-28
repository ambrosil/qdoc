const path = require('path')

const nextConfig = {
	webpack: (config, options) => {
		config.resolve.extensions.push('.br')

		console.log(config.module.rules)

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
