<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';

  let userEmail: string = ''; // Menyimpan email pengguna
  let selectedClass: string = '';
  let selectedName: string = '';
  let nameList: string[] = [];

  // Data siswa berdasarkan kelas
  const studentData: { [key: string]: string[] } = {
      "X": [
          "Aisyahra Alieffia N. P.", "Alifah Syifa Ramadhani", "Aliyyah Tuhfa Khoerunnisa", 
          "Alvaro Wiradanu Putra", "Azizah Nurzakiyyah Ramdan", "Benzema Syafiq Ramadhana",
          "Diaz Pangea Idaputra", "Faturrahman Akhira Ramadhan", "Garuda Mandala Putra", 
          "Ghaisan Nabiel Avara", "Hanif Abbdurrahim", "Ishlah Eka Marhaeni Kabir", "Kaysan Hadrian", 
          "M Rizky Habibie", "M. Haikal Azizul Haq", "Muhammad Bagas Resdiakmal", "Muhammad Hafidzuddin Mahfudz",
          "Muhammad Rafi", "Muhammad Raihan Hakim", "Muhammad Ravka Ardiansyah", "Muhammad Thariq Ramadhan", 
          "Nabila Virsa Noveilla", "Nahdha Faizah Rizqina Sukatman", "Razan", "Salman Abdurrahman", 
          "Siti Dzakiyyah Putri Nadira", "Syarip Hidayat"
      ],
      "XI": [
          "Ahmad Abdullah", "Aiko Muhamad Sukma", "Akbar Sholahudien", "Ardhana Genta A", 
          "Asyam Hasyid Ar Ridho Sulistyo", "Athallah Naufal Fadillah Mustofa", "Atthallah Fatih Ali", 
          "Bayu Senjaya Putra", "Faradisa Isykarima", "Fiantika Putri Khairani", "Hanania Kamila", 
          "Hawa Nikma Qorina", "Hilal Insan Mutaqin", "M. Ghazawan Zahran Satya", "M. Noval Axel Ramadhan", 
          "Maitsaa Nur Faizah", "Muhamad Rifky Aldiansyah", "Muhammad Kamal Abdurahman", "Naziha Husna", 
          "Raysha Putri", "Ronald Faiz Ulfian Saputra", "Siti Amelia"
      ],
      "XII": [
          "Abdullah Ahmad Syauqi", "Adzra Refa Silmeia", "Aldino Muafa Arrafif", "Ali Hasan Al Atsari", 
          "Arika Dwi Kusuma", "Asma Nadhirotul Ilmi", "Cakra Pungga Satria", "Desi Suryani", 
          "Elang Kahfie Anaro", "Fardan Sultan Adziri", "Fathiya Qanita Zuhdi", "Fatimah Az Zahra", 
          "Ihsan Tahdi Fath", "Nia Maulida Rahmadani", "Sidiq Adnan Musafak", "Syauqi Aghnia Rifqi"
      ]
  };

  // Mendapatkan informasi pengguna saat komponen dimuat
  onMount(async () => {
    const { data, error } = await supabase.auth.getUser();
if (data?.user) {
    userEmail = data.user.email || '';
} else if (error) {
    console.error('Error fetching user:', error);
}

  });

  // Fungsi untuk memperbarui nama siswa berdasarkan kelas yang dipilih
  const updateNameList = () => {
      nameList = studentData[selectedClass] || [];
      selectedName = ''; // Reset nama yang dipilih jika kelas berubah
  };

  // Fungsi untuk konfirmasi data dan menyimpan ke database
  const confirmData = async () => {
    if (selectedClass && selectedName) {
        const { error } = await supabase
            .from('users') // Pastikan nama tabel sesuai
            .insert([{ name: selectedName, class: selectedClass, email: userEmail }]);

        if (error) {
            console.error('Error inserting data:', error.message);
            alert(`Terjadi kesalahan saat menyimpan data: ${error.message}`);
        } else {
            alert('Data berhasil disimpan!');
        }
    } else {
        alert('Silakan pilih kelas dan nama!');
    }
};

</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-semibold mb-6 text-center">Isi Data Pribadi</h2>
      
      <!-- Menampilkan email pengguna -->
      {#if userEmail}
          <p class="text-gray-700 mb-4 text-center">Email: {userEmail}</p>
      {/if}

      <!-- Dropdown untuk memilih kelas -->
      <label class="block mb-4">
          <span class="text-gray-700">Pilih Kelas</span>
          <select bind:value={selectedClass} on:change={updateNameList} class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              <option value="" disabled>Pilih kelas</option>
              <option value="X">X</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
          </select>
      </label>

      <!-- Dropdown untuk memilih nama siswa -->
      {#if selectedClass}
          <label class="block mb-6">
              <span class="text-gray-700">Pilih Nama</span>
              <select bind:value={selectedName} class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                  <option value="" disabled>Pilih nama</option>
                  {#each nameList as name}
                      <option value={name}>{name}</option>
                  {/each}
              </select>
          </label>
      {/if}

      <button on:click={confirmData} class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200">
          Konfirmasi dan Simpan
      </button>
  </div>
</div>
