const webpack = require('webpack')

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

    return defaultConfig
}
