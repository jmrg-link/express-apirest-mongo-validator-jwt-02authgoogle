// Middleware Personalizados de validacion
const   validarJWT = require("../middlewares/validar-JWT");
const validaCampos = require("../middlewares/validar-campos");
const  validaRoles = require("../middlewares/validar-ROL");


module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validaRoles,
}
