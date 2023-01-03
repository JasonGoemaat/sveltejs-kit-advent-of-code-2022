import adapter from '@sveltejs/adapter-static';
const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
    adapter: adapter({
      fallback: 'index.html'
    }),
    prerender: { entries: [] },

		paths: {
			base: dev ? '' : '/sveltejs-kit-advent-of-code-2022',
		},

		// If you are not using a .nojekyll file, change your appDir to something not starting with an underscore.
		// For example, instead of '_app', use 'app_', 'internal', etc.
		// appDir: 'internal',
	}
};

console.log('++++++++++++++++++++++++++++++++++++++ paths.base ++++++++++++++++++++++++++++++++++++++')
console.log(config.kit.paths.base)

export default config