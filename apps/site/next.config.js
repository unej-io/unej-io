// @ts-check

const TerserPlugin = require("terser-webpack-plugin");

const itemFn = (item) => item;
const moduleToFilename = (module) => module.identifier().split("/").reduceRight(itemFn);

const createTest = (filename) => (regexp) => new RegExp(regexp).test(filename);
const createBase =
  (name) =>
  (...ps) =>
    [name].concat(ps).join(".");

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["@unej-io/ui"],

  typescript: {
    ignoreBuildErrors: process.env.NO_TS === "true",
  },

  webpack: (config) => {
    if (process.env.UNMINIFY === "true") {
      config.optimization.minimize = false;
    }

    config.optimization.minimizer = [
      ...(Array.isArray(config.optimization.minimizer) ? config.optimization.minimizer : []),
      new TerserPlugin({ terserOptions: { format: { comments: false } }, extractComments: false }),
    ];

    const enable = false;
    if (enable) {
      config.optimization.splitChunks.cacheGroups[`io-react`] = {
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        name: "react",
        chunks: "all",
      };

      config.optimization.splitChunks.cacheGroups[`io-ui`] = {
        test: /[\\/]node_modules[\\/](@emotion|@mantine)[\\/]/,
        name(module) {
          const filename = moduleToFilename(module);
          const test = createTest(filename);

          const base = createBase("ui");
          if (test(/[\\/]@mantine[\\/]carousel[\\/]/)) return base("carousel");
          if (test(/[\\/]@mantine[\\/]dates[\\/]/)) return base("dates");
          if (test(/[\\/]@mantine[\\/]dropzone[\\/]/)) return base("dropzone");
          if (test(/[\\/]@mantine[\\/]form[\\/]/)) return base("form");
          if (test(/[\\/]@mantine[\\/]modals[\\/]/)) return base("modals");
          if (test(/[\\/]@mantine[\\/]notifications[\\/]/)) return base("notifications");
          if (test(/[\\/]@mantine[\\/]prism[\\/]/)) return base("prism");
          if (test(/[\\/]@mantine[\\/]spotlight[\\/]/)) return base("spotlight");
          if (test(/[\\/]@mantine[\\/]tiptap[\\/]/)) return base("tiptap");
          return base();
        },
        chunks: "all",
      };
    }

    return config;
  },
};

module.exports = nextConfig;
