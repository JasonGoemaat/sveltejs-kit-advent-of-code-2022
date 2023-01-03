# Advent of Code - Sveltekit

I wanted to try out Sveltekit, and I wanted some way to easily create and track
my code for the <a href="https://adventofcode.com/">Advent of Code</a>
site.  Thus this repo was born.  I started on StackBlitz, but I just couldn't get
over how bad the file tree works.   I can never tell what directory a file is
in because the file is indented more than two levels past directories.

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/sveltejs-kit-template-default-cpxiic)


## Github Pages Build

To get github pages to work, I found these links, none
of which was complete or perfect:

* https://kit.svelte.dev/docs/adapters
* https://github.com/sveltejs/kit/tree/master/packages/adapter-static#spa-mode
* https://github.com/sveltejs/kit/tree/master/packages/adapter-static#spa-mode
* https://kit.svelte.dev/docs/modules#$app-paths-base

Things I had to do:

### Alter `svelte.config.js` 

```js
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
	}
};

export default config
```

1. use `adapter-static`
2. set fallback to 'index.html'
3. clear prerender entries
4. use repo name as base for pages url

### Disable SSR

In `/src/routes/+layout.svelte`:

```js
	export const ssr = false;
```

I also had to add that to some other pages (i.e. about) which
are normally statically rendered too.  `about`
was necessary for sure because it had commands specifically to
render it ahead of time, while others without specifics are
probably handled by default layout.

In `/src/routes/+_page.js` I did this:

```js
export const prerender = false;
```

### Create `build-pages.sh` script to run from git-bash.

```bash
git commit -m "Building pages"
git checkout -B github-pages
pnpm run build
rm -rf docs
mv build docs
git add .
git commit -m "Github pages commit"
git push origin HEAD -f
git switch -
```

1. commit to current branch (bad or not needed?)
2. checkout `github-pages` branch at current commit
3. build, and rename 'build' directory to 'docs'
4. add files and commit
5. force push to github
6. switch back to previous branch with '-'

### Add '.nojekyll' file

This goes in `/static/.nojekyll` so it will be in our
/docs directory and tell github not to use it's jekyll
build tool since we have the site how we want.

### Github

In the repo settings on the left is a 'Pages' selection.  I enabled
it there and set the branch to 'github-pages' and the folder to '/docs'.  For some reason the only folders that show are docs and root.
Moving the build files to a docs directory enabled me to keep
the build directory in .gitignore, so that was nice anway.