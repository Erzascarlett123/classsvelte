<script>
	import { page } from '$app/stores';
	export let data;
	let showNavbar= true;
	$: ({ supabase } = data);

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
	};

	$: {
    const hideNavbarOnPaths = ['/dashboard%20guru', '/auth', '/', '/private', '/private/dashboard%20murid'];
    showNavbar = !hideNavbarOnPaths.includes($page.url.pathname);
  }
</script>


<main>
	<slot />
</main>