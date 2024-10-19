<form method="POST" action="?/login" class="justify-center item-center bg-white border shadow-[5px_5px_0px_black] shadow-md rounded px-8 pt-12 pb-10 mb-4 max-w-sm sm:max-w-md lg:max-w-lg mx-auto mt-20">
	<h2 class="text-2xl font-bold text-center mb-6 text-gray-700">Login</h2>
	
	<!-- Email -->
	<div class="mb-4">
	  <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
		Email
	  </label>
	  <input
		name="email"
		type="email"
		id="email"
		placeholder="Enter your email"
		class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
		required
	  />
	</div>
	
	<!-- Password -->
	<div class="mb-6">
	  <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
		Password
	  </label>
	  <input
		name="password"
		type="password"
		id="password"
		placeholder="Enter your password"
		class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
		required
	  />
	</div>
	
	<!-- Buttons -->
	<div class="flex items-center justify-between">
	  <button
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
		type="submit"
	  >
		Login
	  </button>
	  <button
		formaction="?/signup"
		class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
	  >
		Sign up
	  </button>
	</div>
	
	<!-- Forgot Password Link -->
	<p class="text-sm text-center text-gray-500 mt-4">
	  <a href="#" class="text-blue-500 hover:underline">Forgot your password?</a>
	</p>
  </form>
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  