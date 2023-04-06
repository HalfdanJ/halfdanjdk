<script lang="ts">
	import { inview } from 'svelte-inview';
	import { xsBreakpoint } from '$lib/responsive';

	export let videoSrc: string;
	export let imageSrc: string;

	let hovering = false;
	let video: HTMLVideoElement | undefined;

	let transitionDuration = 100;

	function start() {
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

<div
	class="relative xs:h-48 xs:w-48"
	on:mouseenter={() => $xsBreakpoint && start()}
	on:mouseleave={() => $xsBreakpoint && stop()}
	use:inview={{ rootMargin: '-45%' }}
	on:inview_enter={() => !$xsBreakpoint && start()}
	on:inview_leave={() => !$xsBreakpoint && stop()}
>
	<video
		bind:this={video}
		src={videoSrc}
		muted
		loop
		playsinline
		paused={!start}
		poster={imageSrc}
	/>
	<img
		style:opacity={hovering ? 0 : 100}
		class="absolute top-0 object-cover transition-all xs:h-48 xs:w-48"
		alt={'preview'}
		src={imageSrc}
		loading="lazy"
	/>
</div>
