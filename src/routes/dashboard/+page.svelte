<script lang="ts">
	import Create from '$lib/components/Create.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { faAdd, faBook, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const { data } = $props();
	let open = $state(false);

	function create() {
		open = true;
	}
</script>

<Create bind:open />

<div class="content">
	<div class="header">
		<h2>Projects</h2>
		<Button onclick={create} mode="secondary" icon={faAdd} />
	</div>
	<div class="projects">
		{#each data.projects as project (project.id)}
			<a href="/dashboard/{project.id}" class="project">
				<div class="left">
					<Fa icon={project.purpose === 'research' ? faBook : faChalkboardTeacher} />
				</div>
				<div class="right">
					<div class="name">{project.name}</div>
					<div class="url">https://{project.slug}.leaphyeasybloqs.com</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
		max-width: 600px;
		width: 100%;
		padding: 10px;
		margin: 0 auto;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.projects {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.project {
		display: flex;
		align-items: center;
		gap: 15px;
		background: var(--secondary);
		border-radius: 10px;
		padding: 10px;
		cursor: pointer;
		text-decoration: none;
		color: var(--on-secondary);
	}

	.left {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 25px;
		width: 35px;
		padding-left: 5px;
	}

	.right {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.name {
		font-weight: bold;
	}

	.url {
		font-family: monospace;
		padding: 5px;
		background: #f1f1f1;
		border-radius: 5px;
	}
</style>
