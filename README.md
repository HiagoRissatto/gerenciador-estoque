# Gerenciador de Estoque

Sistema de gerenciamento de estoque desenvolvido com o objetivo de auxiliar pequenos negócios no controle e organização de seus produtos.

O projeto está sendo desenvolvido como uma aplicação full stack, utilizando **React e TypeScript no frontend**, **Node.js e TypeScript no backend** e **PostgreSQL** para persistência dos dados.

> **Status:** Em desenvolvimento

---

## Sobre o projeto

O Gerenciador de Estoque surgiu com a ideia de criar uma aplicação simples e organizada para pequenos negócios que precisam controlar seus produtos de forma mais eficiente.

A aplicação busca permitir o gerenciamento de informações como:

* Nome do produto
* Marca
* Quantidade em estoque
* Valor
* Data de cadastro
* Outras informações relacionadas ao produto

O projeto também serve como uma oportunidade prática para estudar e aplicar conceitos de desenvolvimento **Full Stack**, organização de código, APIs REST, banco de dados, validação de dados e componentização no React.

---

## Objetivos

Os principais objetivos do projeto são:

* Desenvolver um sistema funcional de controle de estoque.
* Aplicar conceitos de desenvolvimento Full Stack.
* Praticar React e TypeScript.
* Desenvolver uma API utilizando Node.js e TypeScript.
* Trabalhar com banco de dados PostgreSQL.
* Aplicar uma arquitetura organizada no backend.
* Validar dados recebidos pela API.
* Aprender e aplicar conceitos básicos de segurança.
* Criar uma interface simples e fácil de utilizar.

---

## Tecnologias

### Frontend

* React
* TypeScript
* Vite
* Bootstrap
* React Icons
* Motion / Framer Motion
* Chart.js

### Backend

* Node.js
* TypeScript
* Express
* Zod
* PostgreSQL
* `pg`

### Ferramentas

* Git
* GitHub
* npm
* Postman
* Visual Studio Code

---

## Arquitetura

O backend foi organizado utilizando uma separação de responsabilidades entre as diferentes partes da aplicação.

```text
Frontend
   │
   │ HTTP
   ▼
Routes
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
PostgreSQL
```

### Routes

Responsáveis por definir os endpoints disponíveis na API e encaminhar as requisições para os controllers.

Exemplo:

```text
productRoutes
```

### Controller

Responsável por receber a requisição HTTP, validar os dados necessários e retornar a resposta adequada para o cliente.

Exemplo:

```text
productController
```

### Service

Contém as regras relacionadas ao funcionamento da aplicação.

Exemplo:

```text
productService
```

### Repository

Responsável pela comunicação direta com o banco de dados.

Exemplo:

```text
productRepository
```

Essa separação facilita a compreensão e manutenção do projeto, evitando concentrar toda a lógica em um único arquivo.

---

## Estrutura do projeto

A estrutura pode ser organizada da seguinte maneira:

```text
gerenciador-estoque/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── ...
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── database/
│   │   └── ...
│   │
│   ├── .env
│   └── package.json
│
└── README.md
```

> A estrutura pode sofrer alterações conforme novas funcionalidades forem adicionadas ao projeto.

---

# Funcionalidades

## Produtos

A principal entidade da aplicação é o **Produto**.

O sistema deverá permitir realizar as operações básicas de um CRUD:

* [x] Cadastrar produto
* [x] Consultar produtos
* [ ] Atualizar produto
* [ ] Excluir produto

### Informações do produto

Um produto possui informações como:

```text
id
nome
marca
quantidade
valor
data_cadastro
```

---

# API

A API foi desenvolvida utilizando **Express** e segue o padrão REST.

## Produtos

### Listar produtos

```http
GET /products
```

Retorna os produtos cadastrados no banco de dados.

---

### Cadastrar produto

```http
POST /products
```

Recebe os dados do produto no corpo da requisição.

Exemplo:

```json
{
  "nome": "Teclado Mecânico",
  "marca": "Logitech",
  "quantidade": 10,
  "valor": 299.90
}
```

---

## Validação

Os dados recebidos pela API são validados utilizando **Zod**.

Exemplo das regras utilizadas no projeto:

