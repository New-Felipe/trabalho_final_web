const Component = require("../models/Component");

// GET - Listar todos os componentes cadastrados
const getComponents = async (req, res) => {
  try {
    const components = await Component.find();

    return res.status(200).json(components);
  } catch (error) {
    console.error("Erro ao buscar componentes:", error);

    return res.status(500).json({
      message: "Erro ao buscar componentes."
    });
  }
};

module.exports = {
  getComponents
};