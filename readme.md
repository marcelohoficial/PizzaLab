# PizzaLab API 🍕

API para listar pizzas no cardápio da PizzaLab.

## Vídeo demonstração

https://youtu.be/McdxGAqocUA

## Requisitos

- Node.js
- npm

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/marcelohoficial/PizzaLab.git
cd PizzaLab
```

2. Instale as dependências:

```bash
npm install
```

## Executando o projeto

Para desenvolvimento (com hot-reload):

```bash
npm run dev
```

Para produção:

```bash
npm start
```

O servidor estará rodando em: http://localhost:3000

## Rotas disponíveis

### GET /

Retorna uma mensagem de boas-vindas

```bash
curl http://localhost:3000/
```

### POST /entrar

Rota de login

```bash
curl -X POST http://localhost:3000/entrar
```

### POST /user

Rota de cadastro

```bash
curl -X POST http://localhost:3000/user
```

## Tecnologias utilizadas

- Express.js
- Nodemon (desenvolvimento)

## Autor

Marcelo Henrique
