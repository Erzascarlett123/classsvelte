import { writable } from 'svelte/store';

// Store untuk nama dan kelas
export const userName = writable('');
export const userClass = writable('');