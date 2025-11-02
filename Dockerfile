# cria uma imagem base
FROM node:20-alpine AS build

# define o diretório de trabalho
WORKDIR /app

# copia o package.json e o package-lock.json 
COPY package*.json ./

# instala as dependecias no container
RUN npm install

#copia o resto do projeto
COPY . .

#executa o build
RUN npm run build 

#Servir com nginx

#cria uma imagem nginx

FROM nginx:alpine

#remove o default do nginx
RUN rm /etc/nginx/conf.d/default.conf

#copia o seu arquivo de config customizada para dentro do container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copia os arquivos da pasta /app/build gerados na primeira etapa do build e manda para o arquivo do Nginx

COPY --from=build /app/dist /usr/share/nginx/html
# informa que o container escuta na porta 80, porta http padrão
EXPOSE 80

#comando que mantém o Nginx rodando em primeiro plano
CMD ["nginx", "-g", "daemon off;"]





