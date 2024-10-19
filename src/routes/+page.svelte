<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation'; 
  
    let showButton = false;
    let showLogo = false; 

  
    onMount(() => {
        setTimeout(() => {
            showButton = true;
        }, 1000); // 
  
        setTimeout(() => {
            showLogo = true;
        }, 500); 
    });
    
  
    function navigateToDashboard() {
        goto('/private'); 
    }
  </script>
  
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-4xl font-bold text-gray-800 transition-opacity duration-500 delay-300 opacity-0 {showButton ? 'opacity-100 translate-y-0' : 'translate-y-8'}">Welcome To Tuaide Class!</h1>
    
    <img 
        src="/images/logo.png" 
        alt="Logo" 
        class={`w-40 mt-5 transition-transform duration-300 hover:scale-105 border border-2 shadow-[6px_6px_0px_black] 
                opacity-0 transform ${showLogo ? 'opacity-100 translate-y-0' : 'translate-y-8'}`}
        style="transition: opacity 1s ease, transform 0.2s ease 0.1s;"
    />
    
    <button 
        class={`mt-8 py-2 px-6 text-white font-semibold rounded-md transition-all hover:scale-110 duration-300 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} bg-blue-600 hover:bg-blue-700 flex items-center`} 
        on:click={navigateToDashboard}
    >
        Let's Go
        <span class="ml-2 transition-transform duration-300 transform hover:translate-x-1">→</span>
    </button>
  </div>
