<form class="justify-center item-center bg-white border shadow-[5px_5px_0px_black] rounded px-8 pt-12 pb-10 mb-4 max-w-sm sm:max-w-md lg:max-w-lg mx-auto mt-20" on:submit|preventDefault={handleLogin}>
	<h2 class="text-2xl font-bold text-center mb-6 text-gray-700">Login</h2>
	
	<!-- Tombol Login dengan Google -->
	<div class="mb-4">
	  <button
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
		type="button"
		on:click={handleLoginWithGoogle}
	  >
		Login dengan Google
	  </button>
	</div>
	
	<!-- Buttons -->
	<div class="flex items-center justify-between">
	  <button
		formaction="?/signup"
		class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
	  >
		Sign up
	  </button>
	</div>
</form>

<form class="justify-center items-center bg-white border shadow-[6px_6px_0px_black] rounded px-8 pt-12 pb-10 mb-10 max-w-sm sm:max-w-md lg:max-w-lg mx-auto mt-20">
	<h2 class="text-xl font-bold text-center mb-6 text-gray-700">Mohon untuk klik Signup sekali saja.</h2>
	<h2 class="text-xl font-bold text-center mb-6 text-gray-700">Bila sudah, maka cek Gmail masing masing dan klik tautan yang disediakan ya :)</h2>
</form>

<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  const handleLoginWithGoogle = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'google',
    });

    if (error) {
      console.error('Error logging in:', error.message);
      return;
    }

    // Periksa apakah pengguna sudah ada di tabel 'users'
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', user.email)
      .single();

    // Jika pengguna belum ada, masukkan ke dalam tabel 'users'
    if (!existingUser) {
      const { error: insertError } = await supabase
        .from('users')
        .insert([{ email: user.email, role_id: 1 }]); // Misalnya 1 untuk role 'guru'

      if (insertError) {
        console.error('Error inserting user:', insertError);
      }
    }

    // Pindah ke halaman dashboard setelah login berhasil
    await goto('/private/dashboard');
  };
</script>
