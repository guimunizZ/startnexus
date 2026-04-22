-- SQL para configuração do Banco de Dados StartNexus

-- 1. Tabela de Perfis Gerais (Sincronizada com auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('client', 'assistance', 'admin')),
  nickname TEXT,
  avatar_url TEXT,
  points INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de Clientes
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  interests TEXT[], -- Serviços de interesse
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabela de Assistências
CREATE TABLE IF NOT EXISTS public.assistances (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  cnpj TEXT,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  description TEXT,
  experience INTEGER DEFAULT 0,
  is_junior BOOLEAN DEFAULT FALSE,
  rating NUMERIC DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  
  -- Campos para Junior/Destaque
  portfolio_url TEXT, -- LinkedIn, GitHub, etc.
  study_time TEXT, -- 0-6 meses, 6-12 meses, +1 ano
  has_tools BOOLEAN DEFAULT FALSE,
  availability TEXT, -- Manhã, Tarde, Noite, Integral
  experience_summary TEXT, -- Breve resumo do que já consertou
  
  -- Campos de Perfil Marketplace (Edição de Perfil)
  logo_url TEXT,
  workspace_photos TEXT[], -- Array de URLs de fotos
  certificates JSONB[], -- Array de objetos { name, institution, date, url }
  social_proof JSONB[], -- Array de objetos { description, photo_url }
  
  services_offered TEXT[], -- Serviços padrão selecionados
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabela de Serviços Técnicos (Referência)
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL -- 'Computadores', 'Celulares', 'Especiais', etc.
);

-- 5. Ativar RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assistances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- 6. Políticas de Acesso
-- Profiles: Usuário vê seu próprio perfil
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Clients: Usuário vê e edita seu próprio perfil
CREATE POLICY "Clients can view own profile" ON public.clients
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Clients can update own profile" ON public.clients
  FOR UPDATE USING (auth.uid() = id);

-- Assistances: Usuário vê e edita seu próprio perfil, público vê todos
CREATE POLICY "Public can view assistances" ON public.assistances
  FOR SELECT USING (true);
CREATE POLICY "Assistances can update own profile" ON public.assistances
  FOR UPDATE USING (auth.uid() = id);

-- Services: Leitura pública para todos
CREATE POLICY "Public can view services" ON public.services
  FOR SELECT USING (true);

-- 7. Função de Trigger para criar Profile automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, nickname)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'role', 'client'),
    COALESCE(new.raw_user_meta_data->>'first_name', split_part(new.email, '@', 1))
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 8. Função para updated_at automático
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- 9. Tabela de Agenda de Assistências
CREATE TABLE IF NOT EXISTS public.assistance_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assistance_id UUID REFERENCES public.assistances(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0 = Domingo, 1 = Segunda, etc.
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  lunch_start TIME,
  lunch_end TIME,
  is_active BOOLEAN DEFAULT TRUE,
  is_urgent BOOLEAN DEFAULT FALSE,
  is_home_service BOOLEAN DEFAULT FALSE,
  is_remote_service BOOLEAN DEFAULT FALSE,
  is_pickup_delivery BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Tabela de Serviços da Assistência (Específicos por Assistência)
CREATE TABLE IF NOT EXISTS public.assistance_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assistance_id UUID REFERENCES public.assistances(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price_base NUMERIC NOT NULL DEFAULT 0,
  time_average TEXT, -- Ex: "1-2 horas", "2 dias"
  is_remote BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Tabela de Pedidos de Serviço (Service Orders)
CREATE TABLE IF NOT EXISTS public.service_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  assistance_id UUID REFERENCES public.assistances(id) ON DELETE SET NULL,
  service_id UUID REFERENCES public.assistance_services(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  urgency TEXT CHECK (urgency IN ('low', 'medium', 'high', 'urgent')),
  preferred_date DATE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'negotiating', 'rejected', 'completed', 'cancelled')),
  price_final NUMERIC,
  client_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ativar RLS para as novas tabelas
ALTER TABLE public.assistance_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assistance_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_orders ENABLE ROW LEVEL SECURITY;

-- Políticas de Acesso
CREATE POLICY "Assistances can manage own schedule" ON public.assistance_schedule
  FOR ALL USING (auth.uid() = assistance_id);
CREATE POLICY "Public can view assistance schedule" ON public.assistance_schedule
  FOR SELECT USING (true);

CREATE POLICY "Assistances can manage own services" ON public.assistance_services
  FOR ALL USING (auth.uid() = assistance_id);
CREATE POLICY "Public can view assistance services" ON public.assistance_services
  FOR SELECT USING (true);

CREATE POLICY "Clients can view own orders" ON public.service_orders
  FOR SELECT USING (auth.uid() = client_id);
CREATE POLICY "Assistances can view own orders" ON public.service_orders
  FOR SELECT USING (auth.uid() = assistance_id);
CREATE POLICY "Clients can create orders" ON public.service_orders
  FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Assistances can update own orders" ON public.service_orders
  FOR UPDATE USING (auth.uid() = assistance_id);

-- Trigger para updated_at nas novas tabelas
CREATE TRIGGER set_assistance_schedule_updated_at
  BEFORE UPDATE ON public.assistance_schedule
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

CREATE TRIGGER set_assistance_services_updated_at
  BEFORE UPDATE ON public.assistance_services
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

CREATE TRIGGER set_service_orders_updated_at
  BEFORE UPDATE ON public.service_orders
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();
