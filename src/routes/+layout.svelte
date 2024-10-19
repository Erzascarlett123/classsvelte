<script lang="ts">
	import { goto } from '$app/navigation'; // Tambahkan `goto` untuk redirect
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import NavbarGuru from '$lib/component/guru.svelte';
	import Navbar from '$lib/component/navbar.svelte';
	import "../app.css";
	
	// Logika navbar seperti yang sudah ada
	let showNavbar = true;
	export let data;
	let session;
	let supabase;
  
	// Pengecekan autentikasi pengguna
	$: ({ session, supabase } = data);
	
	onMount(async () => {
	  // Cek session pengguna
	  const { data: { session } } = await supabase.auth.getSession();
	});
	
	// Menentukan apakah navbar harus disembunyikan di beberapa path
	$: {
	  const hideNavbarOnPaths = ['/private/dashboard guru','/private/dashboard guru/Send', '/auth', '/auth/error', '/', '/private/dashboard murid','/private'];
	  showNavbar = !hideNavbarOnPaths.includes($page.url.pathname);
	}
  </script>
  
  <!-- Jika navbar diizinkan untuk muncul -->
  {#if showNavbar}
	{#if $page.url.pathname.includes('guru')}
	  <NavbarGuru />
	{/if}
	<Navbar />
  {/if}
  
  <slot />
  