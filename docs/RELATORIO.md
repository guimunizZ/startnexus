📄 Relatório Técnico — Modelagem e Autenticação (StartNexus)
🧠 Objetivo

Definir com clareza:

Quais dados são obrigatórios para autenticação
Como cada tipo de usuário funciona
Como o banco suporta o negócio
Quais regras garantem consistência e qualidade
👤 1. TIPOS DE USUÁRIO

O sistema possui 3 papéis distintos:

Role	Descrição
client	Usuário final (B2C)
assistance	Empresa/profissional validado
junior	Profissional iniciante sem CNPJ
🔐 2. AUTENTICAÇÃO (SUPABASE AUTH)
📌 Fonte primária de autenticação

A autenticação é feita via:

Email + senha
Gerenciado pelo Supabase Auth
⚠️ REGRA CRÍTICA
O Supabase Auth NÃO armazena dados de negócio.

👉 Ele só garante:

identidade (user.id)
email
login
🧱 CONSEQUÊNCIA

Todos os dados do sistema são armazenados em:

users + tabelas relacionadas
🗄️ 3. MODELAGEM DE DADOS
🔹 3.1 USERS (BASE DO SISTEMA)
users
📌 Responsabilidade:
representar qualquer usuário autenticado
📊 Campos:
Campo	Regra
id	vem do auth
email	único
role	define comportamento
🔹 3.2 CLIENT_PROFILES
client_profiles
📌 Responsabilidade:
dados pessoais do cliente
📊 Campos:
Campo	Obrigatório
first_name	✔
last_name	✔
address	opcional
🔹 3.3 SERVICES (CATÁLOGO GLOBAL)
services
📌 Responsabilidade:
lista única de serviços disponíveis
🧠 REGRA IMPORTANTE
Cliente e assistência usam a mesma fonte de serviços
📌 Exemplos recomendados:
Computadores
Notebooks
Impressoras
Redes (roteadores/switch)
IoT
Dispositivos móveis
Servidores
Segurança eletrônica
🔹 3.4 CLIENT_SERVICES
client_services
📌 Responsabilidade:
interesses do cliente
🧠 Regra:
N:N com services
🔹 3.5 SERVICE_SUGGESTIONS
service_suggestions
📌 Responsabilidade:
feedback do cliente
🧠 Regra:
permite expansão do catálogo
🔹 3.6 ASSISTANCES
assistances
📌 Responsabilidade:
perfil profissional
📊 Campos obrigatórios:
Campo	Regra
business_name	✔
address	✔
cnpj	obrigatório exceto junior
is_junior	define regra
approved	controle interno
🧠 REGRA DE NEGÓCIO
Assistência NÃO é automaticamente confiável

👉 precisa de validação interna

🔹 3.7 ASSISTANCE_SERVICES
assistance_services
📌 Responsabilidade:
serviços oferecidos
🧠 Regra:
deve usar catálogo global
🔹 3.8 ASSISTANCE_DOCUMENTS
assistance_documents
📌 Responsabilidade:
provas de qualificação
📊 Tipos:
certificado
foto local
curso
comprovação técnica
🧠 REGRA CRÍTICA
Sem documentos → não aprovado
🔹 3.9 REVIEWS
reviews
📌 Responsabilidade:
reputação da assistência
🔹 3.10 APPOINTMENTS
appointments
📌 Responsabilidade:
agendamento entre cliente e assistência
🧠 4. REGRAS DE NEGÓCIO (CRÍTICAS)
🔐 AUTENTICAÇÃO

✔ sempre via Supabase Auth
✔ nunca confiar apenas no frontend

👤 CLIENTE

✔ deve informar:

nome
sobrenome
email
senha

✔ pode informar:

endereço
interesses
sugestões
🏢 ASSISTÊNCIA

✔ deve informar:

nome da empresa
email
senha
endereço

✔ obrigatório:

CNPJ (exceto junior)

✔ pode informar:

descrição
serviços
📊 SERVIÇOS

✔ catálogo central
✔ sem duplicação
✔ controlado pelo sistema

📸 VALIDAÇÃO DE QUALIDADE

✔ documentos obrigatórios
✔ aprovação manual
✔ controle via approved

⚠️ INTEGRIDADE

✔ todas as tabelas ligadas por user.id
✔ uso de on delete cascade
✔ evitar dados órfãos

🚨 5. RISCOS CONTROLADOS
Risco	Solução
spam de cadastro	rate limit + validação
assistência fake	documentos + aprovação
dados inconsistentes	FK + constraints
duplicação de serviço	tabela central
🚀 6. ARQUITETURA FINAL
Auth → Supabase Auth
↓
users → identidade
↓
profiles → dados específicos
↓
relations → serviços / agendamentos / avaliações
🧠 7. CONCLUSÃO

O sistema agora:

✔ separa autenticação de dados
✔ suporta múltiplos perfis
✔ permite crescimento controlado
✔ garante qualidade de serviço
✔ está pronto para escala