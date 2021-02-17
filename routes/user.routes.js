const { check } = require('express-validator')
const {Router} = require('express')

// Middleware Personalizados de validacion
const { validarCampos , tieneRole , validarJWT , esAdminRol  } = require('../middlewares/index')

const router = Router()
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } =
    require("../controllers/user.controllers");

const {rolValido , emailExiste , existeUserId} = require("../helpers/db-validators.helper");

// GET
router.get('/', usuariosGet);

// POST
router.post('/', [
    check('nombre', 'El nombre es obligatorio ').not().isEmpty(),
    check('password', 'El password es obligatorio y debe contener 6 letras').isLength({min:6}),
    check('email', 'El email no es valido ').isEmail(),
    check('email').custom(emailExiste),
    check('rol').custom( rolValido ),
    //check('rol', 'No es un rol permitido ').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos


] ,usuariosPost);

// PUT
router.put('/:id', [
    check('id', 'El ID introducido no es valido').isMongoId(),
    check('id').custom(existeUserId),
    check('rol').custom( rolValido ),
    validarCampos
],usuariosPut)

// PATCH
router.patch('/',usuariosPatch);

// DELETE
router.delete('/:id',[
    validarJWT,
    esAdminRol,
    //tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'El ID introducido no es valido').isMongoId(),
    check('id').custom(existeUserId),
    validarCampos
], usuariosDelete);

module.exports = router
