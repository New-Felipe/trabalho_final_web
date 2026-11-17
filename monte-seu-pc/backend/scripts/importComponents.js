const fs = require("node:fs/promises");
const path = require("node:path");

const Component = require("../src/models/Component");
const mongoose = require("mongoose");
const connectDatabase = require("../src/config/database");

const catalogoPath = path.resolve(
  __dirname,
  "../../frontend/src/data/componentes.json"
);

function criarOperacoesImportacao(componentes) {
  return componentes.map((item) => ({
    updateOne: {
      filter: {
        nome: item.nome,
        marca: item.marca,
        categoria: item.categoria,
      },
      update: {
        $setOnInsert: {
          nome: item.nome,
          categoria: item.categoria,
          marca: item.marca,
          preco: item.preco,
          descricao: item.descricao,
        },
      },
      upsert: true,
    },
  }));
}

async function main() {
  require("dotenv").config();

  try {
    const conteudo = await fs.readFile(catalogoPath, "utf8");
    const componentes = JSON.parse(conteudo);

    if (!Array.isArray(componentes)) {
      throw new Error("O catálogo deve conter uma lista de componentes.");
    }

    for (const item of componentes) {
        const componente = new Component({
            nome: item.nome,
            categoria: item.categoria,
            marca: item.marca,
            preco: item.preco,
            descricao: item.descricao,
        });

        await componente.validate();
    }

    console.log(`Catálogo validado: ${componentes.length} componentes.`);

    await connectDatabase();

    const totalExistente = await Component.countDocuments();

    console.log("MongoDB conectado com sucesso!");
    console.log(`Componentes já cadastrados: ${totalExistente}.`);

    const operacoes = criarOperacoesImportacao(componentes);

    const resultado = await Component.bulkWrite(operacoes);

    console.log(`Componentes importados: ${resultado.upsertedCount}.`);
    console.log(`Componentes existentes preservados: ${resultado.matchedCount}.`);

  } catch (error) {
    console.error("Erro ao carregar o catálogo:", error.message);
    process.exitCode = 1;
  }

    finally {
        await mongoose.disconnect();
    }
}

if (require.main === module) {
  main();
}

module.exports = { criarOperacoesImportacao };
