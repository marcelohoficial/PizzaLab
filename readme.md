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
- Jest para testes unitários
- GitHub Actions para CI/CD
- Render para deploy automático
- Cors

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/marcelohoficial/PizzaLab.git
cd back
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com:

```
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/pizzalab
JWT_SECRET=seu_segredo_jwt
PORT=3000
NODE_ENV=development
```

4. Inicie o servidor:

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 🧪 Testes

### Executar todos os testes

```bash
npm test
```

### Executar testes em modo watch (desenvolvimento)

```bash
npm test -- --watch
```

### Gerar relatório de cobertura de testes

```bash
npm test -- --coverage
```

### Testes Inclusos

A suite de testes cobre os principais controllers da aplicação:

#### Orders Controller Tests

- ✅ Listagem de pedidos (vazio e com dados)
- ✅ Busca de pedido por ID (encontrado/não encontrado)
- ✅ Criação de pedido (validações de body, client_id, items)
- ✅ Atualização de pedido (transições de status válidas/inválidas)
- ✅ Remoção de pedido

#### Pizzas Controller Tests

- ✅ Listagem de pizzas (vazio e com dados)
- ✅ Busca de pizza por ID (encontrado/não encontrado)
- ✅ Criação de pizza (validação de campos)
- ✅ Atualização de pizza (validação e não encontrado)
- ✅ Remoção de pizza

#### Users Controller Tests

- ✅ Listagem de clientes (vazio e com dados)
- ✅ Busca de cliente por ID (encontrado/não encontrado)
- ✅ Criação de cliente (validação de nome, telefone, duplicação)
- ✅ Atualização de cliente (validações pós-atualização)
- ✅ Remoção de cliente

**Framework:** Jest com mocks do Mongoose  
**Total de testes:** 30+ casos de teste

## 📚 Documentação

A documentação completa da API está disponível através do Swagger UI em:

```
https://pizzalab-l0qm.onrender.com/api-docs
```

Localmente em desenvolvimento:

```
http://localhost:3000/api-docs
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

## 🔄 CI/CD - Pipeline Automático (GitHub Actions + Render)

### O que o Pipeline CI Faz:

O projeto possui um workflow automatizado de Integração Contínua e Deploy que executa:

1. **Verificação de Dependências** — Instala todas as dependências do projeto
2. **Execução de Testes** — Roda a suite completa de testes Jest
3. **Validação** — Verifica se todos os testes passam
4. **Deploy Automático** — Realiza deploy no Render apenas se os testes forem bem-sucedidos

### Fluxo do Pipeline:

```
Push para branch main ou Pull Request
         ↓
Job 1: Install & Test
  - Checkout do código
  - Setup Node.js 18
  - npm ci (instala dependências)
  - npm test (executa testes)
         ↓
   Testes passaram? ✅
         ↓
Job 2: Deploy on success (apenas se testes OK)
  - npm ci --production (instala apenas deps de produção)
  - Trigger deploy no Render
  - Aguarda conclusão do deploy (timeout 10 min)
         ↓
Aplicação atualizada em produção ✅
```

### Configurar Deploy Automático (Render)

1. Acesse [render.com](https://render.com) e crie um Web Service
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente no Render:

   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

4. No repositório GitHub, vá em:

   - **Settings → Secrets and variables → Actions**
   - Clique em **New repository secret**

5. Adicione os seguintes secrets:
   - `RENDER_API_KEY` — Sua chave de API do Render (obtém em Account Settings)
   - `RENDER_SERVICE_ID` — ID do seu serviço no Render (formato: srv-xxxxx)

### Monitorar Execução do Pipeline

1. Acesse a aba **Actions** no seu repositório GitHub
2. Veja em tempo real a execução dos jobs
3. Logs detalhados de cada etapa (testes, build, deploy)
4. Notificações automáticas em caso de falha

### Exemplo de Execução Bem-Sucedida

```
✅ test - Install & Test (5 min)
   ✅ Checkout
   ✅ Use Node.js 18
   ✅ Install dependencies
   ✅ Run tests

✅ deploy - Deploy on success (3 min)
   ✅ Trigger deploy on Render
   ✅ Deploy criado: xxxxx
   ✅ Deploy concluído com sucesso
```

### Benefícios do Pipeline CI/CD

- 🚀 **Deploy Automático** — Sem necessidade de manual após push
- 🧪 **Qualidade Garantida** — Apenas código com testes passando vai para produção
- 📊 **Rastreabilidade** — Logs completos de cada deploy
- 🛑 **Rollback Automático** — Falha nos testes = nenhum deploy
- ⚡ **Rapidez** — Deploy em poucos minutos após push
- 🔐 **Segurança** — Secrets armazenados de forma segura

## ❗ Status dos Pedidos

Os pedidos podem ter os seguintes status:

- Aguardando pagamento
- Preparando pedido
- Seu pedido está a caminho
- Pedido entregue

## 🔧 Scripts

- `npm run dev` - Inicia o servidor em modo desenvolvimento com Nodemon
- `npm start` - Inicia o servidor em modo produção
- `npm test` - Executa todos os testes unitários
- `npm test -- --watch` - Executa testes em modo watch
- `npm test -- --coverage` - Gera relatório de cobertura de testes

## 📁 Estrutura do Projeto

```
src/
├── controllers/
│   ├── orders.controller.js
│   ├── orders.controller.test.js
│   ├── pizzas.controller.js
│   ├── pizzas.controller.test.js
│   ├── users.controller.js
│   └── users.controller.test.js
├── models/
│   ├── clients.js
│   ├── orders.js
│   └── pizzas.js
├── routes/
│   ├── auth.routes.js
│   ├── orders.routes.js
│   ├── pizzas.routes.js
│   ├── users.routes.js
│   └── index.js
├── middlewares/
│   ├── auth.js
│   └── errorHandler.js
├── database/
│   └── mongo.js
├── swagger.js
└── index.js
.github/
└── workflows/
    └── ci.yml (Pipeline CI/CD)
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Certifique-se que os testes passam (`npm test`)
5. Push para a branch (`git push origin feature/AmazingFeature`)
6. Abra um Pull Request

**Nota:** Todo Pull Request será automaticamente testado pelo pipeline CI. Apenas PRs com testes aprovados podem ser merged.

## 📝 Licença

Este projeto está sob a licença ISC.

## 👤 Autor

**Marcelo Henrique**

- Github: [@marcelohoficial](https://github.com/marcelohoficial)

## 📹 Vídeos Demonstração

- Demonstração Geral: https://youtu.be/McdxGAqocUA
- API Entrega 3: https://youtu.be/uq5NS2dPWus

---

**Última atualização:** 19 de novembro de 2025
