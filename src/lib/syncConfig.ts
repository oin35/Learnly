/**
 * Where progress is synced (a free Supabase project). Both values are public by design: the publishable key only
 * allows calling the two functions in docs/supabase-setup.sql. Sync stays switched off while `url` is empty.
 */
export const SYNC = {
  url: (import.meta.env.VITE_SYNC_URL as string | undefined) ?? "",
  key: "sb_publishable_zDzD0LewHzArFN5XO1Ee9w_p58r3TzO",
};
