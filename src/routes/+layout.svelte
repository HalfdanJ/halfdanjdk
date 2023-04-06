<script>
	import '../app.css';
</script>

<main class="min-h-screen bg-white pb-16 text-sm text-black sm:text-base lg:pb-24">
	<div
		class="mx-auto flex  max-w-sm  flex-col px-4 font-light xs:max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl"
	>
		<header class="mx-auto flex w-full  flex-wrap items-center gap-y-0.5 gap-x-4 py-8 align-middle">
			<div>
				<a href="/" class="text-lg font-light uppercase no-underline "> Jonas Jongejan </a>
				<!-- <span
					class="font-light text-lg no-underline uppercase text-gray-400"
					>/ Creative Technologist</span
				> -->
			</div>

			<div class="w-full grow sm:w-min" />

			<a href="mailto:jonas@halfdanj.dk" target="_blank">E-mail</a>
			<a href="https://twitter.com/halfdanj" target="_blank" rel="noreferrer">Twitter</a>
			<a href="https://github.com/HalfdanJ" target="_blank" rel="noreferrer">GitHub</a>
			<a href="https://www.linkedin.com/in/halfdanj/" target="_blank" rel="noreferrer">LinkedIn</a>
		</header>
		<div class="mx-auto w-full">
			<slot />
		</div>
	</div>
</main>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-TEPLD2W13L"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'G-TEPLD2W13L');
	</script>

	<title>Jonas Jongejan</title>
</svelte:head>

<style lang="postcss">
	/* :global(h1) {
		@apply text-3xl font-extrabold leading-tight lg:text-4xl;
	} */

	a {
		@apply hover:text-gray-600;
	}
</style>