* Nome com no mínimo 5 caracteres.
* Marca com no mínimo 3 caracteres.
* Quantidade deve ser um número inteiro.
* Valor deve ser positivo.
* Valor deve possuir precisão de centavos.

A validação é realizada antes dos dados serem enviados para o banco de dados.

Isso evita que informações inválidas sejam armazenadas.

---

# Banco de dados

O projeto utiliza **PostgreSQL** para armazenamento dos dados.

A comunicação entre o backend e o banco é realizada utilizando o pacote:

```text
pg
```

A conexão utiliza variáveis de ambiente para evitar que informações de acesso ao banco sejam diretamente inseridas no código.

Exemplo:

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

> O arquivo `.env` não deve ser enviado para o GitHub.

---

# Segurança

Um dos pontos considerados durante o desenvolvimento foi o tratamento de informações sensíveis.

Dados como:

* Senhas
* CPF
* CNPJ
* Endereço

devem possuir controle adequado de acesso.

Senhas não devem ser armazenadas diretamente no banco de dados. A ideia é utilizar **hashing** para proteger essas informações.

Além disso, informações como CPF, CNPJ e endereço devem possuir acesso controlado conforme a necessidade da aplicação.

---

# Como executar o projeto

## Pré-requisitos

Antes de executar o projeto, é necessário possuir instalado:

* Node.js
* npm
* PostgreSQL
* Git

---

## Clonar o projeto

```bash
git clone <URL_DO_REPOSITORIO>
```

Depois:

```bash
cd gerenciador-estoque
```

---

# Executando o Backend

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env` com as informações do PostgreSQL.

Depois execute o projeto:

```bash
npm run dev
```

O servidor será iniciado na porta:

```text
3000
```

---

# Executando o Frontend

Em outro terminal:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

O Vite disponibilizará a aplicação localmente.

---

# Fluxo de uma requisição

Um dos conceitos importantes trabalhados no projeto foi entender o caminho de uma requisição dentro da aplicação.

Por exemplo, ao cadastrar um produto:

```text
Frontend
   │
   │ POST /products
   ▼
Route
   │
   ▼
Controller
   │
   │ valida dados
   ▼
Zod
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
PostgreSQL
```

Cada parte possui uma responsabilidade específica.

Isso permite que o código fique mais organizado e facilita a identificação de problemas durante o desenvolvimento.

---

# Próximos passos

O projeto ainda está em desenvolvimento e algumas funcionalidades planejadas são:

* [ ] Finalizar CRUD de produtos
* [ ] Criar tela de cadastro de produtos
* [ ] Criar tela de edição
* [ ] Criar exclusão de produtos
* [ ] Criar dashboard
* [ ] Exibir informações do estoque através de gráficos
* [ ] Criar sistema de autenticação
* [ ] Implementar controle de acesso
* [ ] Melhorar tratamento de erros
* [ ] Melhorar responsividade
* [ ] Implementar filtros e pesquisas
* [ ] Melhorar experiência do usuário

---

# Conceitos praticados

Durante o desenvolvimento do projeto estão sendo praticados conceitos como:

### Frontend

* Componentização
* Props
* Hooks
* Estado
* TypeScript
* Requisições HTTP
* Interfaces e tipos
* Responsividade
* Organização de componentes

### Backend

* Node.js
* Express
* TypeScript
* API REST
* Rotas
* Controllers
* Services
* Repositories
* Validação com Zod
* Variáveis de ambiente
* Tratamento de erros

### Banco de dados

* PostgreSQL
* SQL
* `SELECT`
* `INSERT`
* Relacionamento entre aplicação e banco
* Persistência de dados

---

# Objetivo de aprendizado

Além de ser uma aplicação funcional, este projeto possui como objetivo principal colocar em prática conceitos aprendidos durante os estudos de desenvolvimento web.

A proposta é desenvolver o sistema de maneira progressiva, priorizando código organizado, legível e de fácil compreensão.

O projeto também busca demonstrar a evolução no desenvolvimento de aplicações completas, desde a interface do usuário até a API e o banco de dados.

---

## Autor

**Hiagao**

Estudante de Sistemas para Internet, com foco em desenvolvimento de software e aprendizado contínuo em tecnologias web.

---

## Licença

Este projeto foi desenvolvido para fins de estudo e portfólio.
