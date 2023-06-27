const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts|\.tsx$/,
        use: 'babel-loader',
        include: __dirname,
      },
    ],
  },
};
