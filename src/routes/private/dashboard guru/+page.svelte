<script lang="ts">
	import Guru from '$lib/component/guru.svelte';
    // Definisikan tipe murid
    interface Student {
      name: string;
      submissionDate: string;
      assignment: string;
      status: string;
    }
  
    // Definisikan tipe kelas
    interface ClassData {
      [key: string]: Student[];
    }
  
    // Data kelas dan murid
    let classes: ClassData = {
      'X': [
        { name: 'Reza', submissionDate: '2024-10-10', assignment: 'Tugas Matematika', status: 'Sudah Dikerjakan' },
        { name: 'Siti', submissionDate: '2024-10-09', assignment: 'Tugas IPA', status: 'Belum Dikerjakan' },
      ],
      'XI': [
        { name: 'Budi', submissionDate: '2024-10-12', assignment: 'Tugas Sejarah', status: 'Sudah Dikerjakan' },
        { name: 'Dina', submissionDate: '2024-10-15', assignment: 'Tugas Bahasa Inggris', status: 'Belum Dikerjakan' },
      ],
      'XII': [
        { name: 'Andi', submissionDate: '2024-10-05', assignment: 'Tugas Fisika', status: 'Sudah Dikerjakan' },
        { name: 'Siti', submissionDate: '2024-10-06', assignment: 'Tugas Kimia', status: 'Belum Dikerjakan' },
      ],
    };
  
    // Tipe untuk kelas yang dipilih
    let selectedClass: keyof ClassData = 'X'; // Kelas yang dipilih
    let students: Student[] = classes[selectedClass]; // Murid berdasarkan kelas yang dipilih
  
    function handleClassChange(event: Event) {
      const target = event.target as HTMLSelectElement;
      selectedClass = target.value as keyof ClassData; // Mengatur tipe ke kelas yang valid
      students = classes[selectedClass]; // Perbarui daftar murid sesuai kelas yang dipilih
    }
  </script>
  <Guru />
  
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
    <!-- Pilihan Kelas -->
    <h2 class="text-3xl font-bold mb-[9vh] text-center">Pilih Kelas</h2>
    <div class="mb-[6vh]">
      <select on:change={handleClassChange} class="p-2 border border-gray-300 rounded-md">
        <option value="X">Kelas X</option>
        <option value="XI">Kelas XI</option>
        <option value="XII">Kelas XII</option>
      </select>
    </div>
  
    <!-- Tabel Murid -->
    <h2 class="text-3xl font-bold mb-[2vh] text-center">Daftar Murid Kelas {selectedClass}</h2>
    <div class="overflow-x-auto w-full max-w-4xl p-6 rounded-lg shadow-lg bg-white mt-4">
      <table class="min-w-full bg-white mb-[8vh] border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr class="bg-gray-200">
            <th class="py-3 px-4 text-left">Nama Murid</th>
            <th class="py-3 px-4 text-left">Tanggal Pengumpulan</th>
            <th class="py-3 px-4 text-left">Tugas</th>
            <th class="py-3 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {#each students as student}
            <tr class="border-t border-gray-200 hover:bg-gray-50 transition-colors">
              <td class="py-3 px-4">{student.name}</td>
              <td class="py-3 px-4">{student.submissionDate}</td>
              <td class="py-3 px-4">{student.assignment}</td>
              <td class="py-3 px-4">
                {#if student.status === 'Sudah Dikerjakan'}
                  <span class="text-green-500">✔ {student.status}</span>
                {:else}
                  <span class="text-red-500">✘ {student.status}</span>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  