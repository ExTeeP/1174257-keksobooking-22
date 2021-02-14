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
    open: {
      app: [`chrome`, `--incognito`],
    },
  },
};
