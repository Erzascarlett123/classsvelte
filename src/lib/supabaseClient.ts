// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Ganti dengan URL dan Anon Key Supabase Anda
const supabaseUrl = 'https://kvyuvciubszzmebpbsqg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2eXV2Y2l1YnN6em1lYnBic3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwNDU4MzYsImV4cCI6MjA0NDYyMTgzNn0.ANaAi6ALuRAh-mo1b4ayroMFF1XqTTbZDiZzRnDgSKo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
