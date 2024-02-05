# project-indt

Primeiro ao entrar no Backend tem que atualizar as dependencias: **YARN INSTALL**

Depois de Instalado as dependencias executar o comando: "**docker compose up --build**" além de buildar o projeto, ele também já vai criar automaticamente o banco de dados: 

Esse comando é somente para buildar a 1º vez, depois pode ser usado normalmente o comando: docker "**compose up -d**"

Database: indt-users

Para rodar as Migrations as tabelas que vamos utilizar: Users: "**docker-compose exec app npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string,accessLevel:string**"

Proximo comando: "**docker-compose exec app npx sequelize-cli db:migrate**" -> Esse comando vai criar as tabelas no banco de dados
Containers com as 2 aplicações 

![image](https://github.com/arlansonic/project-indt/assets/33867391/01415ee3-6235-4fe7-bd67-f2a0418bfc20)

Container do Banco Mysql
backend-db-1
mysql:latest

Container da Aplicação: 
backend-app-1
backend-app

![image](https://github.com/arlansonic/project-indt/assets/33867391/75234945-f6ce-4b0c-ad88-fbdbc2fe6ec0)

Backend já está ON proximo passo rodar o front para fazer a integração. 

Abrir a pasta: FrontEnd-users-indt

Instalar as dependencias: "**YARN INSTALL**". 

Feito a instalação de todos os modulos rodar o comando: NPM START

![image](https://github.com/arlansonic/project-indt/assets/33867391/dbffbeed-2f0f-402b-8e6c-f5b3f5d9e0fb)

A aplicação frontend vai rodar na porta: 3001

Caso não queira entrar na interface para criar o usuário, pode usar o seeders com o comando: 
"**docker-compose exec app npx sequelize-cli db:seed:all**" 
Vai ser criado 2 usuários 1 com nivel admin e outro com nivel "user".

email: john@example.com
senha: 123456 -
nivel: user

email: jane@example.com
password: 123456 -
nivel: admin




