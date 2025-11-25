-- Migration: Fix search_path security issue in update_updated_at_column function
-- This fixes the Supabase lint warning about mutable search_path
-- Date: 2025-10-25

-- Recreate the function with explicit search_path for security
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = pg_catalog, public
AS $$
BEGIN
    -- Fully qualify built-in functions for safety
    NEW.updated_at = pg_catalog.timezone('utc'::text, pg_catalog.now());
    RETURN NEW;
END;
$$;

-- Verify the function was updated correctly
-- You can check with: SELECT proname, prosecdef, proconfig FROM pg_proc WHERE proname = 'update_updated_at_column';
