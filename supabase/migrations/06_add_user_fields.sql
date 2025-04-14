-- Add additional user profile fields
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'english',
ADD COLUMN IF NOT EXISTS communication_method TEXT DEFAULT 'email';

-- Update the handle_new_user function to include the new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate default concierge end date (3 days from now)
  INSERT INTO public.users (
    id, 
    email, 
    name, 
    phone,
    language,
    communication_method,
    concierge_end_date
  )
  VALUES (
    NEW.id,
    NEW.email,
    -- Use the name from user_metadata if available, otherwise fall back to email username
    COALESCE(
      (NEW.raw_user_meta_data->>'name')::TEXT,
      (NEW.raw_user_meta_data->>'full_name')::TEXT,
      split_part(NEW.email, '@', 1)
    ),
    -- Get phone from user_metadata
    (NEW.raw_user_meta_data->>'phone')::TEXT,
    -- Get language preference from user_metadata
    COALESCE(
      (NEW.raw_user_meta_data->>'language')::TEXT,
      'english'
    ),
    -- Get communication method from user_metadata
    COALESCE(
      (NEW.raw_user_meta_data->>'communication_method')::TEXT,
      'email'
    ),
    NOW() + INTERVAL '3 days'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 