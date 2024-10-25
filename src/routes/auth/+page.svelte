<script>
    let isDarkMode = false;

    function toggleTheme() {
        isDarkMode = !isDarkMode;
        const htmlElement = document.documentElement;

        if (isDarkMode) {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    }
</script>
<style>
    /* Tambahkan CSS untuk transisi */
    .transition-all {
        transition: all 0.3s ease;
    }
</style>

<div class={`h-screen  ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-all duration-300`}>
	<!-- Theme Toggle Button -->
	<button 
		class="fixed right-4 bg-gray-200 dark:bg-gray-800 p-2 rounded-full shadow-md"
		on:click={toggleTheme}
	>
		<span class="text-gray-800 dark:text-gray-200">
			{isDarkMode ? 'Light Mode' : 'Dark Mode'}
		</span>
	</button>
    <form class="justify-center items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg px-6 sm:px-8 max-w-xs sm:max-w-sm lg:max-w-lg mx-auto mt-10 py-6">
        <h2 class="text-lg font-bold text-center mb-4 text-gray-800 dark:text-gray-200">Mohon untuk klik Signup sekali saja.</h2>
        <h2 class="text-sm font-medium text-center text-gray-600 dark:text-gray-200">Bila sudah, maka cek Gmail masing-masing dan klik tautan yang disediakan ya :)</h2>
    </form>

    <form method="POST" action="?/login" class="justify-center items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg py-5 px-6 sm:px-8 max-w-xs sm:max-w-sm lg:max-w-lg mx-auto mt-10 sm:mt-20">
        <h2 class="text-lg font-bold text-center mb-4 sm:mb-6 text-gray-800 dark:text-gray-200">Login</h2>
        
        <!-- Email -->
        <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2" for="email">Email</label>
            <input
                name="email"
                type="email"
                id="email"
                placeholder="Enter your email"
                class="focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md border rounded w-full py-2 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none"
                required
            />
        </div>
        
        <!-- Password -->
        <div class="mb-6">
            <label class="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2" for="password">Password</label>
            <input
                name="password"
                type="password"
                id="password"
                placeholder="Enter your password"
                class="focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 mb-3 leading-tight focus:outline-none"
                required
            />
        </div>
        
        <!-- Buttons -->
        <div class="flex items-center justify-between mt-4">
            <button
                class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="submit"
            >
                Login
            </button>
            <button
                formaction="?/signup"
                class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                Sign up
            </button>
        </div>
    </form>
</div>


