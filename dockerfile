# Usa a imagem oficial Node.js com uma versão leve do Debian Bookworm
FROM node:current-bookworm-slim

# Instala o curl para o healthcheck, se necessário
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de dependências para instalar pacotes primeiro
COPY ./frontend/package*.json .

# Instala as dependências de produção
RUN npm ci

# Copia o restante do código do projeto
COPY ./frontend .
COPY ./frontend/public ./public
COPY ./frontend/src ./src
COPY ./frontend/components ./components

# Define a variável de ambiente para produção
ENV NODE_ENV=production

# Compila o projeto Next.js para produção
RUN npm run build

# Expõe a porta onde o aplicativo será executado
EXPOSE 8002

# Define o comando para iniciar o servidor Next.js
CMD ["npm", "start"]