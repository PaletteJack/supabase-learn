import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { customTheme } from './cobalt.js';

/** @type {import('tailwindcss').Config}*/
const config = {
  darkMode: 'class',
  content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 2. Append the path for the Skeleton NPM package and files:
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],

  theme: {
    extend: {},
  },

  plugins: [skeleton({
	themes: {
		preset: [ "modern", "vintage"],
		custom: [ customTheme ]
	}
  })],
};

module.exports = config;
