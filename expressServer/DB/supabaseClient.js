import { createClient,SupabaseClient } from '@supabase/supabase-js';
import dotenv from "dotenv";
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
/**
 * @type {SupabaseClient}
 */
export const supabaseConnect = createClient(SUPABASE_URL, SUPABASE_KEY);