// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hyfojusioehuutremcum.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5Zm9qdXNpb2VodXV0cmVtY3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDI1NjQsImV4cCI6MjA1OTg3ODU2NH0.XBeNfyprTHliItyHHOHJbZyk06elteK6Wl7AI7hsI_8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);