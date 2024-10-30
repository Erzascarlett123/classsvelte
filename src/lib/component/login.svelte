<div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form method="POST" action="?/login" class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition transform hover:scale-105 duration-300">
        <h2 class="text-3xl font-bold mb-6 text-center text-blue-600">Login</h2>
        
        <label class="block mb-4">
            <span class="text-gray-700">Email</span>
            <input name="email" type="email" required class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" placeholder="Enter your email" />
        </label>

        <label class="block mb-6">
            <span class="text-gray-700">Password</span>
            <input name="password" type="password" required class="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" placeholder="Enter your password" />
        </label>

        <div class="flex flex-col sm:flex-row justify-between items-center">
            <button type="submit" class="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 mb-2 sm:mb-0">Login</button>
        </div>

    </form>
</div>
