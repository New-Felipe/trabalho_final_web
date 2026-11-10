const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const Component = require('./Component');

describe('Modelo Component', () => {
  const componenteValido = {
    nome: 'Ryzen 5 5600 GT',
    categoria: 'Processadores',
    marca: 'AMD',
    preco: 899,
    descricao: 'Processador de 6 núcleos e 12 threads, soquete AM4.'
  };

  it('deve aceitar um componente válido', async () => {
    const componente = new Component(componenteValido);

    await assert.doesNotReject(async () => {
      await componente.validate();
    });
  });

  it('deve rejeitar campos obrigatórios ausentes', async () => {
    const componente = new Component({});

    await assert.rejects(
      componente.validate(),
      (erro) => {
        assert.ok(erro.errors.nome);
        assert.ok(erro.errors.categoria);
        assert.ok(erro.errors.marca);
        assert.ok(erro.errors.preco);
        assert.ok(erro.errors.descricao);

        return true;
      }
    );
  });

  it('deve rejeitar preços negativos', async () => {
    const componente = new Component({
      ...componenteValido,
      preco: -100
    });

    await assert.rejects(
      componente.validate(),
      (erro) => {
        assert.ok(erro.errors.preco);
        return true;
      }
    );
  });

  it('deve rejeitar categorias inválidas', async () => {
    const componente = new Component({
      ...componenteValido,
      categoria: 'Categoria Inválida'
    });

    await assert.rejects(
      componente.validate(),
      (erro) => {
        assert.ok(erro.errors.categoria);
        return true;
      }
    );
  });
});
