const test = require("node:test");
const assert = require("node:assert/strict");

const {
    criarOperacoesImportacao,
} = require("./importComponents");

test("deve criar operações sem sobrescrever componentes existentes", () => {
    const componente = {
        id: 1,
        nome: "AMD Ryzen 5 7600",
        categoria: "Processadores",
        marca: "AMD",
        preco: 1299.90,
        descricao: "Processador AMD",
    };

    const operacoes = criarOperacoesImportacao([componente]);

    assert.equal(operacoes.length, 1);

    assert.deepEqual(operacoes[0].updateOne.filter, {
        nome: "AMD Ryzen 5 7600",
        marca: "AMD",
        categoria: "Processadores",
    });

    assert.equal(operacoes[0].updateOne.upsert, true);

    assert.deepEqual(operacoes[0].updateOne.update, {
        $setOnInsert: {
            nome: "AMD Ryzen 5 7600",
            categoria: "Processadores",
            marca: "AMD",
            preco: 1299.90,
            descricao: "Processador AMD",
        },
    });
});

test("deve gerar uma operação para cada componente do catálogo", () => {
    const componentes = require("../../frontend/src/data/componentes.json");

    const operacoes = criarOperacoesImportacao(componentes);

    assert.equal(componentes.length, 7);
    assert.equal(operacoes.length, 7);

    const identificadores = operacoes.map(({ updateOne }) => {
        assert.equal(updateOne.upsert, true);

        return JSON.stringify(updateOne.filter);
    });

    assert.equal(new Set(identificadores).size, 7);
})
