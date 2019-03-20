const webpack = require('webpack')
const path = require('path')

module.exports = async ({ config }) => {
    config.plugins.push(
        new webpack.DefinePlugin({
            __DEV__: true,
        })
    )

    config.devServer = {
        ...config.devServer,
        inline: true,
        hot: true,
    }

    config.module.rules.push({
        test: /\.ttf$/,
        loader: "file-loader", // or directly file-loader
        include: path.resolve(__dirname, "node_modules/react-web-vector-icons"),
    })



    return config
}
