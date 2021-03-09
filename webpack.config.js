const path = require(`path`);

module.exports = {
  entry: `./js/main.js`,
  output: {
    filename: `bundle.js`,
    path: __dirname,
  },
  devtool: `source-map`,
  devServer: {
    contentBase: __dirname,
    watchContentBase: true,
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              // outputPath: './img',
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
