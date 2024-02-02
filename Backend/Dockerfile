# Usar uma imagem base do Node
FROM node:16

# Definir diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar os arquivos de definição de pacotes para o diretório de trabalho
COPY package.json yarn.lock ./

# Instalar dependências usando Yarn
RUN yarn install --frozen-lockfile

# Copiar os arquivos do projeto para o diretório de trabalho
COPY . .

# Compilar os arquivos TypeScript para JavaScript
RUN yarn build

# Expõe a porta que o aplicativo vai rodar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD [ "yarn", "start" ]
