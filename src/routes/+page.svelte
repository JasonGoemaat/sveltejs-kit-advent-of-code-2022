<script>
	import { base } from '$app/paths'
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		Advent of Code
	</h1>

	<ul>
		<li><a href="{base}/advent/2022">2022</a></li>
	</ul>

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	ul {
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	li {
		list-style: none;
		font-size: 1.8rem;
	}

</style>
