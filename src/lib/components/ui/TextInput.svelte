<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		placeholder?: string;
		name?: string;
		value?: string;
		mode: 'primary' | 'secondary';
		rounded: boolean;
		focus?: boolean;
		required?: boolean;
		type?: string;
		input?: HTMLInputElement;
		left?: Snippet;
		right?: Snippet;
	}

	let {
		placeholder,
		value = $bindable(''),
		name,
		mode,
		rounded,
		focus,
		required,
		type = 'text',
		input = $bindable(),
		left,
		right
	}: Props = $props();

	onMount(() => {
		if (focus) input?.focus();
	});
</script>

<div
	class="input"
	class:primary={mode === 'primary'}
	class:secondary={mode === 'secondary'}
	class:rounded
>
	{#if left}{@render left()}{/if}
	<input
		bind:this={input}
		{name}
		class="content"
		class:disableLeftPadding={!!left}
		class:disableRightPadding={!!left}
		{type}
		{placeholder}
		bind:value
		{required}
	/>
	{#if right}{@render right()}{/if}
</div>

<style>
	.input {
		display: flex;
		overflow: hidden;
	}

	.content {
		border: none;
		padding: 10px 15px;
		margin: 0;
		width: 100%;
		outline: 0;
		font-size: 1em;
		background: none;
	}

	.disableLeftPadding {
		padding-left: 10px;
	}

	.disableRightPadding {
		padding-right: 10px;
	}

	.primary {
		background: var(--primary);
		color: var(--on-primary);
	}

	.secondary {
		background: var(--secondary);
		color: var(--on-secondary);
	}

	.rounded {
		border-radius: 20px;
	}

	.primary::placeholder {
		color: var(--text-muted);
	}

	.secondary::placeholder {
		color: var(--on-secondary-muted);
	}
</style>
