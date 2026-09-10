Gerenciador de Tarefas MERN

Sistema gerenciador de tarefas desenvolvido utilizando a arquitetura MERN:

MongoDB
Express.js
React
Node.js

A aplicação possui autenticação de usuários utilizando JWT, armazenamento seguro de senhas com bcrypt e CRUD completo de tarefas.

1. Funcionalidades
Autenticação
Cadastro de usuário
Login
Criptografia das senhas com bcrypt
Autenticação utilizando JWT
Proteção das rotas de tarefas
Gerenciamento de tarefas
Criar tarefas
Listar tarefas
Visualizar uma tarefa específica
Editar tarefas
Alterar o status
Excluir tarefas
Cada usuário visualiza somente suas próprias tarefas
Segurança
Senhas não são armazenadas em texto plano
JWT protegido por variável de ambiente
CORS configurado
Validação dos dados recebidos
Sanitização de entradas para MongoDB
Helmet para headers de segurança
Validação dos IDs do MongoDB
Limitação do tamanho das requisições JSON
2. Tecnologias utilizadas
Back-end
Node.js
Express
MongoDB
Mongoose
bcrypt
JSON Web Token
CORS
dotenv
express-validator
express-mongo-sanitize
helmet
Front-end
React
Vite
React Router DOM
Axios ou Fetch API
3. Pré-requisitos

Antes de iniciar, certifique-se de possuir instalado:

Node.js
npm
Git
Uma conta no MongoDB Atlas

Para verificar o Node.js:

node -v


Para verificar o npm:

npm -v


Para verificar o Git:

git --version

4. Clonar o projeto

Abra o terminal e execute:

git clone URL_DO_REPOSITORIO


Entre na pasta do projeto:

cd gerenciador-de-tarefas-mern


Substitua URL_DO_REPOSITORIO pela URL do repositório do GitHub.

5. Estrutura do projeto

Depois de clonar o projeto, a estrutura deverá ser semelhante a:

gerenciador-de-tarefas-mern/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── taskController.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── taskRoutes.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js
│   │   │   └── validation.js
│   │   │
│   │   └── server.js
│   │
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── .gitignore
│   └── package.json
│
└── README.md

6. Configuração do MongoDB Atlas

A aplicação utiliza MongoDB como banco de dados.

É necessário criar um banco no MongoDB Atlas.

6.1 Criar uma conta

Acesse o MongoDB Atlas e crie uma conta.

Depois de entrar:

Crie um projeto.
Crie um cluster.
Configure um usuário para o banco.
Configure o acesso à rede.
Copie a string de conexão.

A string terá um formato semelhante a:

mongodb+srv://usuario:senha@cluster.mongodb.net/gerenciador-tarefas


Não publique essa informação no GitHub.

7. Configuração do Back-end

Entre na pasta do backend:

cd backend


Instale as dependências:

npm install


Caso o projeto ainda não possua as dependências instaladas, utilize:

npm install express mongoose cors dotenv bcrypt jsonwebtoken express-validator express-mongo-sanitize helmet

8. Criar o arquivo .env

Dentro da pasta backend, crie um arquivo chamado:

.env


A estrutura deverá ser:

backend/
├── .env
├── .env.example
├── package.json
└── src/

9. Configurar as variáveis de ambiente

Dentro do arquivo .env, coloque:

PORT=5000

MONGO_URI=mongodb+srv://USUARIO:SENHA@SEU_CLUSTER.mongodb.net/gerenciador-tarefas

JWT_SECRET=sua_chave_secreta

CLIENT_URL=http://localhost:5173


Substitua:

USUARIO


pelo usuário criado no MongoDB Atlas.

Substitua:

SENHA


pela senha do banco.

Substitua a URL do cluster pela string fornecida pelo MongoDB Atlas.

Crie também uma chave secreta forte para:

JWT_SECRET


Exemplo:

JWT_SECRET=uma_chave_secreta_longa_e_aleatoria


Em um ambiente real, utilize uma chave longa e aleatória.

10. Importante sobre o arquivo .env

O arquivo .env contém informações sensíveis.

Nunca envie o .env para o GitHub.

O arquivo:

.env


deve estar no .gitignore.

Exemplo:

node_modules/
.env
.env.local
.env.*.local


