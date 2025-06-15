const express = require("express");
const routes = require("./routes");
const app = express();
const connectToDatabase = require("./database/mongo");
const usersRoutes = require("./routes/users.routes");
const pizzasRoutes = require("./routes/pizzas.routes");
const ordersRoutes = require("./routes/orders.routes");
const authRoutes = require("./routes/auth.routes");
const { errorHandler, notFoundHandler } = require("./middlewares/errorHandler");
const setupSwagger = require("./swagger.js");

connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use("/user", usersRoutes);
app.use("/pizza", pizzasRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);
setupSwagger(app);

// Middleware para rotas não encontradas
app.use(notFoundHandler);

// Middleware para tratamento de erros
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
