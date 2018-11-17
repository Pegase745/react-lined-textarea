const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');

module.exports = {
  plugins: [new TSDocgenPlugin()],
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
            },
          },
        ],
      },
    ],
  },
};
