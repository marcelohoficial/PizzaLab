const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("./orders.controller");
const Order = require("../../models/orders");

jest.mock("../../models/orders", () => {
  const mock = function (data) {
    mock._lastInstance = data;
    return { save: mock.saveMock };
  };
  mock.find = jest.fn();
  mock.findById = jest.fn();
  mock.findByIdAndUpdate = jest.fn();
  mock.findByIdAndDelete = jest.fn();
  mock.saveMock = jest.fn();
  return mock;
});

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

beforeEach(() => {
  jest.clearAllMocks();
});

test("getAllOrders - retorna mensagem quando nenhum pedido encontrado", async () => {
  Order.find.mockResolvedValue([]);
  const res = mockRes();
  await getAllOrders({}, res);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ error: "Nenhum pedido encontrado" });
});

test("getAllOrders - retorna lista de pedidos", async () => {
  const fake = [{ id: "1" }];
  Order.find.mockResolvedValue(fake);
  const res = mockRes();
  await getAllOrders({}, res);
  expect(res.json).toHaveBeenCalledWith(fake);
});

test("getOrderById - não encontrado", async () => {
  Order.findById.mockResolvedValue(null);
  const res = mockRes();
  const req = { params: { id: "x" } };
  await getOrderById(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ error: "Pedido não encontrado" });
});

test("getOrderById - encontrado", async () => {
  const order = { id: "1" };
  // Simula populate retornando o próprio objeto
  Order.findById.mockResolvedValue(order);
  const res = mockRes();
  const req = { params: { id: "1" } };
  await getOrderById(req, res);
  expect(res.json).toHaveBeenCalledWith(order);
});

test("createOrder - body vazio -> 400", async () => {
  const res = mockRes();
  const req = { body: {} };
  await createOrder(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Preencha todos os campos" });
});

test("createOrder - sem client_id -> 400", async () => {
  const res = mockRes();
  const req = { body: { items: [{ pizzaId: "p", quantity: 1 }] } };
  await createOrder(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Nenhum cliente encontrado" });
});

test("createOrder - sem items -> 400", async () => {
  const res = mockRes();
  const req = { body: { client_id: "c" } };
  await createOrder(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Nenhum item encontrado" });
});

test("createOrder - sucesso -> 201", async () => {
  const res = mockRes();
  const req = {
    body: { client_id: "c", items: [{ pizzaId: "p", quantity: 1 }] },
  };
  Order.saveMock.mockResolvedValueOnce();
  // Ajusta o comportamento do construtor para retornar instância com save que resolve
  const instance = {
    save: jest.fn().mockResolvedValueOnce({ client_id: "c", items: [] }),
  };
  Order.mockImplementationOnce(() => instance);
  await createOrder(req, res);
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalled();
});

test("updateOrder - body vazio -> 400", async () => {
  const res = mockRes();
  const req = { body: {}, params: { id: "1" } };
  await updateOrder(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Preencha todos os campos" });
});

test("updateOrder - transição de status inválida -> 400", async () => {
  const res = mockRes();
  const order = {
    isPaid: false,
    status: "Aguardando pagamento",
    items: [],
    _id: "1",
  };
  Order.findById.mockResolvedValue(order);
  const req = {
    body: { isPaid: false, status: "Pedido entregue" },
    params: { id: "1" },
  };
  await updateOrder(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    error: "Transição de status inválida.",
  });
});

test("updateOrder - pedido não encontrado no update -> 404", async () => {
  const res = mockRes();
  const order = {
    isPaid: false,
    status: "Aguardando pagamento",
    items: [],
    _id: "1",
  };
  Order.findById.mockResolvedValue(order);
  Order.findByIdAndUpdate.mockResolvedValue(null);
  const req = {
    body: { isPaid: false, status: "Preparando pedido" },
    params: { id: "1" },
  };
  await updateOrder(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ error: "Pedido não encontrado" });
});

test("deleteOrder - não encontrado -> 404", async () => {
  Order.findByIdAndDelete.mockResolvedValue(null);
  const res = mockRes();
  const req = { params: { id: "x" } };
  await deleteOrder(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ error: "Pedido não encontrado" });
});

test("deleteOrder - sucesso", async () => {
  Order.findByIdAndDelete.mockResolvedValue({ id: "1" });
  const res = mockRes();
  const req = { params: { id: "1" } };
  await deleteOrder(req, res);
  expect(res.json).toHaveBeenCalledWith({
    message: "Pedido deletado com sucesso",
  });
});
