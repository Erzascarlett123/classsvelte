<script lang="ts">
    import { goto } from '$app/navigation'; // Pastikan untuk menggunakan ini jika menggunakan routing

    // Logic dan data untuk pengiriman tugas
    let taskTitle: string = '';
    let taskDescription: string = '';
    let dueDate: string = '';
    let file: File | null = null; // Tipe untuk file ditentukan
    let selectedClass: string = ''; // Untuk menyimpan pilihan kelas
  
    const handleFileChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            file = target.files[0]; // Mengambil file jika ada
        } else {
            file = null; // Reset file jika tidak ada
        }
    };
  
    const handleSubmit = (event: Event) => {
        event.preventDefault();
        // Logic untuk mengirim data tugas, misalnya ke API atau state management
        console.log("Judul Tugas:", taskTitle);
        console.log("Deskripsi Tugas:", taskDescription);
        console.log("Tanggal Jatuh Tempo:", dueDate);
        console.log("File:", file);
        console.log("Kelas yang Dipilih:", selectedClass); // Menampilkan kelas yang dipilih
    };
  </script>
  
  <nav class="bg-blue-700 text-white shadow-lg py-4 px-8">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-2xl font-bold">Mba Icha Class</div>
      <div class="flex items-center">
        <button 
          class="bg-blue-500 hover:bg-blue-600 transition-colors mr-5 px-4 py-2 rounded-md" 
          on:click={() => goto('/private/dashboard guru/Send')}>
          Kirim Tugas
        </button>

        <button 
        class="bg-blue-500 hover:bg-blue-600 transition-colors mr-5 px-4 py-2 rounded-md" 
        on:click={() => goto('/private/dashboard guru')}>
        Dashboard
      </button>

        <button class="bg-red-500 hover:bg-red-700 transition-colors px-4 py-2 rounded-md"   on:click={() => goto('/auth')}>Logout</button>
      </div>
    </div>
  </nav>

  <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
    <h2 class="text-3xl font-bold mb-6">Pengiriman Tugas ke Murid</h2>
    <form on:submit={handleSubmit} class="w-full max-w-md lg:max-w-lg mt-2 p-6 bg-white shadow-lg border rounded-lg">
        <div>
            <label for="task-title" class="block text-sm font-medium text-gray-700">Judul Tugas</label>
            <input type="text" id="task-title" bind:value={taskTitle} class="w-full p-3 border border-gray-300 rounded-lg" required>
        </div>
        <div>
            <label for="task-description" class="block text-sm font-medium text-gray-700">Deskripsi Tugas</label>
            <textarea id="task-description" bind:value={taskDescription} class="w-full p-3 border border-gray-300 rounded-lg" required></textarea>
        </div>
        <div>
            <label for="due-date" class="block text-sm font-medium text-gray-700">Tanggal Jatuh Tempo</label>
            <input type="date" id="due-date" bind:value={dueDate} class="w-full p-3 border border-gray-300 rounded-lg" required>
        </div>
        <div>
            <label for="class-select" class="block text-sm font-medium text-gray-700">Kelas</label>
            <select id="class-select" bind:value={selectedClass} class="w-full p-3 border border-gray-300 rounded-lg" required>
                <option value="" disabled selected>Pilih Kelas</option>
                <option value="X">Kelas X</option>
                <option value="XII">Kelas XII</option>
                <option value="XIII">Kelas XIII</option>
            </select>
        </div>
        <div>
            <label for="task-file" class="block text-sm font-medium text-gray-700">File (Opsional)</label>
            <input 
                type="file" 
                id="task-file" 
                accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png" 
                on:change={handleFileChange} 
                class="w-full p-3 border border-gray-300 rounded-lg" 
            />
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-3 mt-5 rounded-lg hover:bg-blue-600">
            Kirim Tugas
        </button>
    </form>
  </div>
  