O projeto possui um arquivo:

.env.example


Esse arquivo serve apenas como modelo.

Exemplo:

PORT=5000
MONGO_URI=sua_string_do_mongodb_atlas
JWT_SECRET=sua_chave_secreta
CLIENT_URL=http://localhost:5173

11. Executar o Back-end

Dentro da pasta backend, execute:

npm start


Caso o projeto utilize o nodemon, pode ser utilizado:

npm run dev


Se tudo estiver correto, deverá aparecer uma mensagem semelhante a:

MongoDB conectado com sucesso!
Servidor rodando na porta 5000


A API estará disponível em:

http://localhost:5000

12. Verificar se a API está funcionando

Abra no navegador:

http://localhost:5000/api/health


A API deverá retornar:

{
  "message": "API funcionando."
}

13. Principais endpoints da API
Autenticação
Cadastro
POST /api/auth/register


Exemplo de requisição:

{
  "name": "João",
  "email": "joao@email.com",
  "password": "123456"
}

Login
POST /api/auth/login


Exemplo:

{
  "email": "joao@email.com",
  "password": "123456"
}


Após o login, a API retornará um JWT.

14. Endpoints de tarefas

Todas as rotas de tarefas exigem autenticação.

O token deve ser enviado no cabeçalho:

Authorization: Bearer SEU_TOKEN

Listar tarefas
GET /api/tasks

Buscar uma tarefa
GET /api/tasks/:id

Criar tarefa
POST /api/tasks


Exemplo:

{
  "title": "Estudar React",
  "description": "Estudar componentes e hooks",
  "status": "pendente"
}

Atualizar tarefa
PUT /api/tasks/:id


Exemplo:

{
  "title": "Estudar React e Node.js",
  "description": "Estudar componentes, hooks e API REST",
  "status": "pendente"
}

Alterar somente o status
PATCH /api/tasks/:id/status


Exemplo:

{
  "status": "concluída"
}


Os status permitidos são:

pendente
concluída

Excluir tarefa
DELETE /api/tasks/:id

15. Configuração do Front-end

Abra outro terminal.

Na raiz do projeto, entre na pasta:

cd frontend


Instale as dependências:

npm install


Caso o React ainda não tenha sido criado:

npm create vite@latest .


Selecione:

React


e depois:

JavaScript


ou:

TypeScript


de acordo com a implementação escolhida.

16. Instalar o React Router

Dentro da pasta frontend, execute:

npm install react-router-dom


Se estiver utilizando Axios:

npm install axios

17. Configuração da URL da API

O frontend deve realizar as requisições para o backend.

Em desenvolvimento, a API estará disponível em:

http://localhost:5000/api


Portanto, os serviços do frontend deverão utilizar essa URL como base.

Exemplo com Axios:

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

export default api;

18. Executar o Front-end

Dentro da pasta frontend, execute:

npm run dev


O Vite deverá apresentar uma URL semelhante a:

http://localhost:5173


Abra essa URL no navegador.

19. Fluxo de utilização

O funcionamento esperado do sistema é:

Usuário
   ↓
Tela de Cadastro
   ↓
Cadastro realizado
   ↓
Tela de Login
   ↓
Login
   ↓
JWT recebido
   ↓
Token armazenado no frontend
   ↓
Dashboard
   ↓
Listagem das tarefas
   ↓
Criar / Editar / Concluir / Excluir

20. Segurança

O projeto segue princípios de Secure by Design.

Senhas

As senhas nunca são armazenadas em texto plano.

Durante o cadastro:

Senha
  ↓
bcrypt.hash()
  ↓
Hash
  ↓
MongoDB


Durante o login:

Senha informada
  ↓
bcrypt.compare()
  ↓
Senha válida?
  ↓
JWT

JWT

O segredo utilizado para assinar o JWT fica somente no arquivo .env:

JWT_SECRET=...


O segredo não deve ser colocado diretamente no código.

CORS

O backend permite somente a origem configurada:

CLIENT_URL=http://localhost:5173

Validação

Os dados enviados pelo cliente são validados no backend.

São verificados, entre outros:

Nome;
Email;
Senha;
Título da tarefa;
Descrição;
Status;
ID da tarefa.
21. Isolamento das tarefas

