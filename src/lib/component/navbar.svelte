<script lang="ts">
  import { userName, userClass } from '../../stores/user'; // Import store
  import { goto } from '$app/navigation';

  let name = '';
  let kelas = '';
  let isOpen = false; // State untuk menu dropdown

  // Subscribe ke store untuk mendapatkan nilai terbaru
  userName.subscribe(value => name = value);
  userClass.subscribe(value => kelas = value);

  function toggleMenu() {
    isOpen = !isOpen; // Toggle status menu dropdown
  }
</script>

<nav class="bg-blue-700 text-white shadow-lg py-4 px-4 md:px-8">
  <div class="container mx-auto flex justify-between items-center flex-wrap">
    <div class="text-2xl font-bold">Mba Icha Class</div>
    <div class="flex items-center md:hidden">
      <button on:click={toggleMenu} class="text-white focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
      </button>
    </div>
    <div class="hidden md:flex items-center">
      <div class="mr-4">Nama Murid: {name} | Kelas: {kelas}</div>
      <button class="bg-red-500 hover:bg-red-700 transition-colors px-4 py-2 rounded-md" on:click={() => goto('/auth')}>Logout</button>
    </div>
  </div>

  {#if isOpen}
  <div class="md:hidden">
    <div class="flex flex-col mt-2">
      <div class="p-2">Nama Murid: {name} | Kelas: {kelas}</div>
      <button class="bg-red-500 hover:bg-red-700 transition-colors px-4 py-2 rounded-md mb-2" on:click={() => goto('/auth')}>Logout</button>
    </div>
  </div>
  {/if}
</nav>
