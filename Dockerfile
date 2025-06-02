FROM node:18-alpine AS base

# Instalar dependências apenas
FROM base AS deps
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
RUN npm ci

# Construir a aplicação
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Construir a aplicação Next.js
RUN npm run build

# Imagem de produção
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Copiar arquivos necessários
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expor a porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
