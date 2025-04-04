# Usa a Imagem Base do Node.js
FROM node:18

# Define o diretório de trabalho dentro do Container
WORKDIR /app

# Copia todas as dependências para o diretório /app dentro do contêiner
COPY . .

# Instala as dependências do projeto
RUN npm install

# Exponha a porta 3000 para o host
EXPOSE 3000

# Define o comando para executar o servidor da aplicação
CMD ["node", "start"]
