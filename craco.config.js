module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          stream: require.resolve("stream-browserify"),
          asset: require.resolve("assert"),
          path: require.resolve("path-browserify"),
          https: require.resolve("https-browserify"),
          http: require.resolve("stream-http"),
          fs: require.resolve("brotli"),
        },
      },
    },
    node: {
      fs: 'empty'
    }
  },
};
