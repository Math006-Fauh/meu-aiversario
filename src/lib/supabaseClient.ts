import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://txqlkzsjlaxwyldtdcgw.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cWxrenNqbGF4d3lsZHRkY2d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MDAyOTYsImV4cCI6MjA4Nzk3NjI5Nn0.nB_fTLHd9c2F9btlsM8pXZ2VxCME8ei850lU8_iHB5g";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

