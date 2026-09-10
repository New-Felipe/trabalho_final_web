require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const authRoutes =
require("./routes/authRoutes");

const taskRoutes =
require("./routes/taskRoutes");

const app = express();

const PORT =
process.env.PORT || 5000;

const allowedOrigin =
process.env.CLIENT_URL ||
"http://localhost:5173";

// Segurança HTTP
app.use(helmet());

// CORS
app.use(
cors({
origin: allowedOrigin,
methods: [
"GET",
"POST",
"PUT",
"DELETE"
],
allowedHeaders: [
"Content-Type",
"Authorization"
]
})
);

// JSON
app.use(
express.json({
limit: "10kb"
})
);

// Sanitização MongoDB
app.use(mongoSanitize());

// Rotas
app.use(
"/api/auth",
authRoutes
);

app.use(
"/api/tasks",
taskRoutes
);

// Rota de teste
app.get("/api/health", (req, res) => {
res.json({
message: "API funcionando."
});
});

// Erro de rota
app.use((req, res) => {
res.status(404).json({
message: "Rota não encontrada."
});
});

// Conexão MongoDB
mongoose
.connect(process.env.MONGO_URI)
.then(() => {
console.log(
"MongoDB conectado com sucesso!"
);

app.listen(PORT, () => {
console.log(
`Servidor rodando na porta ${PORT}`
);
});
})
.catch((error) => {
console.error(
"Erro ao conectar ao MongoDB:",
error
);

process.exit(1);
});