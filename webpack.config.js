const path = require('path');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './main.ts',
  context: path.resolve(__dirname, './src'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@act': path.resolve(__dirname, 'src/act/'),
      '@behavior': path.resolve(__dirname, 'src/behavior/'),
      '@roles': path.resolve(__dirname, 'src/creeps/role'),
      '@state': path.resolve(__dirname, 'src/state/')
    }
  },
  output: {
    path: __dirname,
    filename: 'main.js',
    libraryTarget: 'commonjs2'
  },
  watch: true
};
