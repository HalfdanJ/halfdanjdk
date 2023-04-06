<script lang="ts">
	import type { PageData } from './$types';
	import HoverVideoElement from '$lib/components/HoverVideoElement.svelte';
	import parseISO from 'date-fns/parseISO/index.js';

	export let data: PageData;

	function year(date: string) {
		return parseISO(date).getFullYear();
	}
</script>

<div class="mb-12 mt-4">
	<p class="mb-4">
		I'm a Creative Technologist / Fullstack Software Engineer / Hot Glue Gun Developer, or whatever
		you want to call it, currently working at the Google Creative Lab in New York. I've worked on a
		wide range of projects, often touching on making science and technology more accessible to
		everyone, or adding a little bit of delight to topics such as machine learning and AR.
	</p>
	<p>
		I previously worked on interactive video set designs for theatre and dance pieces and created
		installations using video tracking, robots and lights. Lastly, I worked for a few years for the
		Danish Broadcasting Corporation, innovating new ways of making graphics for the tv.
	</p>
</div>

<h1 class="mb-4 text-xl font-semibold sm:text-2xl">Selected Work</h1>

<div class="flex flex-wrap gap-8">
	{#each Object.keys(data.groupedPosts) as group}
		{#if group === 'cl'}
			<div class="w-full text-base font-semibold sm:text-lg">Google Creative Lab</div>
		{:else if group === 'broadcast'}
			<div class="w-full text-base font-semibold sm:text-lg">TV / Broadcast</div>
		{:else}
			<div class="w-full text-base font-semibold capitalize sm:text-lg">{group}</div>
		{/if}
		{@const posts = data.groupedPosts[group]}
		<div class="grid grid-cols-2 gap-6 gap-y-12 sm:flex sm:flex-wrap">
			{#each posts as post, i}
				<a href={post.slug} class="group max-w-[12rem] no-underline hover:text-black">
					<div
						class="relative overflow-clip rounded-lg shadow transition-all group-hover:-translate-y-0.5 group-hover:shadow-lg"
					>
						{#if post.previewVideo}
							<HoverVideoElement videoSrc={post.previewVideo} imageSrc={post.previewImg} />
						{:else}
							<img
								src={post.previewImg}
								alt={post.title}
								class="w-full xs:h-48 xs:w-48"
								loading="lazy"
							/>
						{/if}
					</div>
					<div class="mt-2 text-sm sm:text-base">
						<span class="mr-1">{post.title}</span>
						<span class="font-extralight text-slate-400">
							{year(post.date)}
							{#if post.endDate}
								- {year(post.endDate)}
							{:else if post.active}
								- present
							{/if}
						</span>
					</div>
				</a>
			{/each}
		</div>
	{/each}
</div>
