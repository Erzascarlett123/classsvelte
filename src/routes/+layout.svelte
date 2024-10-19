	<script>
		import { invalidate } from '$app/navigation';
		import { onMount } from 'svelte';
		import { page } from '$app/stores'
		import NavbarGuru from '$lib/component/guru.svelte';
		import Navbar from '$lib/component/navbar.svelte';
		import "../app.css"


		$: logout = async () => {
			const { error } = await supabase.auth.signOut();
			if (error) {
				console.error(error);
			}
		};


		let showNavbar = true;

		export let data;
		$: ({ session, supabase } = data);

		onMount(() => {
			const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
				if (newSession?.expires_at !== session?.expires_at) {
					invalidate('supabase:auth');
				}
			});

			return () => data.subscription.unsubscribe();
		});

		$: {
		const hideNavbarOnPaths = ['/private/dashboard%20guru','/private/dashboard%20guru/Send', '/auth', '/', '/private/dashboard murid','/private'];
		showNavbar = !hideNavbarOnPaths.includes($page.url.pathname);
	}
	</script>

	{#if showNavbar}
	{#if $page.url.pathname.includes('guru')}
		<NavbarGuru />
	{/if}
	<Navbar />
	{/if}
	<slot />