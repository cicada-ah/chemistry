const { SveltePlugin } = require('@bundless/plugin-svelte')
const { less } = require('svelte-preprocess-less')

/**
 * @type { import('@bundless/cli').Config }
 */
module.exports = {
    plugins: [SveltePlugin({
        preprocess: [{
            style: less()
        }]
    })],
}
