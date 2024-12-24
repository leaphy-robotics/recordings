<script lang="ts">
	import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { page } from '$app/stores';
	import type { Snippet } from 'svelte';

	interface Props {
		recording: {
			id: string;
			date: Date;
		};
		right?: Snippet;
		background?: string;
	}
	let { recording, right }: Props = $props();

	function capitalize(str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
</script>

<div class="item">
	<div class="left">
		<div class="icon">
			<FontAwesomeIcon icon={faPlayCircle} />
		</div>
		<div class="info">
			<div class="name">{capitalize($page.data.user.name)} submitted a recording!</div>
			<div class="date">
				{recording.date.toLocaleDateString('nl-NL', {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric'
				})}
			</div>
		</div>
	</div>
	{#if right}
		<div class="right">
			{@render right()}
		</div>
	{/if}
</div>

<style>
	.item {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		align-items: center;
	}

	.left {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.icon {
		font-size: 50px;
		color: var(--accent);
		background: var(--background);
		line-height: 1em;
		padding: 5px 0;
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.name {
		font-size: 20px;
		font-weight: bold;
	}

	.date {
		font-size: 16px;
	}
</style>
