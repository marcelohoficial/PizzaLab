const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("./orders.controller");
const Order = require("../models/orders");

jest.mock("../models/orders", () => {
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

function mockFindByIdWithPopulate(result) {
  Order.findById.mockImplementationOnce(() => {
    return {
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue(result),
      }),
    };
  });
}

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
  mockFindByIdWithPopulate(null);
  const res = mockRes();
  const req = { params: { id: "-1" } };
  await getOrderById(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ error: "Pedido não encontrado" });
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

test("updateOrder - pedido não encontrado no update -> 400", async () => {
  const res = mockRes();
  const order = {
    isPaid: false,
    status: "Aguardando pagamento",
    items: [],
    _id: "1",
  };
  mockFindByIdWithPopulate(order);
  Order.findByIdAndUpdate.mockResolvedValue(null);
  const req = {
    body: { isPaid: false, status: "Preparando pedido" },
    params: { id: "1" },
  };
  await updateOrder(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    error: "Erro ao atualizar o pedido",
  });
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
