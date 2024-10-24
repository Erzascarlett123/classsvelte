<script lang="ts">
    import { navigate } from 'svelte-routing'; // atau metode navigasi lainnya

const guruEmails = ['satriaseptian724@gmail.com', 'guru2@gmail.com']; // Ganti dengan email guru yang diizinkan
let email = '';

function handleLogin() {
    if (guruEmails.includes(email)) {
        navigate('/private/dashboard%20guru'); // Redirect ke halaman dashboard guru
    } else {
        navigate('/private/dashboard%20murid'); // Redirect ke halaman dashboard murid
    }
}
</script>

<header>
  <nav>
    <a href="/"></a>
  </nav>
</header>
<slot />