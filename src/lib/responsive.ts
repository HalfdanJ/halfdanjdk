import { derived, readable } from 'svelte/store';

import { browser } from '$app/environment';

// Could possibly pull these values from tailwind directly, see: https://tailwindcss.com/docs/configuration#referencing-in-java-script
// but had issues trying to import the config since it's a commonjs module
const breakpoints = {
	md: 768,
	xs: 450
};

const windowSize = readable(browser ? window.innerWidth : 99999, (set) => {
	if (browser) {
		const handleResize = () => {
			set(window.innerWidth);
		};

		window.addEventListener('resize', handleResize, false);
		return () => window.removeEventListener('resize', handleResize, false);
	}
});

export const mdBreakpoint = derived(windowSize, ($windowSize) => {
	if (browser) {
		return $windowSize >= breakpoints.md;
	}
	return false;
});

export const xsBreakpoint = derived(windowSize, ($windowSize) => {
	if (browser) {
		return $windowSize >= breakpoints.xs;
	}
	return false;
});
