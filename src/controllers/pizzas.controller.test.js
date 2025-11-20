const {
  getAllPizzas,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
} = require("./pizzas.controller");
const Pizza = require("../../models/pizzas");

jest.mock("../../models/pizzas", () => {
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

test("getAllPizzas - nenhum resultado -> mensagem", async () => {
  Pizza.find.mockResolvedValue([]);
  const res = mockRes();
  await getAllPizzas({}, res);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ error: "Nenhuma pizza encontrada" });
});

test("getAllPizzas - sucesso", async () => {
  const list = [{ id: "p1" }];
  Pizza.find.mockResolvedValue(list);
  const res = mockRes();
  await getAllPizzas({}, res);
  expect(res.json).toHaveBeenCalledWith(list);
});

test("getPizzaById - não encontrado -> 404", async () => {
  Pizza.findById.mockResolvedValue(null);
  const res = mockRes();
  const req = { params: { id: "x" } };
  await getPizzaById(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ error: "Pizza não encontrada" });
});

test("getPizzaById - encontrado", async () => {
  const pizza = { id: "p1" };
  Pizza.findById.mockResolvedValue(pizza);
  const res = mockRes();
  const req = { params: { id: "p1" } };
  await getPizzaById(req, res);
  expect(res.json).toHaveBeenCalledWith(pizza);
});

test("createPizza - body vazio -> 400", async () => {
  const res = mockRes();
  const req = { body: {} };
  await createPizza(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Preencha todos os campos" });
});

test("createPizza - sucesso -> 201", async () => {
  const res = mockRes();
  const req = { body: { name: "Margherita", price: 10 } };
  const instance = {
    save: jest.fn().mockResolvedValueOnce({ name: "Margherita", price: 10 }),
  };
  Pizza.mockImplementationOnce(() => instance);
  await createPizza(req, res);
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalled();
});

test("updatePizza - body vazio -> 400", async () => {
  const res = mockRes();
  const req = { body: {}, params: { id: "1" } };
  await updatePizza(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Preencha todos os campos" });
});

test("updatePizza - não encontrado -> 404", async () => {
  Pizza.findByIdAndUpdate.mockResolvedValue(null);
  const res = mockRes();
  const req = { body: { name: "X", price: 5 }, params: { id: "1" } };
  await updatePizza(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ error: "Pizza não encontrada" });
});

test("deletePizza - não encontrado -> 404", async () => {
  Pizza.findByIdAndDelete.mockResolvedValue(null);
  const res = mockRes();
  const req = { params: { id: "x" } };
  await deletePizza(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ error: "Pizza não encontrada" });
});

test("deletePizza - sucesso", async () => {
  Pizza.findByIdAndDelete.mockResolvedValue({ id: "1" });
  const res = mockRes();
  const req = { params: { id: "1" } };
  await deletePizza(req, res);
  expect(res.json).toHaveBeenCalledWith({
    message: "Pizza deletada com sucesso",
  });
});
