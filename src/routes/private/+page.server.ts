// src/routes/your-path/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase }, params }) => {
  const selectedClass = params.class || 'X, XI, XII'; // Anda bisa mendapatkan kelas dari URL jika perlu
  let students = [];

  try {
    const { data, error } = await supabase
      .from('submissions')
      .select('*, students(name)')
      .eq('class', selectedClass);

    if (error) {
      console.error('Error fetching students:', error.message);
    } else {
      students = data.map((submission: any) => ({
        name: submission.students.name,
        submissionDate: submission.submitted_at,
        assignment: submission.assignment.title, // Sesuaikan jika ada relasi dengan tugas
        status: submission.status,
      }));
    }
  } catch (error) {
    console.error('Error loading students:', error);
  }

  return { students };
};
