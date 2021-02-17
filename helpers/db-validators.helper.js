const Role = require('../models/role.model')
const Usuario = require ('../models/user.model')

const rolValido =  async ( rol = '' ) => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${ rol } no esta registrado en la bd`)
    }
}

const emailExiste =async (email='') => {
    // Verificar si el email existe
    const existeEmail = await Usuario.findOne({email})
    if(  existeEmail ){
        throw new Error (`El email : ${email} ya esta en uso`)
    }
}

const existeUserId = async (id) => {
    // Verificar si el id existe
    const existeUser = await Usuario.findById(id)
    if(  !existeUser ){
        throw new Error (`El id : ${ id } , no existe.`)
    }
}

module.exports = {
    rolValido,
    emailExiste,
    existeUserId
}
