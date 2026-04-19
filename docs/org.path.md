# 📁 Organização de Pastas — StartNexus (Atualizado)

## 🧱 SRC

src/

## 🎨 FRONTEND (Next App Router)

src/app/

- page.tsx → home
- b2c/page.tsx → cliente
- b2b/page.tsx → assistência
- auth/login
- auth/register

## 🧩 COMPONENTES

src/components/

- forms/
    - ClientForm.tsx
    - AssistanceForm.tsx

## ⚙️ BACKEND

src/server/

- services/
- repositories/

## 🔌 LIB

src/lib/

- supabaseClient

## 🧠 REGRAS

- UI não acessa banco
- service centraliza regra
- banco desacoplado
- dados normalizados

## 🎯 ARQUITETURA

UI → components  
Logic → services  
Data → supabase

## 🚀 OBJETIVO

Sistema escalável com:

- múltiplos perfis
- catálogo de serviços
- validação de assistências
- marketplace técnico