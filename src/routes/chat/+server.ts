import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return redirect(302, 'https://calendar.app.google/9vzTvXfwYYwy8bS67');
};
