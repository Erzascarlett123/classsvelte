<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';
  import Guru from '$lib/component/guru.svelte';

  let taskTitle = '';
  let taskDescription = '';
  let dueDate = '';
  let selectedClass = '';
  let file: File | null = null;
  let classes = [
    { id: 'X', name: 'Kelas X' },
    { id: 'XI', name: 'Kelas XI' },
    { id: 'XII', name: 'Kelas XII' },
  ];

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      file = input.files[0];
      console.log('Selected file:', file); // Log file untuk verifikasi
    }
  };

  const uploadFile = async (file: File) => {
    // Mengupload file ke bucket
    const { data, error } = await supabase.storage
      .from('assignments') // Pastikan nama bucket benar
      .upload(`attachments/${file.name}`, file);

    // Jika terjadi error saat upload
    if (error) {
      console.error('Error uploading file:', error.message); // Tampilkan pesan kesalahan
      alert(`Gagal meng-upload file: ${error.message}`); // Beri tahu pengguna
      return null;
    }

    // Mendapatkan URL file setelah upload
    const { data: urlData } = await supabase.storage
      .from('assignments')
      .getPublicUrl(data.path); // Mengambil URL publik

    return urlData.publicUrl; // Kembalikan URL publik
  };

  const handleSubmit = async (event: Event) => {
    event.preventDefault();

    let attachmentUrl = null;
    if (file) {
      attachmentUrl = await uploadFile(file);
      if (!attachmentUrl) {
        alert('Gagal meng-upload file. Silakan coba lagi.');
        return;
      }
    }

    // Menyimpan data tugas ke database
    const { error } = await supabase.from('assignments').insert([
      {
        title: taskTitle,
        description: taskDescription,
        due_date: dueDate,
        class_id: selectedClass,
        attachment_url: attachmentUrl, // Simpan URL jika ada
      }
    ]);

    if (error) {
      alert(`Error: ${error.message}`);
      console.error('Error submitting assignment:', error);
    } else {
      alert('Tugas berhasil dikirim!');
      await goto('/private/dashboard/guru'); // Pindah ke halaman dashboard guru setelah berhasil
    }
  };
</script>

<Guru />
<main class="max-w-md mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Buat Tugas Baru</h1>
  <form on:submit={handleSubmit} class="space-y-4">
    <div>
      <label for="task-title" class="block text-sm font-medium text-gray-700">Judul Tugas</label>
      <input id="task-title" type="text" bind:value={taskTitle} required class="w-full p-2 border border-gray-300 rounded-md" />
    </div>

    <div>
      <label for="task-description" class="block text-sm font-medium text-gray-700">Deskripsi Tugas</label>
      <textarea id="task-description" bind:value={taskDescription} class="w-full p-2 border border-gray-300 rounded-md" required></textarea>
    </div>

    <div>
      <label for="due-date" class="block text-sm font-medium text-gray-700">Tanggal Jatuh Tempo</label>
      <input id="due-date" type="date" bind:value={dueDate} required class="w-full p-2 border border-gray-300 rounded-md" />
    </div>

    <div>
      <label for="class-select" class="block text-sm font-medium text-gray-700">Kelas</label>
      <select id="class-select" bind:value={selectedClass} class="w-full p-2 border border-gray-300 rounded-md" required>
        <option value="" disabled selected>Pilih Kelas</option>
        {#each classes as cls}
          <option value={cls.id}>{cls.name}</option>
        {/each}
      </select>
    </div>

    <div>
      <label for="file-upload" class="block text-sm font-medium text-gray-700">Lampiran (Opsional)</label>
      <input id="file-upload" type="file" accept="application/pdf, image/*, video/*" on:change={handleFileChange} class="w-full border border-gray-300 rounded-md" />
    </div>

    <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Kirim Tugas</button>
  </form>
</main>
