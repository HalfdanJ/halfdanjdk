<script lang="ts">
	import type { PageData } from './$types';
	import HoverVideoElement from '$lib/components/HoverVideoElement.svelte';
	import parseISO from 'date-fns/parseISO/index.js';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	function year(date: string) {
		return parseISO(date).getFullYear();
	}
</script>

<div class="mt-4 mb-12">
	<p class="mb-8 text-base">
		Fullstack Software Engineer / Creative Technologist – specialized in early stage products and
		experimentation utilizing emerging technologies.
	</p>

	<ul class="my-2 flex flex-col gap-3 text-sm">
		<li>
			<strong>2023-present:</strong> Leading development of various early stage products at startups
			that utilize new capabilities of AI.
		</li>
		<li>
			<strong>2016-2023:</strong> Leading technical projects at Google Creative Lab that amplify and
			enable new opportunities from Google Research and beyond.
		</li>
		<li>
			<strong>2013-2016:</strong> Building out new novel software for broadcast graphics rendering.
		</li>
		<li>
			<strong>2008-2011:</strong> Exploring new technological possibilities with software and hardware
			for theatre and dance pieces.
		</li>
	</ul>
</div>

<h1 class="mb-4 text-xl font-semibold sm:text-2xl">Selected Work</h1>

<div class="flex flex-wrap gap-8">
	{#each Object.keys(data.groupedPosts) as group}
		{@const category = data.categories[group]}
		<div class="w-full text-base font-semibold capitalize sm:text-lg">{category.title}</div>
		{@const posts = data.groupedPosts[group]}
		<div class="grid grid-cols-2 gap-6 gap-y-12 sm:flex sm:flex-wrap">
			{#each posts as post, i}
				<a href={post.slug} class="group max-w-[12rem] no-underline outline-none hover:text-black">
					<div
						class="relative overflow-clip border-1 border-gray-200 transition-all group-hover:scale-105 group-hover:border-8 group-hover:border-amber-200 group-focus:scale-105 group-focus:border-8 group-focus:border-amber-200"
					>
						{#if post.previewVideo}
							<HoverVideoElement videoSrc={post.previewVideo} imageSrc={post.previewImg} />
						{:else}
							<img
								src={post.previewImg}
								alt={post.title}
								class="xs:h-48 xs:w-48 w-full"
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
