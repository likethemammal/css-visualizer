const webpack = require('webpack')
const path = require('path')

module.exports = (baseConfig, env, defaultConfig) => {
    defaultConfig.plugins.push(
        new webpack.DefinePlugin({
            __DEV__: true,
        })
    )

    defaultConfig.devServer = {
        ...defaultConfig.devServer,
        inline: true,
        hot: true,
    }

    defaultConfig.module.rules.push({
        test: /\.ttf$/,
        loader: "file-loader", // or directly file-loader
        include: path.resolve(__dirname, "node_modules/react-web-vector-icons"),
    })



    return defaultConfig
}
