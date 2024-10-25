<script lang="ts">
	import { invalidate, goto } from '$app/navigation'; // `goto` ditambahkan untuk redirect
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
	  checkSession(); // Memanggil fungsi untuk cek sesi
	});
  
	// Logika navbar seperti yang sudah ada
	let showNavbar = true;
	export let data;
	$: ({ session, supabase } = data);
  
	// Fungsi untuk mengecek sesi pengguna
	async function checkSession() {
	  const { data: { session } } = await supabase.auth.getSession(); // Menggunakan getSession
  
	  if (!session) {
		// Jika pengguna tidak memiliki sesi (belum login atau signup), arahkan ke halaman /auth
		goto('/auth');
	  }
  
	  const { data: authListener } = supabase.auth.onAuthStateChange((_, newSession) => {
		if (newSession?.expires_at !== session?.expires_at) {
		  invalidate('supabase:auth');
		}
	  });
  
	  // Unsubscribe listener saat komponen di-unmount
	  return () => {
		if (authListener.subscription) {
		  authListener.subscription.unsubscribe(); // Menggunakan unsubscribe dari subscription
		}
	  };
	}
  
	// Logika untuk menyembunyikan navbar di halaman tertentu
	$: {
	  const hideNavbarOnPaths = [
		'/private/dashboard%20guru', 
		'/private/dashboard%20guru/Send', 
		'/auth', 
		'/auth/error', 
		'/', 
		'/private/dashboard%20murid', 
		'/private'
	  ];
	  showNavbar = !hideNavbarOnPaths.includes($page.url.pathname);
	}
  </script>
  
  <!-- Menampilkan Navbar jika kondisi terpenuhi -->
  {#if showNavbar}
	{#if $page.url.pathname.includes('guru')}
	  <NavbarGuru />
	{/if}
	<Navbar />
  {/if}
  
	<slot />

  