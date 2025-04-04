-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_concierge_requests_user_id ON public.concierge_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_concierge_requests_status ON public.concierge_requests(status); 