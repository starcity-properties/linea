const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'linea.js',
    library: 'linea',
    libraryTarget: 'umd',
  },
  externals: {
    'snapsvg-cjs': {
      commonjs: 'snapsvg-cjs',
      commonjs2: 'snapsvg-cjs',
      amd: 'snapsvg-cjs',
      root: 'Snap',
    },
  },
};
