<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import NavbarGuru from '$lib/component/guru.svelte';
	import Navbar from '$lib/component/navbar.svelte';
	import "../app.css";
  
	// Variabel untuk toggle tema
	let isDarkMode = false;
  
	// Fungsi untuk mengatur tema
	function toggleTheme(theme: 'dark' | 'light') {
	  if (theme === 'dark') {
		document.documentElement.classList.add('dark');
		localStorage.setItem('theme', 'dark');
		isDarkMode = true;
	  } else {
		document.documentElement.classList.remove('dark');
		localStorage.setItem('theme', 'light');
		isDarkMode = false;
	  }
	}
  
	// Pada mount, cek tema yang tersimpan di localStorage
	onMount(() => {
	  const savedTheme = localStorage.getItem('theme') || 'light';
	  toggleTheme(savedTheme as 'dark' | 'light');
	});
  
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

<div class="">
</div>

<slot />
