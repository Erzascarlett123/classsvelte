<script lang="ts">
    import { userName, userClass } from '../../stores/user'; // Import store
    import { goto } from '$app/navigation';

    let name = '';
    let selectedClass = '';
    let showNamesDropdown = false; // Mengontrol tampilan dropdown nama

    const classes = ['Kelas X', 'Kelas XI', 'Kelas XII']; // Deklarasikan classes

    const students: { [key: string]: string[] } = { // Berikan tipe pada students
        'Kelas X': [
            'Aisyahra Alieffia N. P.',
            'Alifah Syifa Ramadhani',
            'Aliyyah Tuhfa Khoerunnisa',
            'Alvaro Wiradanu Putra',
            'Azizah Nurzakiyyah Ramdan',
            'Benzema Syafiq Ramadhana',
            'Diaz Pangea Idaputra',
            'Faturrahman Akhira Ramadhan',
            'Garuda Mandala Putra',
            'Ghaisan Nabiel Avara',
            'Hanif Abbdurrahim',
            'Ishlah Eka Marhaeni Kabir',
            'Kaysan Hadrian',
            'M Rizky Habibie',
            'M. Haikal Azizul Haq',
            'Muhammad Bagas Resdiakmal',
            'Muhammad Hafidzuddin Mahfudz',
            'Muhammad Rafi',
            'Muhammad Raihan Hakim',
            'Muhammad Ravka Ardiansyah',
            'Muhammad Thariq Ramadhan',
            'Nabila Virsa Noveilla',
            'Nahdha Faizah Rizqina Sukatman',
            'Razan',
            'Salman Abdurrahman',
            'Siti Dzakiyyah Putri Nadira',
            'Syarip Hidayat',
        ],
        'Kelas XI': [
            'Ahmad Abdullah',
            'Aiko Muhamad Sukma',
            'Akbar Sholahudien',
            'Ardhana Genta A',
            'Asyam Hasyid Ar Ridho Sulistyo',
            'Athallah Naufal Fadillah Mustofa',
            'Atthallah Fatih Ali',
            'Bayu Senjaya Putra',
            'Faradisa Isykarima',
            'Fiantika Putri Khairani',
            'Hanania Kamila',
            'Hawa Nikma Qorina',
            'Hilal Insan Mutaqin',
            'M. Ghazawan Zahran Satya',
            'M. Noval Axel ramadhan',
            'Maitsaa Nur Faizah',
            'Muhamad Rifky Aldiansyah',
            'Muhammad Kamal Abdurahman',
            'Naziha Husna',
            'Raysha Putri',
            'Ronald Faiz Ulfian Saputra',
            'Siti Amelia',
        ],
        'Kelas XII': [
            'Abdullah Ahmad Syauqi',
            'Adzra Refa Silmeia',
            'Aldino Muafa Arrafif',
            'Ali Hasan Al Atsari',
            'Arika Dwi Kusuma',
            'Asma Nadhirotul Ilmi',
            'Cakra Pungga Satria',
            'Desi Suryani',
            'Elang Kahfie Anaro',
            'Fardan Sultan Adziri',
            'Fathiya Qanita Zuhdi',
            'Fatimatuzzahro',
            'Fikry Zainul Akrom',
            'Hanin Shafiyyurrahman',
            'Harits Nur Fardansyah',
            'Hilmi Abdurrohim Susanto',
            'Izza El Wasi',
            'Mis al Farhan Askar',
            'Muhammad Alif Alghifari',
            'Muhammad Dzaky Abqori',
            'Muhammad Fikri Ramadhan',
            'Muhammad Ilham Wira Jatnika',
            'Muhammad Rozan',
            'Muhammad Satria Rahmatullah',
            'Najmah Afif',
            'Nazwa Putriana Akilla',
            'Nurhasan Rabbani Achmad',
            'Raddin Pratama Rachmat',
            'Raden Galang Maulana Kahfi',
            'Rafael Mahendra',
        ],
    };

    function handleClassChange() {
        showNamesDropdown = true; // Tampilkan dropdown nama ketika kelas dipilih
        name = ''; // Reset nama
    }

    function handleSubmit() {
        if (name && selectedClass) {
            userName.set(name); // Update store dengan nama
            userClass.set(selectedClass); // Update store dengan kelas
            goto('/private/dashboard murid'); // Arahkan ke halaman berikutnya
        } else {
            alert('Mohon isi semua field');
        }
    }
</script>

<main class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center mb-6">Isi Form</h1>
        
        <form on:submit|preventDefault={handleSubmit}>

            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="class">Kelas</label>
                <select
                    id="class"
                    bind:value={selectedClass}
                    on:change={handleClassChange}
                    class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    required
                >
                    <option value="" disabled>Pilih kelas</option>
                    {#each classes as kelas} 
                        <option value={kelas}>{kelas}</option>
                    {/each}
                </select>
            </div>

            {#if showNamesDropdown}
                <div class="mb-6 transition-all duration-500 ease-in-out">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="student">Nama Murid</label>
                    <select
                        id="student"
                        bind:value={name}
                        class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="" disabled>Pilih nama lo </option>
                        {#each students[selectedClass] as student} 
                            <option value={student}>{student}</option>
                        {/each}
                    </select>
                </div>
            {/if}

            <div class="flex items-center justify-between">
                <button
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </div>
        </form>
    </div>
</main>
