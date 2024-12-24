<script lang="ts">
	import Recording from '$lib/components/Recording.svelte';
	import RRWebPlayer from 'rrweb-player';
	import 'rrweb-player/dist/style.css';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faArrowsUpDown, faList } from '@fortawesome/free-solid-svg-icons';

	let { data } = $props();
	let viewer = $state<HTMLDivElement>();

	$effect(() => {
		if (!viewer) return;

		new RRWebPlayer({
			target: viewer,
			props: {
				events: JSON.parse(data.recording.recording),
				width: viewer.clientWidth,
				height: viewer.clientHeight - 80
			}
		});
	});
</script>

<div class="page">
	<a class="header" href="/dashboard/{data.projectID}/users/{data.user.id}">
		<Recording recording={data.recording}>
			{#snippet right()}
				<div class="btn">
					<FontAwesomeIcon icon={faList} />
				</div>
			{/snippet}
		</Recording>
	</a>

	<div class="viewer" bind:this={viewer}></div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 10px;
		height: 100%;
		padding: 20px;
	}

	.viewer {
		flex: 1;
	}

	.btn {
		font-size: 20px;
	}

	.header {
		text-decoration: none;
		color: var(--on-background);
	}
</style>
