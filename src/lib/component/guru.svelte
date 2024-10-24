<script lang="ts">
  import { goto } from '$app/navigation'; // Pastikan untuk menggunakan ini jika menggunakan routing
  import { Send, LayoutDashboard, LogOut, Menu, X } from 'lucide-svelte'; // Import ikon

  let isSidebarOpen = false;

  const toggleSidebar = () => {
    isSidebarOpen = !isSidebarOpen;
  };
</script>

<nav class="bg-blue-700 text-white shadow-lg p-8 w-screen">
  <div class="container mx-auto flex justify-between items-center">
    <div class="md:hidden">
      <button 
        class="bg-blue-500 hover:bg-blue-600 transition-colors mr-5 px-4 py-2 rounded-md" 
        on:click={() => goto('/private/dashboard guru')}>
        Dashboard
      </button>

      <button class="bg-red-500 hover:bg-red-700 transition-colors px-4 py-2 rounded-md" 
        on:click={() => goto('/auth')}>
        Logout
      </button>
    </div>
  </div>
</nav>

<!-- Sidebar -->
<div class={`fixed top-0 right-0 h-full bg-blue-700 text-white shadow-xl
      transform transition-transform duration-300 ease-in-out z-40
      w-64 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
  <div class="flex justify-between items-center p-4 border-b border-blue-600">
    <div class="text-xl font-bold">Mba Icha Class</div>
    <button
      on:click={toggleSidebar}
      class="p-2 hover:bg-blue-600 rounded-lg transition-colors md:hidden"
    >
      <X class="h-6 w-6" />
    </button>
  </div>

  <div class="flex flex-col p-4 space-y-4">
    <button 
      on:click={() => goto('/private/dashboard guru/Send')}
      class="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 transition-colors px-4 py-3 rounded-lg w-full text-left group">
      <Send class="h-5 w-5 group-hover:scale-110 transition-transform" />
      <span>Kirim Tugas</span>
    </button>

    <button 
      on:click={() => goto('/private/dashboard guru')}
      class="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 transition-colors px-4 py-3 rounded-lg w-full text-left group">
      <LayoutDashboard class="h-5 w-5 group-hover:scale-110 transition-transform" />
      <span>Dashboard</span>
    </button>

    <button 
      on:click={() => goto('/auth')}
      class="flex items-center space-x-2 bg-red-500 hover:bg-red-600 transition-colors px-4 py-3 rounded-lg w-full text-left group mt-auto">
      <LogOut class="h-5 w-5 group-hover:scale-110 transition-transform" />
      <span>Logout</span>
    </button>
  </div>
</div>

