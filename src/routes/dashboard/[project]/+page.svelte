<script lang="ts">
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faBook, faChalkboardTeacher, faUsersRectangle } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Switch from '$lib/components/ui/Switch.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const { data } = $props();

	const settings = $state(data.project);
</script>

<form method="post" action="?/save" class="page">
	<div class="header">
		<div class="meta">
			<div class="icon">
				<Fa icon={data.project.purpose === 'research' ? faBook : faChalkboardTeacher} />
			</div>
			<div class="right">
				<h1>{data.project.name}</h1>
				<div class="url">https://{data.project.slug}.leaphyeasybloqs.com</div>
			</div>
		</div>
		<div class="actions">
			<Button type="submit" mode="primary" name="Save" />
		</div>
	</div>

	<div class="content">
		<h2>Settings</h2>
		<Switch
			id="acceptsSubmissions"
			name="Accept submissions"
			bind:checked={settings.acceptsSubmissions}
		/>
		<Switch
			id="acceptsNewParticipants"
			name="Allow the creation of new users"
			bind:checked={settings.acceptsNewParticipants}
		/>
		{#if settings.acceptsNewParticipants}
			<Switch
				id="suggestNames"
				name="Suggest previously used users"
				bind:checked={settings.suggestNames}
			/>
		{/if}
	</div>
</form>

<style>
	.page {
		display: flex;
		flex-direction: column;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: var(--secondary);
		padding: 20px;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.header .icon {
		font-size: 50px;
	}

	.header .right {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	h1,
	h2 {
		margin: 0;
	}

	h2 {
		margin-bottom: 10px;
	}
	.content {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 20px;
	}
</style>
