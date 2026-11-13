const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

const Component = require("../models/Component");
const {
  getComponents
} = require("./componentController");

const criarResponse = () => {
  const res = {
    statusCode: null,
    body: null,

    status(code) {
      this.statusCode = code;
      return this;
    },

    json(data) {
      this.body = data;
      return this;
    }
  };

  return res;
};

describe("Controller de Componentes", () => {
  it("deve retornar todos os componentes cadastrados", async (t) => {
    const componentes = [
      {
        nome: "Ryzen 5 5600 GT",
        categoria: "Processadores",
        marca: "AMD",
        preco: 899
      },
      {
        nome: "GeForce RTX 4060",
        categoria: "Placas de Vídeo",
        marca: "NVIDIA",
        preco: 1899
      }
    ];

    t.mock.method(Component, "find", async () => componentes);

    const req = {};
    const res = criarResponse();

    await getComponents(req, res);

    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.body, componentes);
  });

  it("deve retornar uma lista vazia quando não houver componentes", async (t) => {
    t.mock.method(Component, "find", async () => []);

    const req = {};
    const res = criarResponse();

    await getComponents(req, res);

    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.body, []);
  });

  it("deve retornar erro 500 quando ocorrer falha na consulta", async (t) => {
    t.mock.method(
      Component,
      "find",
      async () => {
        throw new Error("Falha interna no banco de dados");
      }
    );

    t.mock.method(console, "error", () => {});

    const req = {};
    const res = criarResponse();

    await getComponents(req, res);

    assert.equal(res.statusCode, 500);
    assert.deepEqual(res.body, {
      message: "Erro ao buscar componentes."
    });

    assert.equal(
      JSON.stringify(res.body).includes("Falha interna"),
      false
    );
  });
});