<script>
	import '../app.css';
</script>

<main class="pb-16 min-h-screen lg:pb-24 bg-white text-black">
	<div class="flex flex-col  px-4 mx-auto max-w-screen-xl font-light">
		<header class="flex items-center align-middle py-8 mx-auto max-w-4xl gap-x-4 w-full flex-wrap">
			<div>
				<a href="/" class="font-light text-lg no-underline uppercase "> Jonas Jongejan </a>
				<!-- <span
					class="font-light text-lg no-underline uppercase text-gray-400"
					>/ Creative Technologist</span
				> -->
			</div>

			<div class="grow w-full sm:w-min" />

			<a href="mailto:jonas@halfdanj.dk" target="_blank">E-mail</a>
			<a href="https://twitter.com/halfdanj" target="_blank" rel="noreferrer">Twitter</a>
			<a href="https://github.com/HalfdanJ" target="_blank" rel="noreferrer">GitHub</a>
			<a href="https://www.linkedin.com/in/halfdanj/" target="_blank" rel="noreferrer">LinkedIn</a>
		</header>
		<div class="mx-auto w-full max-w-4xl">
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
	:global(h1) {
		@apply text-3xl font-extrabold leading-tight lg:text-4xl;
	}

	a {
		@apply hover:text-gray-600;
	}
</style>
