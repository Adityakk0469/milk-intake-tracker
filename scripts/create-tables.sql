-- Create the milk_entries table in Supabase
CREATE TABLE IF NOT EXISTS public.milk_entries (
    id BIGSERIAL PRIMARY KEY,
    date DATE NOT NULL,
    quantity DECIMAL(5,2) NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index for faster date queries
CREATE INDEX IF NOT EXISTS idx_milk_entries_date ON public.milk_entries(date DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.milk_entries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for everyone (since it's a family app)
CREATE POLICY "Allow all operations for milk_entries" ON public.milk_entries
    FOR ALL USING (true) WITH CHECK (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_milk_entries_updated_at 
    BEFORE UPDATE ON public.milk_entries 
    FOR EACH ROW 
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data for testing
INSERT INTO public.milk_entries (date, quantity) VALUES 
    (CURRENT_DATE, 2.5),
    (CURRENT_DATE - INTERVAL '1 day', 1.8),
    (CURRENT_DATE - INTERVAL '2 days', 3.0),
    (CURRENT_DATE - INTERVAL '3 days', 2.2)
ON CONFLICT DO NOTHING;
