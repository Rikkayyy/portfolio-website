-- ══════════════════════════════════════════════════════════════════════════════
-- Portfolio Website — Supabase Schema Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ══════════════════════════════════════════════════════════════════════════════


-- ── 1. GALLERY: publications (series) ────────────────────────────────────────

CREATE TABLE IF NOT EXISTS publications (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  num           TEXT        NOT NULL,          -- display label: '01', '02', …
  title         TEXT        NOT NULL,          -- e.g. 'Series I', 'Summer 2024'
  year          TEXT        NOT NULL,          -- e.g. '2024'
  essay         TEXT,                          -- prose caption / description
  display_order INTEGER     NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Public read access
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read publications"
  ON publications FOR SELECT USING (true);


-- ── 2. GALLERY: photos (belong to a publication) ─────────────────────────────

CREATE TABLE IF NOT EXISTS photos (
  id             UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  publication_id UUID        NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
  image_url      TEXT        NOT NULL,   -- full public URL from Supabase Storage
  alt            TEXT,                   -- accessibility description
  display_order  INTEGER     NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookup by publication
CREATE INDEX IF NOT EXISTS photos_publication_id_idx ON photos(publication_id);

-- Public read access
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read photos"
  ON photos FOR SELECT USING (true);


-- ── 3. PROJECTS ───────────────────────────────────────────────────────────────
-- Drop and recreate if it already exists with the old shape.
-- If you have data you want to keep, use ALTER TABLE instead (see below).

DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT        NOT NULL,
  year          TEXT        NOT NULL,          -- e.g. '2024'
  description   TEXT        NOT NULL,
  technologies  TEXT[]      NOT NULL DEFAULT '{}',
  github_url    TEXT,
  live_url      TEXT,
  display_order INTEGER     NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Public read access
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read projects"
  ON projects FOR SELECT USING (true);


-- ── 4. STORAGE BUCKET ─────────────────────────────────────────────────────────
-- Create a public bucket for gallery photos.
-- You can also do this in: Dashboard → Storage → New bucket → "gallery" → Public

INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public reads from the bucket
CREATE POLICY "Public read gallery bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery');


-- ══════════════════════════════════════════════════════════════════════════════
-- SAMPLE DATA (optional — delete before going live)
-- ══════════════════════════════════════════════════════════════════════════════

-- Example project rows:
-- INSERT INTO projects (title, year, description, technologies, github_url, live_url, display_order)
-- VALUES
--   ('My First Project', '2024', 'A short description of what it does.', ARRAY['Next.js', 'TypeScript', 'Supabase'], 'https://github.com/you/repo', 'https://myproject.com', 0),
--   ('Another Project',  '2023', 'Another description.',                  ARRAY['React', 'Node.js'],                 'https://github.com/you/repo2', NULL,                         1);

-- Example publication + photos (replace image_url with real Storage URLs):
-- INSERT INTO publications (num, title, year, essay, display_order)
-- VALUES ('01', 'Series I', '2024', 'Your essay here.', 0)
-- RETURNING id;
--
-- -- Use the returned UUID as publication_id:
-- INSERT INTO photos (publication_id, image_url, alt, display_order)
-- VALUES
--   ('<publication-uuid>', 'https://<project>.supabase.co/storage/v1/object/public/gallery/photo1.jpg', 'A portrait', 0),
--   ('<publication-uuid>', 'https://<project>.supabase.co/storage/v1/object/public/gallery/photo2.jpg', 'A landscape', 1);
