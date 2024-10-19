<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import NavbarGuru from '$lib/component/guru.svelte';
	import Navbar from '$lib/component/navbar.svelte';
	import "../app.css";
  
	// Logika navbar seperti yang sudah ada
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
	  const hideNavbarOnPaths = ['/private/dashboard guru','/private/dashboard guru/Send', '/auth','/auth/error', '/', '/private/dashboard murid','/private'];
	  showNavbar = !hideNavbarOnPaths.includes($page.url.pathname);
	}
  </script>

{#if showNavbar}
  {#if $page.url.pathname.includes('guru')}
    <NavbarGuru />
  {/if}
  <Navbar />
{/if}

