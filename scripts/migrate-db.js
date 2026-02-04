const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function migrate() {
  console.log('Connecting to database...');
  
  if (!process.env.POSTGRES_URL) { // Supabase usually provides this or DATABASE_URL
      // If DATABASE_URL is not set, we might need to construct it or ask user.
      // But usually .env.local from Supabase has it?
      // Wait, standard Supabase Next.js starter often only has NEXT_PUBLIC_SUPABASE_URL and ANON_KEY.
      // If we don't have the connection string, we can't use 'pg'.
      
      // Let's check .env.local content (masked) via grep or just try to use what we have.
      // If we only have URL/KEY, we can use Supabase client's `rpc` IF a function exists, or we are stuck.
      
      // BACKUP PLAN: If no connection string, I will use the 'rpc' method IF I can create a function. 
      // But I can't create a function without SQL access.
      
      // Let's assume the user has the connection string or I can find it.
      // Often strictly 'NEXT_PUBLIC_SUPABASE_URL' is HTTP.
      
      // Let's look for a connection string in the env vars.
      // If not found, I might have to use the "SQL Editor" approach via user.
  }
  
  // Use DIRECT connection string if available (Pooler or Session). 
  // We will try standard 'DATABASE_URL' or 'POSTGRES_URL' or 'SUPABASE_DB_URL'.
  
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

  if (!connectionString) {
      console.error('No DATABASE_URL or POSTGRES_URL found in .env.local');
      console.error('Please add your connection string (Transaction or Session mode) to .env.local to run migrations.');
      process.exit(1);
  }

  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false } // Required for Supabase in many envs
  });

  try {
    await client.connect();
    console.log('Connected. Running migration...');
    
    // Add sort_order column
    await client.query(`
      ALTER TABLE public.projects 
      ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;
    `);
    
    console.log('Migration successful: sort_order column added.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.end();
  }
}

migrate();
