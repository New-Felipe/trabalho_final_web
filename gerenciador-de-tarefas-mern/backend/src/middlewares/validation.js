const {
body,
param,
validationResult
} = require("express-validator");

const validate = (req, res, next) => {
const errors = validationResult(req);

if (!errors.isEmpty()) {
return res.status(400).json({
message: "Dados inválidos.",
errors: errors.array().map((error) => ({
field: error.path,
message: error.msg
}))
});
}

next();
};

const taskIdValidation = [
param("id")
.isMongoId()
.withMessage("ID da tarefa inválido.")
];

const createTaskValidation = [
body("title")
.trim()
.notEmpty()
.withMessage("O título é obrigatório.")
.isLength({ min: 1, max: 150 })
.withMessage(
"O título deve possuir no máximo 150 caracteres."
),

body("description")
.optional()
.isString()
.withMessage("A descrição deve ser um texto.")
.trim()
.isLength({ max: 1000 })
.withMessage(
"A descrição deve possuir no máximo 1000 caracteres."
),

body("status")
.optional()
.isIn(["pendente", "concluída"])
.withMessage("Status inválido.")
];

const updateTaskValidation = [
body("title")
.optional()
.trim()
.isLength({ min: 1, max: 150 })
.withMessage(
"O título deve possuir entre 1 e 150 caracteres."
),

body("description")
.optional()
.isString()
.withMessage("A descrição deve ser um texto.")
.trim()
.isLength({ max: 1000 })
.withMessage(
"A descrição deve possuir no máximo 1000 caracteres."
),

body("status")
.optional()
.isIn(["pendente", "concluída"])
.withMessage("Status inválido.")
];

const registerValidation = [
body("name")
.trim()
.notEmpty()
.withMessage("O nome é obrigatório.")
.isLength({ min: 2, max: 100 })
.withMessage(
"O nome deve possuir entre 2 e 100 caracteres."
),

body("email")
.trim()
.notEmpty()
.withMessage("O email é obrigatório.")
.isEmail()
.withMessage("Informe um email válido.")
.normalizeEmail(),

body("password")
.isString()
.withMessage("A senha deve ser um texto.")
.isLength({ min: 6, max: 128 })
.withMessage(
"A senha deve possuir entre 6 e 128 caracteres."
)
];

const loginValidation = [
body("email")
.trim()
.notEmpty()
.withMessage("O email é obrigatório.")
.isEmail()
.withMessage("Informe um email válido.")
.normalizeEmail(),

body("password")
.isString()
.withMessage("A senha é obrigatória.")
.notEmpty()
.withMessage("A senha é obrigatória.")
];

module.exports = {
validate,
registerValidation,
loginValidation,
taskIdValidation,
createTaskValidation,
updateTaskValidation
};