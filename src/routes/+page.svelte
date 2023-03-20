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
		I'm a Creative Technologist currently working at the Google Creative Lab in New York. I've
		worked on a wide range of projects here, often touching on making science and technology more
		accessible to everyone, or adding a little bit of delight to topics such as machine learning and
		AR.
	</p>
	<p>
		I previously worked on interactive video set designs for theatre and dance pieces, and created
		installations using video tracking, robots and lights. Lastly, I worked for a few years for the
		Danish Broadcasting Corporation innovating on new ways of making graphics for the tv.
	</p>
</div>

<h1 class="mb-4 font-semibold text-2xl">Selected Work</h1>

<div class="flex flex-wrap gap-8">
	{#each Object.keys(data.groupedPosts) as group}
		{#if group === 'cl'}
			<div class="w-full text-lg font-semibold">Google Creative Lab</div>
		{:else if group === 'broadcast'}
			<div class="w-full text-lg font-semibold">TV / Broadcast</div>
		{:else}
			<div class="w-full text-lg font-semibold capitalize">{group}</div>
		{/if}
		{@const posts = data.groupedPosts[group]}
		{#each posts as post, i}
			<a href={post.slug} class="hover:text-black no-underline mb-8 group w-full xs:w-48">
				<div
					class="rounded-lg overflow-clip relative shadow transition-all group-hover:shadow-lg group-hover:-translate-y-0.5"
				>
					{#if post.previewVideo}
						<HoverVideoElement videoSrc={post.previewVideo} imageSrc={post.previewImg} />
					{:else}
						<img src={post.previewImg} alt={post.title} class="w-full" />
					{/if}
				</div>
				<div class="mt-2 text-lg xs:text-base">
					{post.title}
					<span class="text-slate-400 ml-1 font-extralight">
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
	{/each}
</div>
