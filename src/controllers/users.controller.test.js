const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require("./users.controller");
const Client = require("../models/clients");

jest.mock("../models/clients", () => {
  const mock = function (data) {
    mock._lastInstance = data;
    return { save: mock.saveMock };
  };
  mock.find = jest.fn();
  mock.findById = jest.fn();
  mock.findOne = jest.fn();
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

test("getAllClients - retorna mensagem quando nenhum cliente encontrado", async () => {
  Client.find.mockResolvedValue([]);
  const res = mockRes();
  await getAllClients({}, res);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ error: "Nenhum cliente encontrado" });
});

test("getAllClients - retorna lista de clientes", async () => {
  const list = [{ id: "1" }];
  Client.find.mockResolvedValue(list);
  const res = mockRes();
  await getAllClients({}, res);
  expect(res.json).toHaveBeenCalledWith(list);
});

test("getClientById - não encontrado", async () => {
  Client.findById.mockResolvedValue(null);
  const res = mockRes();
  const req = { params: { id: "x" } };
  await getClientById(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ error: "Cliente não encontrado" });
});

test("getClientById - encontrado", async () => {
  const client = { id: "1" };
  Client.findById.mockResolvedValue(client);
  const res = mockRes();
  const req = { params: { id: "1" } };
  await getClientById(req, res);
  expect(res.json).toHaveBeenCalledWith(client);
});

test("createClient - body vazio -> 400", async () => {
  const res = mockRes();
  const req = { body: {} };
  await createClient(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Preencha todos os campos" });
});

test("createClient - cliente já existe -> 400", async () => {
  Client.findOne.mockResolvedValue({ id: "exists" });
  const res = mockRes();
  const req = { body: { name: "Joao", phone: "1234567890", password: "pwd" } };
  await createClient(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Cliente já existe" });
});

test("createClient - nome inválido -> 400", async () => {
  Client.findOne.mockResolvedValue(null);
  const res = mockRes();
  const req = { body: { name: "Jo", phone: "1234567890", password: "pwd" } }; // name < 3
  await createClient(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    error: "Você deve informar um nome válido",
  });
});

test("createClient - telefone inválido -> 400", async () => {
  Client.findOne.mockResolvedValue(null);
  const res = mockRes();
  const req = { body: { name: "Joao", phone: "abc", password: "pwd" } };
  await createClient(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    error: "Você deve informar um telefone válido",
  });
});

test("createClient - sucesso -> 201", async () => {
  Client.findOne.mockResolvedValue(null);
  const res = mockRes();
  const req = { body: { name: "Joao", phone: "1234567890", password: "pwd" } };
  await createClient(req, res);
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalled();
});

test("updateClient - body vazio -> 400", async () => {
  const res = mockRes();
  const req = { body: {}, params: { id: "1" } };
  await updateClient(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: "Preencha todos os campos" });
});

test("updateClient - cliente não encontrado -> 404", async () => {
  Client.findByIdAndUpdate.mockResolvedValue(null);
  const res = mockRes();
  const req = {
    body: { name: "Joao", phone: "1234567890", password: "pwd" },
    params: { id: "1" },
  };
  await updateClient(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ error: "Cliente não encontrado" });
});

test("updateClient - validação após update falha -> 400", async () => {
  const updated = { id: "1", name: "Joao", phone: "1234567890" };
  Client.findByIdAndUpdate.mockResolvedValue(updated);
  const res = mockRes();
  const req = {
    body: { name: "Jo", phone: "1234567890", password: "pwd" },
    params: { id: "1" },
  };
  await updateClient(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    error: "Você deve informar um nome válido",
  });
});

test("updateClient - sucesso", async () => {
  const updated = { id: "1", name: "Joao", phone: "1234567890" };
  Client.findByIdAndUpdate.mockResolvedValue(updated);
  const res = mockRes();
  const req = {
    body: { name: "Joao", phone: "1234567890", password: "pwd" },
    params: { id: "1" },
  };
  await updateClient(req, res);
  expect(res.json).toHaveBeenCalledWith(updated);
});

test("deleteClient - não encontrado -> 404", async () => {
  Client.findByIdAndDelete.mockResolvedValue(null);
  const res = mockRes();
  const req = { params: { id: "x" } };
  await deleteClient(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ error: "Cliente não encontrado" });
});

test("deleteClient - sucesso", async () => {
  Client.findByIdAndDelete.mockResolvedValue({ id: "1" });
  const res = mockRes();
  const req = { params: { id: "1" } };
  await deleteClient(req, res);
  expect(res.json).toHaveBeenCalledWith({
    message: "Cliente deletado com sucesso",
  });
});
