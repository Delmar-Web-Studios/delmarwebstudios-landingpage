
-- Bookings/leads table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  goal TEXT NOT NULL,
  name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  website_url TEXT,
  budget TEXT,
  meet_date TEXT,
  meet_time TEXT,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Payments table
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  website_url TEXT,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  amount_xaf INTEGER NOT NULL,
  payment_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Public insert policies (no auth required for lead gen)
CREATE POLICY "Anyone can insert bookings" ON public.bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can insert payments" ON public.payments FOR INSERT TO anon, authenticated WITH CHECK (true);