Cada tarefa pertence a um usuário.

O backend utiliza o ID do usuário obtido através do JWT.

Por exemplo:

Task.find({
  user: req.userId
});


Dessa forma, um usuário não consegue visualizar as tarefas de outro usuário.

As operações de alteração e exclusão também verificam o proprietário da tarefa.

22. Testando a aplicação

Para testar a API, recomenda-se utilizar ferramentas como:

Postman
Insomnia
Thunder Client
Ordem recomendada dos testes
Verificar se o servidor está funcionando.
Cadastrar um usuário.
Fazer login.
Copiar o JWT retornado.
Enviar o JWT nas requisições de tarefas.
Criar uma tarefa.
Listar as tarefas.
Buscar uma tarefa específica.
Editar a tarefa.
Alterar o status.
Excluir a tarefa.
Criar um segundo usuário.
Verificar se o segundo usuário não consegue acessar as tarefas do primeiro.
23. Possíveis problemas
Erro de conexão com MongoDB

Verifique:

MONGO_URI=...


Confirme também se:

O usuário do MongoDB está correto;
A senha está correta;
O cluster está ativo;
O endereço do MongoDB está correto;
O acesso à rede foi configurado.
Erro de CORS

Verifique:

CLIENT_URL=http://localhost:5173


Confirme também se o frontend realmente está sendo executado nessa porta.

Token inválido

Verifique se a requisição contém:

Authorization: Bearer SEU_TOKEN


Não envie somente:

Authorization: SEU_TOKEN

24. Executando o projeto completo

É necessário executar o backend e o frontend.

Terminal 1 — Backend
cd gerenciador-de-tarefas-mern/backend
npm install
npm run dev

Terminal 2 — Frontend
cd gerenciador-de-tarefas-mern/frontend
npm install
npm run dev


Depois abra:

http://localhost:5173

25. Git e GitHub

Antes de enviar alterações:

git status


Adicione os arquivos:

git add .


Crie o commit:

git commit -m "Implementa sistema gerenciador de tarefas"


Envie para o GitHub:

git push origin main


Antes do git push, confirme que o arquivo .env não está sendo enviado.

26. Colaboração da dupla

O projeto deve possuir os integrantes como colaboradores do repositório.

Cada integrante deve:

Clonar o projeto;
Criar seu próprio .env;
Instalar as dependências;
Criar sua própria configuração do MongoDB;
Executar o backend;
Executar o frontend.

As credenciais do banco de dados e o JWT Secret não devem ser compartilhados através do GitHub.

27. Comandos resumidos
Clonar
git clone URL_DO_REPOSITORIO
cd gerenciador-de-tarefas-mern

Backend
cd backend
npm install


Criar:

.env


Configurar as variáveis:

PORT=5000
MONGO_URI=sua_string_do_mongodb
JWT_SECRET=sua_chave_secreta
CLIENT_URL=http://localhost:5173


Executar:

npm run dev

Frontend

Em outro terminal:

cd frontend
npm install
npm run dev


Acessar:

http://localhost:5173

28. Checklist de entrega

Antes de entregar o projeto, verifique:

 Repositório criado no GitHub
 Integrantes adicionados como colaboradores
 Backend funcionando
 Frontend funcionando
 MongoDB conectado
 Cadastro funcionando
 Login funcionando
 JWT funcionando
 CRUD de tarefas funcionando
 Tarefas separadas por usuário
 Senhas utilizando bcrypt
 CORS configurado
 Validação de dados implementada
 .env não está no GitHub
 .env.example está no GitHub
 README atualizado
 Projeto testado do início ao fim
29. Autores

Projeto desenvolvido por:

Nome do integrante 1
Nome do integrante 2

Curso:

Nome do curso

Instituição:

Nome da instituição

Ano:

2026


Esse README já cobre o ponto principal solicitado na **Etapa 4**: uma pessoa que nunca abriu o projeto deve conseguir seguir o roteiro desde o `git clone`, instalar as dependências, criar o `.env`, configurar o MongoDB e levantar **backend + frontend**.

Só substitua no final os nomes dos integrantes, curso e instituição e, no início do procedimento, a `URL_DO_REPOSITORIO` pelo endereço real do GitHub.
