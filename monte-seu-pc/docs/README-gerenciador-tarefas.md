# Gerenciador de Tarefas — MERN

Projeto desenvolvido para a disciplina de Desenvolvimento WEB.

## Resumo

Sistema de gerenciamento de tarefas com autenticação de usuários, cadastro de contas e operações de criação, consulta, edição e exclusão de tarefas. A aplicação permitirá que cada usuário gerencie suas próprias tarefas de forma organizada e segura, utilizando uma API REST integrada a um banco de dados MongoDB.

## Integrantes — Dupla

* Heldemar Soares Braga
* Luiz Felipe dos Santos Maciel

## Tecnologias utilizadas

### Back-end

* Node.js — Ambiente de execução JavaScript.
* Express.js — Framework para criação da API REST.
* MongoDB Atlas — Banco de dados NoSQL em nuvem.
* Mongoose — Modelagem e interação com o MongoDB.
* CORS — Controle de acesso entre diferentes origens.
* Dotenv — Gerenciamento de variáveis de ambiente.
* Bcrypt — Criptografia de senhas por meio de hash.
* JSON Web Token (JWT) — Autenticação e gerenciamento de sessões.

### Front-end

* React — Biblioteca para construção da interface.
* Vite — Ferramenta de inicialização e desenvolvimento do projeto.
* React Router DOM — Gerenciamento de rotas e navegação.
* Axios ou Fetch — Comunicação com a API REST.
* JavaScript ou TypeScript — Linguagem de programação.

## Estrutura do projeto

A organização do repositório segue o princípio da separação de responsabilidades entre o back-end e o front-end.

```
gerenciador-de-tarefas-mern/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── Lógica de negócios e requisições
│   │   ├── models/
│   │   │   └── Schemas do Mongoose (User e Task)
│   │   ├── routes/
│   │   │   └── Definição dos endpoints REST
│   │   ├── middlewares/
│   │   │   └── Autenticação JWT, CORS e tratamento de erros
│   │   └── server.js
│   │
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Componentes reutilizáveis da interface
│   │   ├── pages/
│   │   │   ├── Login
│   │   │   ├── Cadastro
│   │   │   └── Dashboard de Tarefas
│   │   ├── services/
│   │   │   └── Comunicação com a API
│   │   └── App.jsx
│   │
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

## Funcionalidades do sistema

A aplicação será desenvolvida com as seguintes funcionalidades:

### Autenticação de usuários

* Cadastro de novos usuários.
* Login utilizando e-mail e senha.
* Criptografia das senhas por meio de hash com bcrypt.
* Autenticação utilizando JSON Web Token (JWT).
* Proteção das rotas de gerenciamento de tarefas.

### Gerenciamento de tarefas

Cada usuário poderá:

* Criar novas tarefas.
* Visualizar suas próprias tarefas.
* Editar informações de uma tarefa.
* Excluir tarefas.
* Alterar o status de uma tarefa entre `pendente` e `concluída`.

### Interface do usuário

* Tela de login.
* Tela de cadastro.
* Dashboard de tarefas.
* Formulário para criação e edição de tarefas.
* Navegação entre as páginas por meio do React Router DOM.

## Modelagem do banco de dados

O banco de dados será desenvolvido utilizando MongoDB, com a biblioteca Mongoose para a definição dos schemas.

### Modelo User

| Campo    | Tipo   | Regras                           |
| -------- | ------ | -------------------------------- |
| name     | String | Obrigatório                      |
| email    | String | Obrigatório e único              |
| password | String | Obrigatório e armazenado em hash |

### Modelo Task

| Campo       | Tipo     | Regras                                |
| ----------- | -------- | ------------------------------------- |
| title       | String   | Obrigatório                           |
| description | String   | Opcional                              |
| status      | String   | pendente ou concluída                 |
| user        | ObjectId | Referência obrigatória ao modelo User |

Cada tarefa estará associada a um usuário, garantindo que o acesso aos dados seja individualizado.

## Arquitetura da aplicação

O sistema seguirá uma arquitetura cliente-servidor, com comunicação entre o front-end desenvolvido em React e o back-end desenvolvido em Node.js com Express.

```
                 GERENCIADOR DE TAREFAS MERN
                              │
                 ┌────────────┴────────────┐
                 │                         │
          FRONT-END                    BACK-END
            React                    Node.js + Express
                 │                         │
                 │                    API REST
                 │                         │
                 └────────────┬────────────┘
                              │
                     Autenticação JWT
                              │
                              ▼
                       MongoDB Atlas
                              │
                              ▼
                     Dados dos usuários
                       e suas tarefas
```
