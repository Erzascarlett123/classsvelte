<script lang="ts">
    function redirectToLogin() {
      window.location.href = '/auth';
    }
  </script>
  
  <form class="justify-center items-center bg-white border shadow-[6px_6px_0px_black] rounded px-8 pt-12 pb-10 mb-4 max-w-sm sm:max-w-md lg:max-w-lg mx-auto mt-20">
    <h2 class="text-2xl font-bold text-center mb-6 text-gray-700">Maaf, Login error.</h2>
    <h2 class="text-2xl font-bold text-center mb-6 text-gray-700">Tolong periksa lagi atau Signup terlebih dahulu.</h2>
  
    <button
      on:click={redirectToLogin}
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 shadow-[5px_5px_0px_black] rounded focus:outline-none focus:shadow-outline flex justify-center items-center w-full"
      type="button"
    >
      Kembali ke halaman Login
    </button>
  </form>
  