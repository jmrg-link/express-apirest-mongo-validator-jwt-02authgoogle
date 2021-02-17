const {Router} = require('express')
const { check } = require('express-validator')
const { login , googleSignIn} = require("../controllers/auth.controllers");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router()

//POST - Crear usuario
router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],login)

//POST - Crear Token Google
router.post('/google', [
    check('id_token', 'El id token es obligatorio').not().isEmpty(),
    validarCampos
],googleSignIn)


module.exports = router
