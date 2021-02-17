const bcrypt = require ('bcryptjs')

const { response } = require('express')
const Usuario = require('../models/user.model')

const {googleVerify} = require("../helpers/google-verify");
const { generarJWT } = require("../helpers/generar-JWT");


const login = async ( req , res = response ) => {

    const { email , password } = req.body
    
    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ email })
        if ( !usuario ) {
            return res.status(400).json({
                msg:'Usuario / Password  no son correctos - email'
            })
        }

        //Si el user esta status:true (activo)
        if ( !usuario.status ) {
            return res.status(400).json({
                msg:'Usuario / Password  no son correctos - status:false'
            })
        }

        // Verificar password
        const validPassword = bcrypt.compareSync (password, usuario.password)
        if (!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password  no son correctos - password'
            })
        }

        // Generar JWT
        const token = await generarJWT(usuario.id)

        res.status(200).json({
            usuario , token
        })


        res.status(200).json({
            msg:'Login Ok',
            email,password
        })

        // Error 500 error desconcido
    }catch (err) {
        console.log(err)
        return res.status(500).json({
            msg:'Error Fatal :: Hable con el Administrador del sistema'
        })
    }

}

const googleSignIn = async (req , res = response) => {
    const { id_token } = req.body

    try {
        const { email , img , nombre } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({email});

        //crear usuario
        if(!usuario){
            const data = {
                nombre,
                email,
                img,
                password: 'XD',
                google: true
            }
            usuario = new Usuario( data )
            await usuario.save()
    }

    //Si el usuario esta en bd
        if(!usuario.status){
            return res.status(401).json({
                msn:'Error por favor , hable con su Administrador del sistema - User blocked'
            })
        }

    // Generar JWT
        const token = await generarJWT(usuario.id)

        res.status(200).json({
            usuario,
            token
            //msg:'Solicictud correcta google signIn',

        })
    } catch (err) {

        res.status(400).json({
            msg: ' Token de Google no es valido'
        })
    }
}

module.exports= {
    login,googleSignIn
}
