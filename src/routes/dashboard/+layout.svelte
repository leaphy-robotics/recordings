<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}
	const { children }: Props = $props();
</script>

<div class="page">
	<Header />
	{@render children()}
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
</style>
