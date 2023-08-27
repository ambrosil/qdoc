const path = require("path")

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")]
    },

    reactStrictMode: true,
    output: "standalone",
    experimental: {
        outputFileTracingRoot: path.join(__dirname, "../../"),
        transpilePackages: ["ui"]
    }
}

module.exports = nextConfig
