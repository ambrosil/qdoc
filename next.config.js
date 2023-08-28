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
	}
}

module.exports = nextConfig
