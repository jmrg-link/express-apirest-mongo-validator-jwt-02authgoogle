const { Schema , model } = require ('mongoose')

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio']
    },

    email:{
        type: String,
        required: [true, 'El correo Electronico es requerido'],
        index:true,
        unique:true
    },

    password:{
        type:String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type:String,
    },

    rol:{
        type:String,
        required:true,
        default: 'USER_ROLE',
        emun:['ADMIN_ROLE','USER_ROLE','VENTAS_ROLE']
    },

    status:{
        type:Boolean,
        default:true
    },

    google:{
        type:Boolean,
        default:false

    }
})

UsuarioSchema.methods.toJSON = function (){
    const { __v, password, _id , ...usuario } = this.toObject();
    usuario.uid = _id
    return usuario
}

module.exports= model('Usuario', UsuarioSchema)
