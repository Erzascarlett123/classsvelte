<script lang="ts">
    import { createClient } from '@supabase/supabase-js';

    // Inisialisasi klien Supabase
    const supabaseUrl = "https://kvyuvciubszzmebpbsqg.supabase.co";
    const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2eXV2Y2l1YnN6em1lYnBic3FnIiwicm9zZSI6ImFub24iLCJpYXQiOjE3MjkwNDU4MzYsImV4cCI6MjA0NDYyMTgzNn0.ANaAi6ALuRAh-mo1b4ayroMFF1XqTTbZDiZzRnDgSKo";
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    let email: string = "";
    let password: string = "";

    // Fungsi login
    async function login(event: Event) {
        event.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            alert("Login gagal: " + error.message);
        } else {
            alert("Login berhasil");
            // Redirect atau lakukan tindakan lain setelah login
        }
    }
</script>

<!-- Form Login -->
<form on:submit={login} class="bg-white shadow-lg rounded-lg py-5 px-6 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-10 flex flex-col space-y-4">
    <h2 class="text-lg font-bold text-center mb-4 text-gray-800">Login</h2>
    
    <!-- Email -->
    <div class="mb-4">
        <label class="block text-gray-700 text-sm font-semibold mb-2" for="email">Email</label>
        <input
            name="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            bind:value={email}
            class="focus:ring-2 focus:ring-blue-500 border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none"
            required
        />
    </div>
    
    <!-- Password -->
    <div class="mb-6">
        <label class="block text-gray-700 text-sm font-semibold mb-2" for="password">Password</label>
        <input
            name="password"
            type="password"
            id="password"
            placeholder="Enter your password"
            bind:value={password}
            class="focus:ring-2 focus:ring-blue-500 border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none"
            required
        />
    </div>
    
    <button
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        type="submit"
    >
        Login
    </button>
</form>
