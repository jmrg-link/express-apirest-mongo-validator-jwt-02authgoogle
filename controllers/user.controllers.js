const bcrypt = require ('bcryptjs')
const { response, request } = require('express')

const Usuario = require ('../models/user.model')


const usuariosGet = async (req = request, res = response) => {
   //const {q, nombre = " no name", apiKey , page , limit} = req.query
    const { limite = 5, desde = 0} =  req.query
    const query = {status : true}

    // Collections all promises
    const [total , usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit( Number(limite))
    ])

    res.status(200).json({
      total ,
      usuarios
    })
}

// Solicitud POST usuario
const usuariosPost = async ( req, res = response ) => {
    const { nombre , email ,  password , rol  } = req.body
    const usuario = new Usuario({ nombre , email , password ,rol } )


    //encriptar password
    //bcrypt.genSaltSync es el numero de saltos para encriptar el password
    const salt = bcrypt.genSaltSync(15)
    usuario.password = bcrypt.hashSync(password , salt)

    //guardar en bd
    //console.log(usuario)
    await usuario.save()
    res.status(201).json({
        usuario
    })
    //console.log('Guardado correcto en BD')
}


// PUT | Actualizar Usuario
const usuariosPut = async ( req, res = response ) => {
    const { id } = req.params
    const { _id , password , google, email, ...resto} = req.body

    //TODO:Validar contra base de datos
    if (password) {
        const salt = bcrypt.genSaltSync(15)
        resto.password = bcrypt.hashSync(password , salt)
    }
    const usuarioDB = await Usuario.findByIdAndUpdate( id, resto )

    res.status(202).json({
        usuarioDB
    })
}

// Patch
const usuariosPatch = ( req, res ) => {
    res.status(202).json({
        msg: 'delete Api - controller',

    })
}
// Delete | Borrar usuario
const usuariosDelete = async ( req, res = response ) => {
    const { id } = req.params
    const usuario = await Usuario.findByIdAndUpdate( id , {status : false})
    const usuarioAutenticado = req.usuario

    res.status(200).json({
        usuario,
        usuarioAutenticado
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}
