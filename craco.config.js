// Strips import attributes (e.g. `with { type: 'json' }`) so webpack can handle
// .json imports natively. Required for @lifi/widget and other modern ESM packages.
const stripImportAttributes = () => ({
  visitor: {
    ImportDeclaration(path) {
      if (path.node.attributes?.length) path.node.attributes = [];
      if (path.node.assertions?.length) path.node.assertions = [];
    },
    ExportAllDeclaration(path) {
      if (path.node.attributes?.length) path.node.attributes = [];
      if (path.node.assertions?.length) path.node.assertions = [];
    },
    ExportNamedDeclaration(path) {
      if (path.node.attributes?.length) path.node.attributes = [];
      if (path.node.assertions?.length) path.node.assertions = [];
    },
  },
});

module.exports = {
  eslint: {
    enable: false,
  },
  babel: {
    plugins: [
      ['@babel/plugin-syntax-import-attributes', { deprecatedAssertSyntax: true }],
      stripImportAttributes,
    ],
  },
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        fallback: {
          stream: require.resolve("stream-browserify"),
          asset: require.resolve("assert"),
          path: require.resolve("path-browserify"),
          https: require.resolve("https-browserify"),
          http: require.resolve("stream-http"),
          fs: require.resolve("brotli"),
        },
      };
      return webpackConfig;
    },
    node: {
      fs: 'empty'
    }
  },
};
