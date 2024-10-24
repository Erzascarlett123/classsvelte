<script lang="ts">
  import Navbar from "$lib/component/navbar.svelte";
  import { supabase } from "$lib/supabaseClient"; // pastikan Supabase diinisialisasi di supabaseClient.ts
  import { onMount } from "svelte";

  // Variable untuk menyimpan data tugas
  let assignments: any[] = [];
  let studentName: string = '';
  let studentClass: string = '';
  let taskFile: File | null = null;
  let submissionDate: string = '';

  async function handleFileUpload(): Promise<string | null> {
    if (!taskFile) return null;

    const fileName = `${Date.now()}_${taskFile.name}`;
    const { data, error } = await supabase.storage
      .from('submissions') // Pastikan 'submissions' ini adalah bucket storage yang Anda buat di Supabase
      .upload(fileName, taskFile);

    if (error) {
      console.error("Error uploading file:", error.message);
      return null;
    }

    // Mendapatkan URL publik dari file yang telah di-upload
    const { data: publicUrlData } = supabase.storage
      .from('submissions')
      .getPublicUrl(fileName);

    // Mengembalikan URL publik
    return publicUrlData?.publicUrl || null;
  }

  async function submitTask() {
    if (!studentName || !studentClass || !taskFile || !submissionDate) {
      alert('Mohon lengkapi semua bidang');
      return;
    }

    // Upload file ke Supabase Storage
    const fileUrl = await handleFileUpload();

    if (!fileUrl) {
      alert('Gagal mengupload file');
      return;
    }

    // Menyimpan data tugas ke tabel Supabase
    const { error } = await supabase
      .from('submissions') // Pastikan tabel 'submissions' ada di Supabase
      .insert({
        student_name: studentName,
        class: studentClass,
        file_url: fileUrl,
        submission_date: submissionDate,
        status: 'Belum Dinilai',
      });

    if (error) {
      console.error("Error submitting task:", error.message);
      alert('Gagal mengirim tugas');
    } else {
      alert('Tugas berhasil dikirim');
      // Reset form setelah submit berhasil
      studentName = '';
      studentClass = '';
      taskFile = null;
      submissionDate = '';
    }
  }

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      taskFile = input.files[0];
    }
  }

  // Fungsi untuk mengambil tugas dari Supabase
  async function fetchAssignments() {
    const { data, error } = await supabase
      .from('assignments') // Nama tabel 'assignments' disesuaikan dengan nama tabel Anda di Supabase
      .select('*'); // Pilih semua kolom atau Anda bisa sesuaikan dengan kolom tertentu

    if (error) {
      console.error("Error fetching assignments:", error);
    } else {
      assignments = data || [];
    }
  }

  // Ambil data tugas saat halaman dimuat
  onMount(() => {
    fetchAssignments();
  });

  function viewFile(file: string) {
    window.open(file, '_blank');
  }

  function downloadFile(file: string) {
    const link = document.createElement('a');
    link.href = file;
    link.download = ''; // Nama file bisa diisi jika ada
    link.click();
  }
</script>

<Navbar />

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
          <th class="py-3 px-4 text-left">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {#if assignments.length > 0}
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
              <td class="py-3 px-4">
                <button on:click={() => viewFile(assignment.file)} class="text-blue-500 hover:underline">Lihat</button>
                <button on:click={() => downloadFile(assignment.file)} class="ml-4 text-blue-500 hover:underline">Unduh</button>
              </td>
            </tr>
          {/each}
        {:else}
          <tr>
            <td colspan="4" class="py-3 px-4 text-center">Belum ada tugas bre !</td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>

<div class="w-full max-w-md mx-auto lg:max-w-lg mt-10 p-6 bg-white shadow-lg border rounded-lg shadow-[6px_6px_2px_black]">
  <h3 class="text-2xl font-semibold text-center text-gray-700 mb-6">Kirim Tugas</h3>
  <form on:submit|preventDefault={submitTask} class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Nama</label>
      <input type="text" id="name" bind:value={studentName} class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Ketik nama anda" required>
    </div>
    <div>
      <label for="class" class="block text-sm font-medium text-gray-700">Kelas</label>
      <input type="text" id="class" bind:value={studentClass} required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Kelas Anda">
    </div>
    <div>
      <label for="task-file" class="block text-sm font-medium text-gray-700">Upload File</label>
      <input type="file" id="task-file" on:change={handleFileChange} required class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
    </div>
    <div>
      <label for="submission-date" class="block text-sm font-medium text-gray-700">Tanggal Pengumpulan</label>
      <input type="date" id="submission-date" bind:value={submissionDate} required class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
    </div>
    <button type="submit" class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
      Kirim
    </button>
  </form>
</div>
