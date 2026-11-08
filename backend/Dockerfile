# Usa uma imagem leve do Node
FROM node:22-alpine

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências primeiro (otimiza o cache do Docker)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código do projeto
COPY . .

# Expõe a porta que o NestJS usa
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:dev"]

