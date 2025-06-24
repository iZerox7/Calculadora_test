import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nraekhhvzsqqnbknkvyy.supabase.co';  // reemplaza aquí
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yYWVraGh2enNxcW5ia25rdnl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3OTU2NjQsImV4cCI6MjA2NjM3MTY2NH0.3vhAL74KyJVVwt-3Yz6C-QRTwrsFKbRrIWBbYt3JL90';              // reemplaza aquí

export const supabase = createClient(supabaseUrl, supabaseKey);
