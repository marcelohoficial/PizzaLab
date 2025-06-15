# PizzaLab API 🍕

API REST para gerenciamento de pedidos de uma pizzaria, desenvolvida com Node.js, Express e MongoDB.

## API Online

https://pizzalab-l0qm.onrender.com

## 📋 Funcionalidades

### Autenticação

- Login de usuários
- Registro de administradores
- Autenticação via JWT

### Usuários

- Cadastro de clientes
- Listagem de clientes
- Busca de cliente por ID
- Atualização de dados do cliente
- Remoção de cliente

### Pizzas

- Cadastro de pizzas
- Listagem do cardápio
- Busca de pizza por ID
- Atualização de pizza
- Remoção de pizza

### Pedidos

- Criação de pedidos
- Listagem de pedidos
- Busca de pedido por ID
- Atualização de status do pedido
- Remoção de pedido

## 🚀 Tecnologias

- Node.js
- Express
- MongoDB/Mongoose
- JWT para autenticação
- Swagger para documentação
- Cors

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/marcelohoficial/PizzaLab.git
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com:

```
JWT_SECRET=seu_segredo_jwt
```

4. Inicie o servidor:

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 📚 Documentação

A documentação completa da API está disponível através do Swagger UI em:

```
https://pizzalab-l0qm.onrender.com/api-docs
```

## 🔒 Autenticação

A API utiliza JWT (JSON Web Token) para autenticação. Para acessar rotas protegidas, inclua o token no header:

```
Authorization: Bearer <seu_token>
```

## 📌 Rotas

### Públicas

- `POST /auth` - Login
- `POST /user` - Cadastro de cliente
- `GET /` - Rota raiz

### Protegidas (requer autenticação)

- Todas as rotas de usuários (exceto cadastro)
- Todas as rotas de pizzas
- Todas as rotas de pedidos
- Registro de administradores

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC.

## 👤 Autor

**Marcelo Henrique**

- Github: [@marcelohoficial](https://github.com/marcelohoficial)

## ❗ Status dos Pedidos

Os pedidos podem ter os seguintes status:

- Aguardando pagamento
- Preparando pedido
- Seu pedido está a caminho
- Pedido entregue

## 🔧 Scripts

- `npm run dev` - Inicia o servidor em modo desenvolvimento com Nodemon
- `npm start` - Inicia o servidor em modo produção
- `npm test` - Executa os testes (a ser implementado)

## Vídeo demonstração

https://youtu.be/McdxGAqocUA

## Vídeo API Entrega 3

https://youtu.be/uq5NS2dPWus
