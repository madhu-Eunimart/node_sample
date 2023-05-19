import TerserPlugin from 'terser-webpack-plugin';
var x={
  // ... other configuration options
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
}
export default x;