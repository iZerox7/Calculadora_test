import { createClient } from '@supabase/supabase-js';

// Las URL y la clave de Supabase que proporcionaste.
// Es una buena práctica guardarlas en variables de entorno en un proyecto real.
const supabaseUrl = 'https://nraekhhvzsqqnbknkvyy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yYWVraGh2enNxcW5ia25rdnl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3OTU2NjQsImV4cCI6MjA2NjM3MTY2NH0.3vhAL74KyJVVwt-3Yz6C-QRTwrsFKbRrIWBbYt3JL90';

// Exporta el cliente de Supabase para ser utilizado en otros lugares de la aplicación.
export const supabase = createClient(supabaseUrl, supabaseKey);