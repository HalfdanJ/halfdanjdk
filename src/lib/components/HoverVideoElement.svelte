<script lang="ts">
	import vi from 'date-fns/locale/vi';

	export let videoSrc: string;
	export let imageSrc: string;

	let hovering = false;
	let video: HTMLVideoElement | undefined;

	let transitionDuration = 100;

	function hover() {
		hovering = true;
		video?.play();
	}

	function stop() {
		hovering = false;
		setTimeout(() => {
			if (!video) return;
			video.pause();
			video.currentTime = 0;
		}, transitionDuration);
	}
</script>

<div on:mouseenter={hover} on:mouseleave={stop} class="relative">
	<video bind:this={video} src={videoSrc} muted loop playsinline paused={!hover} />
	<img
		style:opacity={hovering ? 0 : 100}
		class="object-cover absolute top-0 transition-all"
		alt={'preview'}
		src={imageSrc}
	/>
</div>
