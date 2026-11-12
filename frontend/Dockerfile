# 1. Fase de Build (Montagem)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Fase de Execução (Rodar)
FROM node:20-alpine
WORKDIR /app
# Copiamos apenas os arquivos necessários do builder para ficar leve
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start" , , "dev"]