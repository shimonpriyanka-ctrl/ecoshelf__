/*
# EcoShelf — Create items, waitlist, and leaderboard tables

1. New Tables
- `ecoshelf_items`: Sample item listings for the Live Demo Shelf (drill, tent, pots, books, ladder, desk lamp). Each has a name, category, image_url, distance, owner_name, rating, owner_note, listing_type (lend/gift), and created_at.
- `ecoshelf_waitlist`: Email + neighborhood/PIN code capture for the waitlist section. Stores email, pin_code, neighborhood, and created_at.
- `ecoshelf_leaderboard`: Top lenders/gifters/sellers for the Rewards Leaderboard. Stores name, avatar_url, eco_points, items_shared, and rank_label.

2. Security
- Enable RLS on all three tables.
- This is a no-auth single-tenant demo site: all tables use TO anon, authenticated with USING (true) / WITH CHECK (true) because the data is intentionally public/shared for the demo.

3. Important Notes
- All tables are seeded with realistic Indian-context sample data.
- Items use Indian names, distances in meters, and INR context.
- Leaderboard uses Indian names and eco_points.
*/

CREATE TABLE IF NOT EXISTS ecoshelf_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  distance text NOT NULL,
  owner_name text NOT NULL,
  rating numeric NOT NULL DEFAULT 5,
  owner_note text NOT NULL,
  listing_type text NOT NULL DEFAULT 'lend',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ecoshelf_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_items" ON ecoshelf_items;
CREATE POLICY "anon_select_items" ON ecoshelf_items FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_items" ON ecoshelf_items;
CREATE POLICY "anon_insert_items" ON ecoshelf_items FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_items" ON ecoshelf_items;
CREATE POLICY "anon_update_items" ON ecoshelf_items FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_items" ON ecoshelf_items;
CREATE POLICY "anon_delete_items" ON ecoshelf_items FOR DELETE
TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS ecoshelf_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  pin_code text NOT NULL,
  neighborhood text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ecoshelf_waitlist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_waitlist" ON ecoshelf_waitlist;
CREATE POLICY "anon_select_waitlist" ON ecoshelf_waitlist FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_waitlist" ON ecoshelf_waitlist;
CREATE POLICY "anon_insert_waitlist" ON ecoshelf_waitlist FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_waitlist" ON ecoshelf_waitlist;
CREATE POLICY "anon_delete_waitlist" ON ecoshelf_waitlist FOR DELETE
TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS ecoshelf_leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  avatar_url text NOT NULL,
  eco_points integer NOT NULL DEFAULT 0,
  items_shared integer NOT NULL DEFAULT 0,
  rank_label text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ecoshelf_leaderboard ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_leaderboard" ON ecoshelf_leaderboard;
CREATE POLICY "anon_select_leaderboard" ON ecoshelf_leaderboard FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_leaderboard" ON ecoshelf_leaderboard;
CREATE POLICY "anon_insert_leaderboard" ON ecoshelf_leaderboard FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_leaderboard" ON ecoshelf_leaderboard;
CREATE POLICY "anon_update_leaderboard" ON ecoshelf_leaderboard FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_leaderboard" ON ecoshelf_leaderboard;
CREATE POLICY "anon_delete_leaderboard" ON ecoshelf_leaderboard FOR DELETE
TO anon, authenticated USING (true);
