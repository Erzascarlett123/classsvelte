<script lang="ts">
    let assignments = [
      { name: 'Tugas Matematika', deadline: '2024-10-20', status: 'Belum Dikerjakan' },
      { name: 'Tugas IPA', deadline: '2024-10-22', status: 'Sudah Dikerjakan' },
    ];
  
    let submissions = [
      { name: 'Tugas Sejarah', submittedDate: '2024-10-10', status: 'Dinilai', grade: 'A' },
      { name: 'Tugas Bahasa Inggris', submittedDate: '2024-10-05', status: 'Belum Dinilai', grade: '-' },
    ];
  </script>
  
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
    <!-- Daftar Tugas -->
    <h2 class="text-3xl font-bold mb-6 text-center">Daftar Tugas</h2>
  
    <div class="overflow-x-auto w-full max-w-4xl p-6 rounded-lg shadow-lg bg-white mt-4">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr class="bg-gray-200">
            <th class="py-3 px-4 text-left">Nama Tugas</th>
            <th class="py-3 px-4 text-left">Tanggal Pengumpulan</th>
            <th class="py-3 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {#each assignments as assignment}
            <tr class="border-t border-gray-200 hover:bg-gray-50 transition-colors">
              <td class="py-3 px-4">{assignment.name}</td>
              <td class="py-3 px-4">{assignment.deadline}</td>
              <td class="py-3 px-4">
                {#if assignment.status === 'Sudah Dikerjakan'}
                  <span class="text-green-500">✔ {assignment.status}</span>
                {:else}
                  <span class="text-red-500">✘ {assignment.status}</span>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  
    <!-- Form untuk Mengirimkan Tugas -->
    <div class="w-full max-w-md lg:max-w-lg mt-10 p-6 bg-white shadow-lg border rounded-lg shadow-[6px_6px_2px_black]">
      <h3 class="text-2xl font-semibold text-center text-gray-700 mb-6">Kirim Tugas</h3>
      <form action="/submit-task" method="POST" enctype="multipart/form-data" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nama</label>
          <input type="text" id="name" name="name" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Ketik nama anda" required>
        </div>
        <div>
          <label for="task-title" class="block text-sm font-medium text-gray-700">Kelas</label>
          <input type="text" id="task-title" name="task-title" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kelas Anda">
        </div>
        <div>
          <label for="task-file" class="block text-sm font-medium text-gray-700">Upload File</label>
          <input type="file" id="task-file" name="task-file" required class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <div>
          <label for="submission-date" class="block text-sm font-medium text-gray-700">Tanggal Pengumpulan</label>
          <input type="date" id="submission-date" name="submission-date" required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Kirim
        </button>
      </form>
    </div>
  </div>