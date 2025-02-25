<script lang="ts">
	export let videoId: string;
	export let start: number = 0;
</script>

<iframe
	frameborder="0"
	scrolling="no"
	marginheight="0"
	marginwidth="0"
	width="896"
	height="497"
	title="YouTube video player"
	class="max-w-full"
	src="https://www.youtube.com/embed/{videoId}?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start={start}&end=0&origin=https://halfdanj.dk"
></iframe>
