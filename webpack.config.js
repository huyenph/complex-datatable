module.exports = {
  module: {
    rules: [
      {
        test: /\.ts|\.tsx$/,
        use: 'awesome-typescript-loader',
        include: __dirname,
      },
    ],
  },
};
