import type { PageLoad } from './$types';

export const prerender = true;

export interface Post {
	slug: string;
	title: string;
	client: string;
	date: string;
	endDate?: string;
	category: string;
	previewImg: string;
	previewVideo?: string;
	active?: boolean;
}

async function getPosts() {
	const modules = import.meta.glob(`../routes/work/**/*.svx`); // load all the svx files

	const postPromises = [];
	for (const [path, resolver] of Object.entries(modules)) {
		const promise = resolver().then((post: any) => {
			const slug = path.match(/([\w/]+)\/(\+page\.svx)/i)?.[1] ?? null; // Create the slug
			return {
				slug,
				...post.metadata
			};
		});
		postPromises.push(promise);
	}

	const posts = await Promise.all(postPromises);
	return posts as Post[];
}

export const load = (async () => {
	let posts = await getPosts();
	posts = posts.sort((a, b) =>
		a.active ? -1 : (a.endDate || a.date) < (b.endDate || b.date) ? 1 : -1
	);

	const groupedPosts = posts.reduce((prev, post) => {
		prev[post.category] = [...(prev[post.category] || []), post];
		return prev;
	}, { cl: [] } as Record<string, Post[]>);
	return {
		// posts,
		groupedPosts
	};
}) satisfies PageLoad;
