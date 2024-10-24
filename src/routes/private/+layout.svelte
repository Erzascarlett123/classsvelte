<script>
	export let data;
	let showNavbar= true;
	$: ({ supabase } = data);

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
	};

	
</script>


<main>
	{#if showNavbar}
		<nav>
			<!-- Navbar content here -->
		</nav>
	{/if}
</main>
<slot />