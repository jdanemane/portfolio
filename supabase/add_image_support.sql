-- Add image support to portfolio_items table
-- This migration adds an image_url field to store project images

-- Add image_url column to portfolio_items table
ALTER TABLE portfolio_items 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add comment to document the field
COMMENT ON COLUMN portfolio_items.image_url IS 'URL to the project image. Can be a Supabase Storage URL or external URL.';

-- Optional: Create an index for faster queries if needed
-- CREATE INDEX IF NOT EXISTS idx_portfolio_items_image_url ON portfolio_items(image_url) WHERE image_url IS NOT NULL;

