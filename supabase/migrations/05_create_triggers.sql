-- Create function to create user profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate default concierge end date (3 days from now)
  INSERT INTO public.users (id, email, name, concierge_end_date)
  VALUES (
    NEW.id,
    NEW.email,
    -- Use the name from user_metadata if available, otherwise fall back to email username
    COALESCE(
      (NEW.raw_user_meta_data->>'name')::TEXT,
      (NEW.raw_user_meta_data->>'full_name')::TEXT,
      split_part(NEW.email, '@', 1)
    ),
    NOW() + INTERVAL '3 days'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 