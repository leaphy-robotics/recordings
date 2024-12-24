<script lang="ts">
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faGear, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';

	let { data, children } = $props();
</script>

<div class="layout">
	<div class="links">
		<a
			href="/dashboard/{data.projectID}"
			class="link"
			class:selected={$page.data['path']?.settings}
		>
			<div class="icon">
				<FontAwesomeIcon icon={faGear} />
			</div>
			Settings
		</a>
		<a
			href="/dashboard/{data.projectID}/users"
			class="link"
			class:selected={$page.data['path']?.users}
		>
			<div class="icon">
				<FontAwesomeIcon icon={faUsers} />
			</div>
			Users
		</a>

		{#if $page.url.pathname.includes('users')}
			<div class="indent">
				{#if data.users.length === 0}
					<div class="empty">No users found</div>
				{/if}
				{#each data.users as user (user.id)}
					<a
						href="/dashboard/{data.projectID}/users/{user.id}"
						class="link"
						class:selected={$page.data['user']?.id === user.id}
					>
						<div class="icon">
							<FontAwesomeIcon icon={faUser} />
						</div>
						{user.name}
					</a>
				{/each}
			</div>
		{/if}
	</div>

	<div class="content">
		{@render children()}
	</div>
</div>

<style>
	.layout {
		display: flex;
		flex: 1;
	}

	.links {
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		gap: 5px;
		padding: 10px;

		width: 400px;
		background: var(--background-tint);
		color: var(--on-background);
		border-right: 3px solid var(--text-muted);
	}

	.link {
		display: flex;
		align-items: center;
		gap: 10px;
		border-radius: 10px;
		font-size: 16px;
		cursor: pointer;
		color: var(--on-background);
		text-decoration: none;

		padding: 10px;
	}

	.link:hover {
		background: var(--background);
		box-shadow: 2px 2px 2px var(--text-muted);
	}

	.link.selected {
		background: var(--accent);
		color: var(--on-accent);
	}

	.icon {
		font-size: 14px;
	}

	.content {
		overflow-y: auto;
		flex: 1;
	}

	.indent {
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding-left: 30px;
	}
</style>
