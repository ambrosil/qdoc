const path = require('path')

const nextConfig = {
	// webpack: (config, options) => {
	// 	config.externals.push('nodeExternals()')
	//
	// 	config.resolve.extensions.push('.br')
	// 	config.module.rules.push({
	// 		test: /\.br$/i,
	// 		type: 'asset/source'
	// 	})
	//
	// 	return config
	// },

	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	},

	reactStrictMode: true,
	distDir: '.next',
	output: 'export'

	// reactStrictMode: true,
	// output: "standalone",
	// experimental: {
	//     outputFileTracingRoot: path.join(__dirname, "../../"),
	//     transpilePackages: ["ui"]
	// }
}

module.exports = nextConfig
