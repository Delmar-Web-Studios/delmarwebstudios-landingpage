
-- Bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  goal TEXT,
  name TEXT NOT NULL,
  business_name TEXT,
  industry TEXT,
  website_url TEXT,
  budget TEXT,
  meet_date DATE,
  meet_time TEXT,
  whatsapp TEXT,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a booking"
ON public.bookings FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can view bookings"
ON public.bookings FOR SELECT
TO authenticated
USING (true);

-- Payments table
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  method TEXT NOT NULL,
  amount_fcfa INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a payment record"
ON public.payments FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can view payments"
ON public.payments FOR SELECT
TO authenticated
USING (true);
