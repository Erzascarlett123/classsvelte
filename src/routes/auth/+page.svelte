<script>
    import Login from '$lib/component/login.svelte';
    import Signup from '$lib/component/signup.svelte';

    let showLogin = true; // Menentukan komponen mana yang akan ditampilkan
</script>

<div class="h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"> <!-- Tambahkan max-w-sm dan w-full untuk responsif -->
        
        {#if showLogin}
        <Login />
        {:else}
        <Signup />
        {/if}

        <div class="mt-6 text-center"> <!-- Menambahkan margin atas -->
            <p class="text-gray-600 mb-2">Belum punya akun? Sudah Signup? </p>
            <div class="flex justify-center space-x-2"> <!-- Flex untuk menyusun tombol secara horizontal -->
                <button on:click={() => showLogin = true} class="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
                <button on:click={() => showLogin = false} class="bg-green-500 text-white px-4 py-2 rounded">Sign Up</button>
            </div>
        </div>
    </div>
</div>
