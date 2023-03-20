<svelte:options accessors={true} />

<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import Player, { type Options } from '@vimeo/player';

	export let playerHeight = 320;
	export let playerWidth = 640;
	export let options = () => ({});
	export let videoId: number;
	export let loop = false;
	export let autoplay = false;

	const dispatch = createEventDispatcher();
	const eventsToDispatch = [
		'play',
		'pause',
		'ended',
		'timeupdate',
		'progress',
		'seeked',
		'texttrackchange',
		'cuechange',
		'cuepoint',
		'volumechange',
		'error',
		'loaded'
	];

	let elementId = `vimeo-player-${videoId}`;
	let vimeo;
	export let player: Player;
	$: loadVideo(videoId);
	function loadVideo(id: number) {
		if (!player) return;
		return player.loadVideo(id);
	}
	function setEvents() {
		player
			.ready()
			.then(() => dispatch('ready', { player: player }))
			.catch((error) => dispatch('error', { error: error, player: player }));
		eventsToDispatch.forEach((event) => dispatchOnPlayerEvent(event));
	}
	function dispatchOnPlayerEvent(event: any) {
		player.on(event, (data) => dispatch(event, { data: data, player: player }));
	}
	let handler = {
		get: function (target: any, prop: any) {
			var value = target[prop];
			return typeof value == 'function' ? value.bind(target) : value;
		}
	};
	onMount(async () => {
		const overrides: Options = {
			id: videoId,
			width: playerWidth,
			height: playerHeight,
			loop: loop,
			autoplay: autoplay,
			responsive: true,
			...options()
		};
		vimeo = new Player(elementId, overrides);
		player = new Proxy(vimeo, handler);
		setEvents();
	});
	onDestroy(() => {
		if (player) {
			player.unload();
		}
	});
</script>

<div id={elementId} class="my-8" />
