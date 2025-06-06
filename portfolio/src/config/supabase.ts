import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gqoqgnurptrbepsinelu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdxb3FnbnVycHRyYmVwc2luZWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMzQyMDUsImV4cCI6MjA2NDcxMDIwNX0.ebtm9MMp0Dr5EDSX8akP3OG1PsT3aqEZAoP_RIatdeo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 