# MeetFlow - Plataforma de Videoconferência

MeetFlow é uma plataforma de videoconferência full-stack moderna, construída com tecnologias de ponta para oferecer experiência de vídeo HD, chat em tempo real e compartilhamento de tela.

## 🚀 Stack Tecnológico

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, shadcn/ui, LiveKit JS SDK
- **Backend**: Node.js + Express + TypeScript
- **Video/Audio**: LiveKit Server (self-hosted)
- **Auth**: NextAuth.js com Credentials e Google OAuth
- **Banco**: PostgreSQL com Prisma ORM
- **Monorepo**: Turborepo

## 📁 Estrutura do Projeto

```
meetflow/
├── apps/
│   ├── web/           # Frontend Next.js
│   └── api/           # Backend Express
├── packages/
│   ├── database/      # Prisma schema e client
│   └── auth/          # Configuração de autenticação
├── docker-compose.yml # Docker para LiveKit, PostgreSQL, Redis
├── livekit.yaml       # Configuração do LiveKit
└── .env.example       # Variáveis de ambiente
```

## 🛠️ Instalação e Setup Local

### 1. Clone e instale dependências

```bash
cd meetflow

# Instalar dependências em todos os pacotes
npm install

# Ou usando turbo
npx turbo install
```

### 2. Configure as variáveis de ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite com suas credenciais
# - LIVEKIT_API_KEY e LIVEKIT_API_SECRET (gerar no LiveKit Cloud ou usar devkey/secret para dev)
# - GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET (opcional, para OAuth do Google)
# - NEXTAUTH_SECRET (gerar com: openssl rand -base64 32)
```

### 3. Inicie os serviços com Docker

```bash
# Inicia LiveKit, PostgreSQL e Redis
docker-compose up -d
```

### 4. Configure o banco de dados

```bash
cd packages/database

# Gere o Prisma Client
npm run db:generate

# Aplique o schema ao banco
npm run db:push
```

### 5. Execute o projeto

```bash
# No root do projeto, execute tudo junto
npx turbo dev

# Ou execute separadamente:

# Terminal 1 - Frontend (porta 3000)
cd apps/web && npm run dev

# Terminal 2 - Backend (porta 4000)
cd apps/api && npm run dev
```

Acesse:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **LiveKit WS**: ws://localhost:7880

## 🔑 Credenciais de Demo

- **Email**: demo@meetflow.com
- **Senha**: password123

## 📡 API Endpoints

### Rooms
- `POST /api/rooms` - Criar nova sala
- `GET /api/rooms/:id` - Obter detalhes da sala
- `POST /api/rooms/:id/token` - Gerar token LiveKit para participante
- `DELETE /api/rooms/:id` - Encerrar/excluir sala

### Webhooks
- `POST /api/webhooks/livekit` - Receber eventos do LiveKit

## ☁️ Deploy

### Vercel (Frontend)

1. Conecte seu repositório no Vercel
2. Configure as variáveis de ambiente:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (URL do Vercel)
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXT_PUBLIC_LIVEKIT_URL` (URL do LiveKit no Railway)

3. Deploy automático!

### Railway (Backend + LiveKit)

#### Backend API:
1. Crie novo projeto no Railway
2. Conecte seu repositório
3. Aponte para `apps/api`
4. Configure variáveis de ambiente do `.env.example`
5. Adicione banco PostgreSQL pelo Railway

#### LiveKit Server:
1. Use a imagem oficial: `livekit/livekit-server:latest`
2. Monte o volume com `livekit.yaml`
3. Exponha portas: 7880, 7881, 4379/UDP
4. Configure webhook URL apontando para sua API no Railway

## 🔒 Segurança

- Tokens JWT com expiração de 1 hora
- Criptografia de senhas com bcrypt
- CORS configurado para domínios específicos
- Proteção de rotas autenticadas

## 🎯 Funcionalidades

- ✅ Landing page moderna com dark mode
- ✅ Autenticação com email/senha e Google OAuth
- ✅ Dashboard para criar e gerenciar reuniões
- ✅ Sala de reunião com vídeo HD via LiveKit
- ✅ Grid adaptativo de participantes
- ✅ Mute/unmute de áudio e vídeo
- ✅ Compartilhamento de tela
- ✅ Chat em tempo real (Data Channel)
- ✅ Lista de participantes
- ✅ Histórico de reuniões

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npx turbo dev          # Roda todos os apps em modo dev

# Build
npx turbo build        # Build de produção

# Database
cd packages/database
npm run db:generate    # Gera Prisma Client
npm run db:push        # Aplica schema ao banco
npm run db:migrate     # Roda migrações
npm run db:studio      # Abre Prisma Studio

# Docker
docker-compose up -d   # Inicia serviços
docker-compose down    # Para serviços
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 🆘 Suporte

- Documentação: [Em breve]
- Issues: https://github.com/seu-usuario/meetflow/issues
- Email: support@meetflow.com

---

**MeetFlow** - Videoconferência para o futuro 🚀
