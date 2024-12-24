<script lang="ts">
	import leaphyLogo from '$lib/assets/leaphy-logo.svg';
</script>

<div class="header">
	<div class="comp">
		<img class="logo" src={leaphyLogo} alt="Leaphy" />
	</div>
</div>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: var(--primary);
		padding: 10px;
		height: 64px;
	}
	.comp {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.logo {
		height: 18px;
		margin-right: 10px;
	}
</style>
