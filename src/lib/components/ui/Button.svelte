<script lang="ts">
	import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
	import { type Snippet, onDestroy, onMount, setContext } from 'svelte';
	import Fa from 'svelte-fa';
	import { type Writable, writable } from 'svelte/store';

	interface Props {
		name?: string;
		icon?: IconDefinition | string;
		onclick?: () => void;
		context?: Snippet<[Writable<boolean>]>;
		disabled?: boolean;
		mode: 'primary' | 'secondary' | 'outlined' | 'accent' | 'tint' | 'warning';
		bold?: boolean;
		type?: 'button' | 'submit';
		inline?: boolean;
		center?: boolean;
		large?: boolean;
		href?: string;
	}

	const {
		name,
		mode,
		onclick = onContext,
		context,
		bold,
		icon,
		disabled,
		inline = false,
		type = 'button',
		center = false,
		large = false,
		href
	}: Props = $props();

	let btn: HTMLButtonElement = $state();

	const open = writable(false);

	function onContext() {
		if (href) window.location.assign(href);
		if (!context) return;

		open.set(true);
	}
</script>

<button
	bind:this={btn}
	{onclick}
	{disabled}
	{type}
	class="btn"
	class:primary={mode === 'primary'}
	class:secondary={mode === 'secondary'}
	class:outlined={mode === 'outlined'}
	class:accent={mode === 'accent'}
	class:tint={mode === 'tint'}
	class:warning={mode === 'warning'}
	class:bold
	class:inline
	class:center
	class:large
>
	{#if icon}
		{#if typeof icon === 'string'}
			<img class="icon" src={icon} alt="Icon" />
		{:else}
			<Fa {icon} />
		{/if}
	{/if}
	{#if name}{name}{/if}
</button>

<style>
	.btn {
		display: flex;
		gap: 5px;
		align-items: center;
		cursor: pointer;
		border-radius: 20px;
		background: none;
		border: none;
		padding: 10px 15px;
		font-size: 16px;
	}

	.center {
		justify-content: center;
	}

	.inline {
		padding: 5px 10px;
	}

	.icon {
		height: 1em;
	}

	.primary {
		background: var(--primary);
		color: var(--on-primary);
	}

	.secondary {
		background: var(--secondary);
		color: var(--on-secondary);
	}

	.outlined {
		border: 1px solid var(--accent);
		color: var(--on-primary);
	}

	.accent {
		background: var(--accent);
		color: var(--on-accent);
	}

	.tint {
		background: var(--background-tint);
		color: var(--on-background);
	}

	.warning {
		color: var(--danger);
	}

	.bold {
		font-weight: bolder;
		font-size: 1.1em;
	}

	.large {
		font-size: 1.1em;
	}

	.btn[disabled] {
		filter: opacity(0.5);
		cursor: unset;
	}
</style>
