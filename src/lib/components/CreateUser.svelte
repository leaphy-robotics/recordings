<script lang="ts">
	import TextInput from '$lib/components/ui/TextInput.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ChipSelect from '$lib/components/ui/ChipSelect.svelte';
	import { faBook, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';

	interface Props {
		open: boolean;
	}
	let { open = $bindable() }: Props = $props();

	function cancel() {
		open = false;
	}
</script>

<dialog class="dialog" {open}>
	<form method="post" action="?/create" class="dialog-content">
		<h2>Create an user</h2>

		<div class="context">
			<div class="input-group">
				<span>Name</span>
				<TextInput name="name" mode="secondary" rounded />
			</div>
		</div>

		<div class="btn-area">
			<Button onclick={cancel} mode="secondary" name="Cancel" center />
			<Button type="submit" mode="primary" name="Create" center />
		</div>
	</form>
</dialog>

<style>
	.dialog {
		all: unset;
		display: none;
	}

	.dialog[open] {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;

		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;

		background: #00000020;
	}

	.dialog-content {
		display: flex;
		flex-direction: column;
		gap: 20px;

		padding: 20px;
		border-radius: 10px;
		max-width: 400px;
		width: 100%;
		background: var(--background);
		box-shadow:
			0 11px 15px -7px rgba(0, 0, 0, 0.2),
			0 24px 38px 3px rgba(0, 0, 0, 0.14),
			0 9px 46px 8px rgba(0, 0, 0, 0.12);
	}

	.btn-area {
		display: flex;
		justify-content: space-between;
	}

	.context {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	h2 {
		margin: 10px;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		text-align: left;
		gap: 2px;
	}

	.input-group > span {
		padding: 5px;
	}
</style>
