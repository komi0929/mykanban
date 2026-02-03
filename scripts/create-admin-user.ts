
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');

function loadEnv() {
  if (!fs.existsSync(envPath)) {
    console.error('.env.local file not found!');
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, 'utf-8');
  const env: Record<string, string> = {};
  content.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      env[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
    }
  });
  return env;
}

async function main() {
  const env = loadEnv();
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || (!serviceRoleKey && !anonKey)) {
    console.error('Missing Supabase Config (URL or Keys) in .env.local');
    process.exit(1);
  }

  // Use Service Role if available, otherwise Anon
  const useAdmin = !!serviceRoleKey;
  const keyToUse = serviceRoleKey || anonKey;
  
  if (!keyToUse) {
      console.error('No valid key found.');
      process.exit(1);
  }

  console.log(`Initializing Supabase client with ${useAdmin ? 'SERVICE_ROLE' : 'ANON'} key...`);

  const supabase = createClient(supabaseUrl, keyToUse, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const email = 'y.kominami@hitokoto1.co.jp';
  const password = 'komi0929';

  console.log(`Attempting to create/register user: ${email}`);

  if (useAdmin) {
      // Admin: Confirm automatically
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });

      if (error) {
        console.log('Error creating user (Admin):', error.message);
        if (error.message.includes('already registered') || error.status === 422) {
           console.log('User likely exists. Attempting to update password...');
           const { data: listData, error: listError } = await supabase.auth.admin.listUsers();
           if (listError) {
               console.error('Failed to list users:', listError);
               return;
           }
           const user = listData.users.find(u => u.email === email);
           if (user) {
              const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, { password });
              if (updateError) console.error('Failed to update password:', updateError);
              else console.log('Password updated successfully (Admin).');
           }
        }
      } else {
        console.log('User created and confirmed successfully (Admin):', data.user.id);
      }
  } else {
      // Anon: Regular Sign Up
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
         console.log('Error signing up (Anon):', error.message);
      } else {
         if (data.user) {
             console.log('User signed up successfully (Anon):', data.user.id);
             if (data.session) {
                 console.log('Session active. Email confirmation was NOT required.');
             } else {
                 console.log('WARNING: Session is null. Email confirmation is likely REQUIRED. Please check the inbox for ' + email);
             }
         } else {
             console.log('Sign up Request sent, but no user returned (Check logs).');
         }
      }
  }
}

main();
