import path from 'path'
export default {
    entry: './index.js',
    output: {
        path: path.resolve(new URL('.', import.meta.url).pathname, 'dist'),
        filename: 'bundle.js'
      },
      mode: 'development',
      optimization: {
        minimize: true
      },
      performance: {
        hints: false
      }
  };