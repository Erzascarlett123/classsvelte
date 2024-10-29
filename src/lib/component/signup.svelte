<script lang="ts">
    import { createClient } from '@supabase/supabase-js';

    // Inisialisasi klien Supabase
    const supabaseUrl = "https://kvyuvciubszzmebpbsqg.supabase.co";
    const supabaseAnonKey = "your_supabase_anon_key"; // Jangan masukkan kunci di sini dalam produksi
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    let email: string = "";
    let password: string = "";
    let name: string = "";
    let classSelection: string = "";

    // Data nama siswa berdasarkan kelas
    const studentNames: Record<string, string[]> = {
        'Kelas X': [
            'Aisyahra Alieffia N. P.', 'Alifah Syifa Ramadhani', 'Aliyyah Tuhfa Khoerunnisa',
            'Alvaro Wiradanu Putra', 'Azizah Nurzakiyyah Ramdan', 'Benzema Syafiq Ramadhana',
            'Diaz Pangea Idaputra', 'Faturrahman Akhira Ramadhan', 'Garuda Mandala Putra',
            'Ghaisan Nabiel Avara', 'Hanif Abbdurrahim', 'Ishlah Eka Marhaeni Kabir',
            'Kaysan Hadrian', 'M Rizky Habibie', 'M. Haikal Azizul Haq',
            'Muhammad Bagas Resdiakmal', 'Muhammad Hafidzuddin Mahfudz', 'Muhammad Rafi',
            'Muhammad Raihan Hakim', 'Muhammad Ravka Ardiansyah', 'Muhammad Thariq Ramadhan',
            'Nabila Virsa Noveilla', 'Nahdha Faizah Rizqina Sukatman', 'Razan',
            'Salman Abdurrahman', 'Siti Dzakiyyah Putri Nadira', 'Syarip Hidayat',
        ],
        'Kelas XI': [
            'Ahmad Abdullah', 'Aiko Muhamad Sukma', 'Akbar Sholahudien',
            'Ardhana Genta A', 'Asyam Hasyid Ar Ridho Sulistyo', 'Athallah Naufal Fadillah Mustofa',
            'Atthallah Fatih Ali', 'Bayu Senjaya Putra', 'Faradisa Isykarima',
            'Fiantika Putri Khairani', 'Hanania Kamila', 'Hawa Nikma Qorina',
            'Hilal Insan Mutaqin', 'M. Ghazawan Zahran Satya', 'M. Noval Axel ramadhan',
            'Maitsaa Nur Faizah', 'Muhamad Rifky Aldiansyah', 'Muhammad Kamal Abdurahman',
            'Naziha Husna', 'Raysha Putri', 'Ronald Faiz Ulfian Saputra', 'Siti Amelia',
        ],
        'Kelas XII': [
            'Abdullah Ahmad Syauqi', 'Adzra Refa Silmeia', 'Aldino Muafa Arrafif',
            'Ali Hasan Al Atsari', 'Arika Dwi Kusuma', 'Asma Nadhirotul Ilmi',
            'Cakra Pungga Satria', 'Desi Suryani', 'Elang Kahfie Anaro',
            'Fardan Sultan Adziri', 'Fathiya Qanita Zuhdi', 'Fatimatuzzahro',
            'Fikry Zainul Akrom', 'Hanin Shafiyyurrahman', 'Harits Nur Fardansyah',
            'Hilmi Abdurrohim Susanto', 'Izza El Wasi', 'Mis al Farhan Askar',
            'Muhammad Alif Alghifari', 'Muhammad Dzaky Abqori', 'Muhammad Fikri Ramadhan',
            'Muhammad Ilham Wira Jatnika', 'Muhammad Rozan', 'Muhammad Satria Rahmatullah',
            'Najmah Afif', 'Nazwa Putriana Akilla', 'Nurhasan Rabbani Achmad',
            'Raddin Pratama Rachmat', 'Raden Galang Maulana Kahfi', 'Rafael Mahendra',
        ],
    };

    // Mengambil nama siswa berdasarkan kelas yang dipilih
    let studentOptions: string[] = []; // Tipe diatur sebagai array string

    // Fungsi untuk mengupdate opsi nama siswa saat kelas dipilih
    function updateStudentOptions() {
        studentOptions = studentNames[classSelection] || []; // Mendapatkan opsi nama siswa
        name = ""; // Reset nama saat kelas berubah
    }

    // Fungsi signup
    async function signup(event: Event) {
        event.preventDefault();
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            alert("Signup gagal: " + error.message);
        } else {
            alert("Signup berhasil, cek email untuk verifikasi.");
            // Masukkan pengguna baru ke tabel "user_murid"
            const { error: insertError } = await supabase.from('user_murid').insert({
                email: email,
                nama: name,
                kelas: classSelection
            });
            if (insertError) {
                alert("Gagal menyimpan data pengguna: " + insertError.message);
            }
        }
    }
