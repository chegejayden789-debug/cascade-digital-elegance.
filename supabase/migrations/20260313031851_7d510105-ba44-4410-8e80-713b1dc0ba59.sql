
-- Add revenue_amount to reservations
ALTER TABLE public.reservations ADD COLUMN IF NOT EXISTS revenue_amount numeric DEFAULT NULL;
ALTER TABLE public.reservations ADD COLUMN IF NOT EXISTS table_id uuid DEFAULT NULL;

-- Create restaurant_tables table
CREATE TABLE public.restaurant_tables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_number text NOT NULL UNIQUE,
  capacity integer NOT NULL DEFAULT 2,
  status text NOT NULL DEFAULT 'available',
  location text DEFAULT 'main',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add foreign key from reservations to restaurant_tables
ALTER TABLE public.reservations 
  ADD CONSTRAINT fk_reservations_table 
  FOREIGN KEY (table_id) REFERENCES public.restaurant_tables(id) ON DELETE SET NULL;

-- Enable RLS on restaurant_tables
ALTER TABLE public.restaurant_tables ENABLE ROW LEVEL SECURITY;

-- Public can read tables (for floor plan)
CREATE POLICY "Anyone can read tables" ON public.restaurant_tables
  FOR SELECT TO public USING (true);

-- Only authenticated users can manage tables
CREATE POLICY "Authenticated users can insert tables" ON public.restaurant_tables
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update tables" ON public.restaurant_tables
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete tables" ON public.restaurant_tables
  FOR DELETE TO authenticated USING (true);

-- Add trigger for updated_at on restaurant_tables
CREATE TRIGGER update_restaurant_tables_updated_at
  BEFORE UPDATE ON public.restaurant_tables
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create activity_logs table for real-time feed
CREATE TABLE public.activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  description text NOT NULL,
  entity_type text,
  entity_id uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read activity logs" ON public.activity_logs
  FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert activity logs" ON public.activity_logs
  FOR INSERT TO authenticated WITH CHECK (true);

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.restaurant_tables;
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_logs;

-- Seed some default tables
INSERT INTO public.restaurant_tables (table_number, capacity, location) VALUES
  ('T1', 2, 'window'),
  ('T2', 2, 'window'),
  ('T3', 4, 'main'),
  ('T4', 4, 'main'),
  ('T5', 6, 'main'),
  ('T6', 6, 'patio'),
  ('T7', 8, 'private'),
  ('T8', 4, 'patio'),
  ('T9', 2, 'bar'),
  ('T10', 10, 'private');
