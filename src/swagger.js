const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PizzaLab API",
      version: "1.0.0",
      description: "Um sistema para Gestão de Pedidos de Pizzaria",
    },
    servers: [
      {
        url: "https://pizzalab-l0qm.onrender.com",
        description: "Servidor de Produção",
      },
      {
        url: "http://localhost:3000",
        description: "Servidor de Desenvolvimento",
      },
    ],
    tags: [
      {
        name: "Autenticação",
        description: "Operações de autenticação do usuário",
      },
      {
        name: "Usuários",
        description: "Operações relacionadas aos usuários do sistema",
      },
      {
        name: "Pizzas",
        description: "Operações relacionadas às pizzas disponíveis",
      },
      {
        name: "Pedidos",
        description: "Operações relacionadas aos pedidos realizados",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Insira o token JWT no formato: **Bearer &lt;seu_token&gt;**",
        },
      },
      schemas: {
        Client: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "João Silva",
            },
            phone: {
              type: "string",
              example: "(11) 91234-5678",
            },
            address: {
              type: "string",
              example: "Rua das Pizzas, 123",
            },
          },
          required: ["name", "phone", "address"],
        },
        Order: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 101,
            },
            clientId: {
              type: "integer",
              example: 1,
            },
            status: {
              type: "string",
              enum: ["pending", "in_progress", "delivered"],
              example: "pending",
            },
            totalPrice: {
              type: "number",
              format: "float",
              example: 49.9,
            },
          },
          required: ["clientId", "status", "totalPrice"],
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, "./routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
