<script lang="ts">
    import { goto } from '$app/navigation'; // Impor goto untuk navigasi
    import dummyUsers from '../../dummyData.json'; // Memperbaiki cara impor

    interface User {
        name: string;
        email: string;
        password: string;
    }

    // Menggunakan data dummy sebagai state
    let users: User[] = [...dummyUsers]; // Salin data dari dummyData.json
    let email = '';
    let password = '';
    let errorMessage = '';
    let successMessage = '';

    // Fungsi login
    function handleLogin() {
        const user: User | undefined = users.find((user: User) => user.email === email && user.password === password);
        
        if (user) {
            successMessage = `Login successful! Welcome, ${user.name}`;
            errorMessage = '';

            const token = btoa(`${user.email}:${user.password}`);

              // Simpan token di localStorage
        localStorage.setItem('token', token);

            // Mengalihkan pengguna ke halaman '/' setelah 1 detik
            setTimeout(() => {
                goto('/'); // Ganti dengan jalur yang sesuai
            }, 1000);
        } else {
            errorMessage = 'Invalid email or password.';
            successMessage = '';
        }
    }
</script>

<!-- Form Login -->
<div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form on:submit|preventDefault={handleLogin} class="bg-white shadow-lg rounded-lg py-8 px-10 max-w-sm mx-auto space-y-6">
        <h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>
        
        <div>
            <label class="block text-gray-700 text-sm font-semibold mb-2" for="email">Email</label>
            <input
                name="email"
                type="email"
                id="email"
                placeholder="Enter your email"
                bind:value={email}
                class="focus:ring-2 focus:ring-blue-500 border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none transition duration-200"
                required
            />
        </div>
        
        <div>
            <label class="block text-gray-700 text-sm font-semibold mb-2" for="password">Password</label>
            <input
                name="password"
                type="password"
                id="password"
                placeholder="Enter your password"
                bind:value={password}
                class="focus:ring-2 focus:ring-blue-500 border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none transition duration-200"
                required
            />
        </div>
        
        <button
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none transition duration-200"
            type="submit"
        >
            Login
        </button>
        
        {#if errorMessage}
            <p class="error text-red-500">{errorMessage}</p>
        {/if}
        {#if successMessage}
            <p class="success text-green-500">{successMessage}</p>
        {/if}
    </form>
</div>

<style>
    .error { color: red; }
    .success { color: green; }
</style>
