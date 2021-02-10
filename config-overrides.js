const { override, addWebpackModuleRule } = require('customize-cra')

module.exports = override(
  addWebpackModuleRule({
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader?modules=true',
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          // Provide path to the file with resources
          resources: './src/assets/styles/index.scss',
        },
      },
    ],
  })
)
