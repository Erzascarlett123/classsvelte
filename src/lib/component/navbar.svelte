
<script lang="ts">
  import { userName, userClass } from '../../stores/user'; // Import store
  import { goto } from '$app/navigation';

  let name = '';
  let kelas = '';

  // Subscribe ke store untuk mendapatkan nilai terbaru
  userName.subscribe(value => name = value);
  userClass.subscribe(value => kelas = value);
</script>

<nav class="bg-blue-700 text-white shadow-lg py-4 px-8">
    <div class="container mx-auto flex justify-between items-center justify-center">
      <div class="text-2xl font-bold">Mba Icha Class</div>
      <div>Nama Murid: {name} | Class: {kelas}</div> <!-- Tampilkan nama dan kelas -->
      <button class="bg-red-500 hover:bg-red-700 transition-colors px-4 py-2 rounded-md" on:click={() => goto('/auth')}>Logout</button>
    </div>
</nav>
