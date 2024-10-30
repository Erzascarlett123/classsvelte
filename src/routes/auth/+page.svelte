<script>
    import Login from '$lib/component/login.svelte';

    let showLogin = true; // Menentukan komponen mana yang akan ditampilkan
</script>

        
        {#if showLogin}
        <Login />
        {/if}

