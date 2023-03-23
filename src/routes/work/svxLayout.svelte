<script>
	import parseISO from 'date-fns/parseISO/index.js';

	/** @type{string} */
	export let title;
	/** @type{string} */
	export let description;
	/** @type{string} */
	export let date;
	/** @type{string} */
	export let client;
	/** @type{string|undefined} */
	export let endDate;
	/** @type{boolean|undefined} */
	export let active;

	$: parsedDate = parseISO(date);
	$: parsedEndDate = endDate && parseISO(endDate);
</script>

<svelte:head>
	<title>Jonas Jongejan | {title}</title>
</svelte:head>

<article class="">
	<header class="mb-12">
		<h1 class="font-semibold text-2xl">{title}</h1>
		{#if client}
			{client} -
		{/if}
		<time datetime={date}>{parsedDate.getFullYear()}</time>
		{#if parsedEndDate}
			to
			<time datetime={endDate}>{parsedDate.getFullYear()}</time>
		{:else if active}
			to present
		{/if}
	</header>
	<slot />
</article>

<style lang="postcss">
	article :global(a) {
		@apply underline;
	}
	article :global(a:hover) {
		@apply text-gray-600;
	}
	article :global(p) {
		@apply my-4;
	}
	article :global(img) {
		@apply my-8;
	}

	article :global(blockquote) {
		@apply bg-slate-800 font-extralight px-4 py-2;
	}
</style>
