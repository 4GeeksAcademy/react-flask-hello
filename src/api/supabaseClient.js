import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tivihbxswofkccfcaedh.supabase.co'; // url del proyecto para que se comunique con supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpdmloYnhzd29ma2NjZmNhZWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2ODc0MTYsImV4cCI6MjA2ODI2MzQxNn0.xp7fOgpHHnHCr74_veunGPbNlLhUWIFFpMmI5Dq60a0'; // Key anon public para usar en el front con react

export const supabase = createClient(supabaseUrl, supabaseKey);

// Esto es para realizar la autentificaciones mediante supabase y las conexiones