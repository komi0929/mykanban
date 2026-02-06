import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function migrate() {
  console.log('Connecting to database...');
  
  if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL) { 
      // Fallback check or logging
  }
  
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