</script>

<!-- Formulir Informasi -->
<div class="p-[10vh]"></div>
<div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-6 sm:px-8 max-w-xs sm:max-w-sm lg:max-w-lg mx-auto mt-10 py-6 flex flex-col justify-center items-center">
    <h2 class="text-lg font-bold text-center mb-4 text-gray-800 dark:text-gray-200">Mohon untuk klik Signup sekali saja.</h2>
    <h2 class="text-sm font-medium text-center text-gray-600 dark:text-gray-200">Bila sudah, maka cek Gmail masing-masing dan klik tautan yang disediakan ya :)</h2>
</div>

<!-- Formulir Signup -->
<form on:submit={signup} class="bg-white dark:bg-gray-800 shadow-lg rounded-lg py-5 px-4 sm:px-6 max-w-xs mx-auto mt-10 flex flex-col space-y-4">
    <h2 class="text-lg font-bold text-center mb-4 text-gray-800 dark:text-gray-200">Sign Up</h2>

    <!-- Email -->
    <div>
        <label class="block text-gray-700 text-sm font-semibold mb-2" for="signup-email">Email</label>
        <input
            name="signup-email"
            type="email"
            id="signup-email"
            placeholder="Enter your email"
            bind:value={email}
            class="focus:ring-2 focus:ring-blue-500 border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none"
            required
        />
    </div>

    <!-- Password -->
    <div>
        <label class="block text-gray-700 text-sm font-semibold mb-2" for="signup-password">Password</label>
        <input
            name="signup-password"
            type="password"
            id="signup-password"
            placeholder="Enter your password"
            bind:value={password}
            class="focus:ring-2 focus:ring-blue-500 border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none"
            required
        />
    </div>

    <!-- Kelas -->
    <div>
        <label class="block text-gray-700 text-sm font-semibold mb-2" for="kelas">Kelas</label>
        <select
            name="kelas"
            id="kelas"
            bind:value={classSelection}
            on:change={updateStudentOptions}
            class="focus:ring-2 focus:ring-blue-500 border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none"
            required
        >
            <option value="" disabled selected>Pilih Kelas</option>
            <option value="Kelas X">Kelas X</option>
            <option value="Kelas XI">Kelas XI</option>
            <option value="Kelas XII">Kelas XII</option>
        </select>
    </div>

    <!-- Nama (Dropdown hanya muncul setelah kelas dipilih) -->
    {#if studentOptions.length > 0}
    <div>
        <label class="block text-gray-700 text-sm font-semibold mb-2" for="nama">Nama</label>
        <select
            name="nama"
            id="nama"
            bind:value={name}
            class="focus:ring-2 focus:ring-blue-500 border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none"
            required
        >
            <option value="" disabled selected>Pilih Nama</option>
            {#each studentOptions as student}
                <option value={student}>{student}</option>
            {/each}
        </select>
    </div>
    {/if}

    <!-- Tombol Signup -->
    <button
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
        Sign Up
    </button>
</form>
