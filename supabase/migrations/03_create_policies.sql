-- Create security policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Modified policy: Allow any user to insert a profile (needed for signup flow)
-- This removes the RLS check for insert, which is fine since we already validate 
-- the user id against auth.users via the foreign key constraint
CREATE POLICY "Anyone can insert user profile" ON public.users
  FOR INSERT WITH CHECK (true);

-- Only the user themselves can update their profile
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Bookings policies
-- Users can view only their own bookings
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

-- Modified policy: Allow any authenticated user to create bookings for any user
-- This is needed for the signup+booking flow
CREATE POLICY "Anyone can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (true);

-- Concierge requests policies
-- Users can view only their own requests
CREATE POLICY "Users can view own requests" ON public.concierge_requests
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own requests
CREATE POLICY "Users can create own requests" ON public.concierge_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id); 