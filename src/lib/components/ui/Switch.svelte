<script lang="ts">
	interface Props {
		id?: string;
		name: string;
		checked: boolean;
	}
	let { id, name, checked = $bindable() }: Props = $props();

	function toggle() {
		checked = !checked;
	}
</script>

<div class="line">
	{#if id}<input name={id} type="hidden" value={checked ? 'true' : 'false'} />{/if}
	<button type="button" class="switch" onclick={toggle} aria-label="switch">
		<span class="bubble" class:checked></span>
	</button>
	<span class="name">{name}</span>
</div>

<style>
	.line {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.switch {
		position: relative;
		background: var(--secondary);
		width: 50px;
		height: 25px;
		border-radius: 30px;
		outline: 0;
		border: none;
	}

	.bubble {
		position: absolute;
		transition: 0.3s ease;
		width: 25px;
		height: 25px;
		left: 0;
		top: 0;
		background: var(--primary);
		border-radius: 80px;
	}

	.bubble.checked {
		translate: 100%;
		background: var(--accent);
	}
</style>
