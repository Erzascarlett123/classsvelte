// src/routes/api/assignments.ts
import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

interface Assignment {
  id: string;
  title: string;
  description: string;
  due_date: string;
  class_id: string;
  teacher_id: string;
  subject_id: string;
  created_at: string;
  attachment_url?: string;
}

interface AssignmentPayload {
  title: string;
  description: string;
  dueDate: string;
  classId: string;
  subjectId: string;
  attachmentUrl?: string;
}

// POST: Membuat tugas baru (untuk guru)
export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    // Dapatkan session user (guru)
    const session = locals.session;
    if (!session) {
      throw error(401, 'Unauthorized: Silakan login terlebih dahulu');
    }

    // Verifikasi bahwa user adalah guru
    const { data: teacherData, error: teacherError } = await supabase
      .from('teachers')
      .select('id')
      .eq('user_id', session.user.id)
      .single();

    if (teacherError || !teacherData) {
      throw error(403, 'Forbidden: Hanya guru yang dapat membuat tugas');
    }

    const body = await request.json() as AssignmentPayload;

    // Validasi input
    if (!body.title?.trim()) throw error(400, 'Judul tugas wajib diisi');
    if (!body.classId?.trim()) throw error(400, 'Kelas wajib dipilih');
    if (!body.dueDate?.trim()) throw error(400, 'Tanggal deadline wajib diisi');
    if (!body.subjectId?.trim()) throw error(400, 'Mata pelajaran wajib dipilih');

    // Insert tugas ke database
    const { data: assignment, error: insertError } = await supabase
      .from('assignments')
      .insert({
        title: body.title,
        description: body.description,
        due_date: body.dueDate,
        class_id: body.classId,
        teacher_id: teacherData.id,
        subject_id: body.subjectId,
        attachment_url: body.attachmentUrl,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting assignment:', insertError);
      throw error(500, 'Gagal menyimpan tugas');
    }

    return json({
      message: 'Tugas berhasil dibuat',
      data: assignment
    }, { status: 201 });

  } catch (err) {
    console.error('Error in POST /assignments:', err);
    return json({
      message: 'Gagal membuat tugas',
      error: err instanceof Error ? err.message : 'Internal server error'
    }, { status: err instanceof Error ? 400 : 500 });
  }
};

// GET: Mengambil daftar tugas (untuk guru dan siswa)
export const GET: RequestHandler = async ({ url, locals }) => {
  try {
    const session = locals.session;
    if (!session) {
      throw error(401, 'Unauthorized: Silakan login terlebih dahulu');
    }

    // Cek role user (guru atau siswa)
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (userError || !userData) {
      throw error(403, 'Forbidden: Role tidak valid');
    }

    let query = supabase
      .from('assignments')
      .select(`
        *,
        teachers:teacher_id (
          name,
          user_id
        ),
        subjects:subject_id (
          name
        ),
        classes:class_id (
          name
        )
      `)
      .order('created_at', { ascending: false });

    if (userData.role === 'teacher') {
      // Untuk guru: tampilkan semua tugas yang dibuat oleh guru tersebut
      const { data: teacherData } = await supabase
        .from('teachers')
        .select('id')
        .eq('user_id', session.user.id)
        .single();

      if (teacherData) {
        query = query.eq('teacher_id', teacherData.id);
      }
    } else if (userData.role === 'student') {
      // Untuk siswa: tampilkan hanya tugas untuk kelas mereka
      const { data: studentData } = await supabase
        .from('students')
        .select('class_id')
        .eq('user_id', session.user.id)
        .single();

      if (studentData) {
        query = query.eq('class_id', studentData.class_id);
      }
    }

    // Filter tambahan (opsional)
    const classId = url.searchParams.get('class_id');
    const subjectId = url.searchParams.get('subject_id');
    
    if (classId) query = query.eq('class_id', classId);
    if (subjectId) query = query.eq('subject_id', subjectId);

    const { data: assignments, error: fetchError } = await query;

    if (fetchError) {
      throw error(500, 'Gagal mengambil data tugas');
    }

    return json({
      message: 'Berhasil mengambil data tugas',
      data: assignments
    });

  } catch (err) {
    console.error('Error in GET /assignments:', err);
    return json({
      message: 'Gagal mengambil data tugas',
      error: err instanceof Error ? err.message : 'Internal server error'
    }, { status: err instanceof Error ? 400 : 500 });
  }
};
