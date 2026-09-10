const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// REGISTRO
const register = async (req, res) => {
try {
const { name, email, password } = req.body;

// Validação
if (!name || !email || !password) {
return res.status(400).json({
message: "Nome, email e senha são obrigatórios."
});
}

// Verifica se o email já existe
const existingUser = await User.findOne({ email });

if (existingUser) {
return res.status(400).json({
message: "Este email já está cadastrado."
});
}

// Cria o hash da senha
const hashedPassword = await bcrypt.hash(password, 12);

// Cria o usuário
const user = await User.create({
name,
email,
password: hashedPassword
});

res.status(201).json({
message: "Usuário cadastrado com sucesso.",
user: {
id: user._id,
name: user.name,
email: user.email
}
});
} catch (error) {
console.error(error);

res.status(500).json({
message: "Erro ao cadastrar usuário."
});
}
};

// LOGIN
const login = async (req, res) => {
try {
const { email, password } = req.body;

// Validação
if (!email || !password) {
return res.status(400).json({
message: "Email e senha são obrigatórios."
});
}

// Procura usuário pelo email
const user = await User.findOne({ email });

if (!user) {
return res.status(401).json({
message: "Email ou senha inválidos."
});
}

// Compara senha informada com hash
const passwordIsValid = await bcrypt.compare(
password,
user.password
);

if (!passwordIsValid) {
return res.status(401).json({
message: "Email ou senha inválidos."
});
}

// Gera JWT
const token = jwt.sign(
{
id: user._id
},
process.env.JWT_SECRET,
{
expiresIn: "1d"
}
);

res.json({
message: "Login realizado com sucesso.",
token,
user: {
id: user._id,
name: user.name,
email: user.email
}
});
} catch (error) {
console.error(error);

res.status(500).json({
message: "Erro ao realizar login."
});
}
};

module.exports = {
register,
login
};
