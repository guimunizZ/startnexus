# AGENTS.md — StartNexus 🧠

## 🎯 Visão Geral

StartNexus conecta usuários a assistências técnicas permitindo:

- Cadastro de usuários
- Listagem de assistências
- Agendamentos
- Recuperação de senha

Stack:

- Next.js (App Router)
- Supabase (Database + Auth)
- Vercel (Deploy)

---

## 🧱 Arquitetura

### Frontend + Backend (Next.js)

src/
├── app/ → rotas e páginas
├── components/ → UI
├── services/ → regras de negócio
├── repositories/ → acesso ao Supabase
├── lib/ → configs (supabase client)
├── hooks/ → hooks customizados

---

## 🔥 Regras

### ❌ NÃO FAZER
- Não acessar Supabase direto nos componentes
- Não colocar regra de negócio em páginas
- Não duplicar lógica

### ✅ FAZER

#### Services
- Contém regras de negócio

#### Repository
- Comunicação com Supabase

#### Components
- Apenas UI

---

## ⚙️ Configuração

Variáveis ficam em:

.env.local

Nunca hardcode:

- URLs
- Keys

---

## 🧪 Testes (futuro)

- Unitário (services)
- Integração (API)

---

## 🚀 Deploy

- Vercel automático via GitHub
- Supabase remoto

---

## 📌 Checklist

- Código limpo
- Sem lógica em UI
- Uso correto de services