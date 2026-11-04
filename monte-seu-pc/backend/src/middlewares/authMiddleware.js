const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Token não informado ou formato inválido."
      });
    }

    const token = authHeader.slice(7);

    if (!token) {
      return res.status(401).json({
        message: "Token não informado."
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido ou expirado."
    });
  }
};

module.exports = authMiddleware;
