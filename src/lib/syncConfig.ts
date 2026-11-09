/**
 * Where progress is synced (a free Supabase project). Both values are public by design: the publishable key only
 * allows calling the two functions in docs/supabase-setup.sql. Set VITE_SYNC_URL at build time to point elsewhere
 * (tests use a fake server); an empty value switches sync off.
 */
export const SYNC = {
  url: (import.meta.env.VITE_SYNC_URL as string | undefined) ?? "https://upojtqdflwsvgsnlrnfw.supabase.co",
  key: "sb_publishable_zDzD0LewHzArFN5XO1Ee9w_p58r3TzO",
};
