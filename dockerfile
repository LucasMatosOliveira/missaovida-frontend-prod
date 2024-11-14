# Usa a imagem oficial Node.js com uma versão leve do Debian Bookworm
FROM node:current-bookworm-slim

# Instala o curl para o healthcheck, se necessário
RUN apt-get update && apt-get install -y curl

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de dependências para instalar pacotes primeiro
COPY package.json package-lock.json ./

# Instala as dependências de produção
RUN npm ci --only=production

# Copia o restante do código do projeto
COPY . .

# Define a variável de ambiente para produção
ENV NODE_ENV=production

# Compila o projeto Next.js para produção
RUN npm run build

# Expõe a porta onde o aplicativo será executado
EXPOSE 8002

# Define o comando para iniciar o servidor Next.js
CMD ["npm", "start"]