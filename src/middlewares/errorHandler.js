const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const isProduction = process.env.NODE_ENV === "production";

  // Log do erro apenas em ambiente de desenvolvimento
  if (!isProduction) {
    console.error(err.stack);
  }

  // Mensagem padrão para erros internos
  const message =
    statusCode === 500
      ? "Erro interno do servidor"
      : err.message || "Erro desconhecido";

  res.status(statusCode).json({
    error: true,
    status: statusCode,
    message,
    ...(isProduction ? {} : { stack: err.stack }), // Exibe a pilha apenas em desenvolvimento
  });
};

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: true,
    status: 404,
    message: "Rota não encontrada",
  });
};

module.exports = { errorHandler, notFoundHandler };
