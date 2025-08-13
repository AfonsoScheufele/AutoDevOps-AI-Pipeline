# Use a imagem oficial Node.js como base
FROM node:24.5.0-alpine

# Cria diretório da aplicação
WORKDIR /usr/src/app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências (nenhuma no momento, mas bom ter o passo)
RUN npm install

# Copia o código da aplicação
COPY . .

# Expõe a porta que o app vai rodar
EXPOSE 3000

# Comando para iniciar o app
CMD ["node", "server.js"]
