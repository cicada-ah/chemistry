const { SveltePlugin } = require("@bundless/plugin-svelte");
const { less } = require("svelte-preprocess-less");
const path = require("path");
const { AliasPlugin } = require("@bundless/plugin-alias");
function resolve(pathname) {
  return path.join(__dirname, pathname);
}
/**
 * @type { import('@bundless/cli').Config }
 */
module.exports = {
  loader: {
    ".png": "file",
    ".svg": "file",
  },
  build: {
    basePath: "/",
    jsTarget: "es2018", // target es version
    minify: true, // run esbuild minification
    outDir: "./dist",
  },
  plugins: [
    AliasPlugin({
      entries: { "@": resolve("./src") },
    }),
    SveltePlugin({
      preprocess: [
        {
          style: less(),
        },
      ],
    }),
  ],
};
