<script lang="ts">
	import Recording from '$lib/components/Recording.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	let { data } = $props();

	function capitalize(str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
</script>

<div class="page">
	<div class="header">Recordings by {capitalize(data.user.name)}</div>

	{#if !data.project.acceptsSubmissions}
		<div class="warning">
			<h3>Recording submission disabled</h3>
			<div class="text">
				Submitting new recordings is currently disabled! Enable it in settings to continue gathering
				more data
			</div>
			<div class="actions">
				<Button inline href="/dashboard/{data.projectID}" mode="primary" name="Go to settings" />
			</div>
		</div>
	{/if}

	<div class="track">
		{#each data.recordings as recording (recording.id)}
			<a class="recording" href="/dashboard/{data.projectID}/users/{data.user.id}/{recording.id}">
				<Recording {recording} />
			</a>
		{/each}
	</div>
</div>

<style>
	.track {
		display: flex;
		flex-direction: column;
		gap: 30px;
		padding: 20px;
		position: relative;
	}

	.track:before {
		content: '';
		position: absolute;
		top: 45px;
		left: 45px;
		bottom: 45px;
		z-index: -1;

		translate: -50%;
		border-left: 3px solid var(--primary-dark-tint);
	}

	.header {
		font-size: 20px;
		background: var(--secondary);
		padding: 10px 20px;
	}

	.recording {
		color: var(--on-background);
		text-decoration: none;
	}

	.warning {
		display: flex;
		flex-direction: column;
		gap: 10px;
		background: var(--secondary);
		padding: 10px;
		border-radius: 10px;
		margin: 20px;
	}
</style>
