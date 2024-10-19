// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Ambil variabel dari .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Inisialisasi Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

