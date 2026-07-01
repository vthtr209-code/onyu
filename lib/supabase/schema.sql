-- Onyu CMS Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tags
CREATE TABLE IF NOT EXISTS tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Articles
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  translation_group_id TEXT NOT NULL,
  language TEXT NOT NULL CHECK (language IN ('en', 'ko', 'vi')),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  summary TEXT,
  content TEXT,
  cover_image TEXT,
  thumbnail TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  author TEXT,
  reading_time INTEGER DEFAULT 5,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  publish_date DATE,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (language, slug)
);

-- Article Tags (many-to-many)
CREATE TABLE IF NOT EXISTS article_tags (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- Article Sections (which homepage sections an article appears in)
CREATE TABLE IF NOT EXISTS article_sections (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  section TEXT NOT NULL CHECK (section IN ('latest', 'featured', 'research', 'popular', 'healing')),
  PRIMARY KEY (article_id, section)
);

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Site Settings (single row)
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER DEFAULT 1 PRIMARY KEY CHECK (id = 1),
  site_name TEXT DEFAULT 'Onyu',
  logo TEXT,
  favicon TEXT,
  facebook TEXT,
  instagram TEXT,
  linkedin TEXT,
  footer_text TEXT DEFAULT 'Korea''s Burnout & Workplace Well-being Knowledge Library',
  default_language TEXT DEFAULT 'en' CHECK (default_language IN ('en', 'ko', 'vi')),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default settings row
INSERT INTO settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Insert default categories
INSERT INTO categories (name, slug, color) VALUES
  ('Burnout', 'burnout', '#a97c50'),
  ('Career', 'career', '#2f3b32'),
  ('Sleep', 'sleep', '#8f9bb0'),
  ('Workplace', 'workplace', '#b7a08f'),
  ('Energy', 'energy', '#d59a6a'),
  ('Leadership', 'leadership', '#c7a95c')
ON CONFLICT (slug) DO NOTHING;

-- Insert default tags
INSERT INTO tags (name) VALUES
  ('burnout'), ('stress'), ('career'), ('sleep'), ('wellbeing')
ON CONFLICT (name) DO NOTHING;

-- Enable Row Level Security (allow all for now — add auth rules later)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Policies: allow public read, authenticated write
-- For MVP, allow all operations (tighten with auth later)
CREATE POLICY "Allow all on categories" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on tags" ON tags FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on articles" ON articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on article_tags" ON article_tags FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on article_sections" ON article_sections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on newsletter" ON newsletter FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on settings" ON settings FOR ALL USING (true) WITH CHECK (true);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
