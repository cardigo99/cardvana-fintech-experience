-- Create orders table
CREATE TABLE public.orders (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  date TEXT NOT NULL,
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  discount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  promo_code TEXT,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  transaction_id TEXT NOT NULL,
  guest_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recharges table
CREATE TABLE public.recharges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL,
  transaction_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gift_cards table
CREATE TABLE public.gift_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  brand TEXT NOT NULL,
  code TEXT NOT NULL,
  pin TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recharges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gift_cards ENABLE ROW LEVEL SECURITY;

-- RLS Policies for orders (allow all read/write for now since we're using localStorage user IDs)
CREATE POLICY "Anyone can insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Anyone can update orders" ON public.orders FOR UPDATE USING (true);

-- RLS Policies for recharges
CREATE POLICY "Anyone can insert recharges" ON public.recharges FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read recharges" ON public.recharges FOR SELECT USING (true);
CREATE POLICY "Anyone can update recharges" ON public.recharges FOR UPDATE USING (true);

-- RLS Policies for gift_cards
CREATE POLICY "Anyone can insert gift_cards" ON public.gift_cards FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read gift_cards" ON public.gift_cards FOR SELECT USING (true);
CREATE POLICY "Anyone can update gift_cards" ON public.gift_cards FOR UPDATE USING (true);

-- Create indexes for better performance
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_recharges_user_id ON public.recharges(user_id);
CREATE INDEX idx_recharges_status ON public.recharges(status);
CREATE INDEX idx_gift_cards_user_id ON public.gift_cards(user_id);
CREATE INDEX idx_gift_cards_order_id ON public.gift_cards(order_id);