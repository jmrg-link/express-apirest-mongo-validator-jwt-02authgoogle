const jwt = require('jsonwebtoken')
const { request , response } = require('express')
const Usuario = require('../models/user.model')

const validarJWT = async ( req = request , res= response , next ) => {

    const token = req.header('x-token')
    if (!token){
        return res.status(401).json({
            msg:"No hay token en la peticion"
        })
    }

    try {
        const { uid } = jwt.verify( token , process.env.SECRETORPRIVATEKEY )

        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid )

        // Verificar si el usuario existe en bd
        if(!usuario){
            return res.status(401).json({
                msg:'Token no valido - Usuario no existe en bd'
            })
        }

        // Verificar si el uid tiene el status:true
        if(!usuario.status){
            return res.status(401).json({
                msg:'Token no valido - Usuario status: false'
            })
        }

        req.usuario = usuario
        next()
    }catch (err) {
        //console.log(err)
        res.status(401).json({
            msg:'Token no valido'
        })

    }

    console.log(token)

    next()



}


module.exports = {
    validarJWT
}
