<script>
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/Button.svelte';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faUser, faTrash } from '@fortawesome/free-solid-svg-icons';
	import CreateUser from '$lib/components/CreateUser.svelte';

	const { data } = $props();

	let open = $state(false);
	function create() {
		open = true;
	}
</script>

<CreateUser bind:open />

<div class="page">
	<h2>Users</h2>
	{#if !data.project.acceptsNewParticipants}
		<div class="warning">
			<h3>User creation disabled</h3>
			<div class="text">
				New user creation is disabled! Either enable it in the settings or create users manually
			</div>
			<div class="actions">
				<Button inline href="/dashboard/{data.projectID}" mode="primary" name="Go to settings" />
				<Button onclick={create} inline mode="accent" name="Create user" />
			</div>
		</div>
	{/if}

	<div class="users">
		{#if data.users.length === 0}
			<div class="empty">No users found</div>
		{/if}
		{#each data.users as user (user.id)}
			<div class="user">
				<a href="/dashboard/{data.projectID}/users/{user.id}" class="userlink">
					<div class="icon">
						<FontAwesomeIcon icon={faUser} />
					</div>
					{user.name}
				</a>
				<form method="post" action="?/delete">
					<input type="hidden" name="user" value={user.id} />
					<Button icon={faTrash} type="submit" mode="warning" />
				</form>
			</div>
		{/each}
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 20px;
	}

	.warning {
		display: flex;
		flex-direction: column;
		gap: 10px;
		background: var(--secondary);
		padding: 10px;
		border-radius: 10px;
	}

	.actions {
		display: flex;
		gap: 10px;
	}

	.users {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.user {
		display: flex;
		background: var(--secondary);
		border-radius: 10px;
		padding: 2px;
		color: var(--on-background);
	}

	.userlink {
		display: flex;
		gap: 15px;
		background: var(--secondary);
		padding: 10px;
		text-decoration: none;
		color: var(--on-background);
		flex: 1;
	}
</style>
