# Nodejs & Express API & Mongoose - Validator

Nodejs con express : configuración de un Rest API con validaciones para usuarios con base de datos mongodb

## Comenzando 🚀

Contruir una Api rest para el control de usuarios utilizando NodeJS

Mira **Deployment** para conocer como desplegar el proyecto.


### Pre-requisitos 📋

Las dependencias del proyectos son las actuales en fecha 02-02-2021

```
Dependencias    - npm install cors dotenv express --save
devDependencias - npm install nodemon --save-dev
```
## .ENV 📦
Crear fichero de variables de entorno
MONGODB_CNN es la conexion de mongo
SECRETORPRIVATEKEY es la llave de JWT 
```
PORT=8080
MONGODB_CNN =mongodb+srv://<user>:<password>@<url>/<dbname>
SECRETORPRIVATEKEY = <tuclave>
```
### Instalación de dependencias 🔧 

```
"devDependencies": {
    "nodemon": "^2.0.7"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-validator": "^6.9.2",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.11.15"
  }
```

Para ejecutar la app de node verifica que tengas todo correctamente instalado en la carpeta de node_modules no adjunta en GITHUB

## Scripts de ejecucion ⚙️

Para ejecutar el servidor de node puedes utilizar los siguientes Scripts

```
"scripts": {
    "test" : "echo \"Error: no test specified\" && exit 1",
    "dev"  : "nodemon app.js",
    "start": "node app.js"
  }
```

### Comandos de lanzamiento 🔩

Puedes ejecutar los siguientes comando para lanzar el server

```
[ Script Nodemon     ] -  (c:/ ruta carpeta proyecto )  npm run dev 
[ Lanzamiendo Nodejs ] -  (c:/ ruta carpeta proyecto )  node app.js
```

## Despliegue 📦

Recuerda para lanzar este proyecto se utiliza Nodemon que te permite tener en ejecucion un server y depurar su contenido pero si precisas de probarlo en un servidor de --prod deberar utilizar algo como [PM2] para disponer de un servicio de sistema que te arranque la aplicacion cuando precises de reinicios en tu servidor y otras funciones mas avanzadas.

## Construido con 🛠️

Las librerias utilizadas son las nombradas en la siguiente lista:

* [Express](https://www.npmjs.com/package/express) - El framework web usado para construccion de SSR con JS
* [Cors](https://www.npmjs.com/package/cors)       - [EN] Cross-origin resource sharing - [ES] Intercambio de recursos de origen cruzado .
* [Dotenv](https://www.npmjs.com/package/dotenv)   - Uso de variables de entorno .env
* [Nodemon](https://www.npmjs.com/package/nodemon) - monitorea los cambios en el código fuente y reinicia el servidor.
* [Bcryptjs](https://www.npmjs.com/package/bcryptjs) - Permite cifrar tu password con varios saltos de hash
* [Express-validator](https://www.npmjs.com/package/express-validator) - middleware de express envuelto con validator.js
* [Mongoose](https://www.npmjs.com/package/mongoose) - Mangosta es un Object Document Mapper (ODM) permite trabajar con esquemas con base de datos nosql mongo.
* [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Tokens de seguridad para securizar el api rest



## Validaciones  🔎
Validaciones de Usuario
```
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
```

Validaciones de Roles de Usuarios (Middleware)
```
const esAdminRol = (req ,res=response , next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg:'Se quiere verificar el role sin validar el token primero'
        })
    }

    const { rol , nombre } = req.usuario
    if(rol!=='ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${ nombre } no es administrador - No puede realizar la operacion`
        })

    }
    next()
}

const tieneRole = ( ...roles ) => {

    return (req , res = response , next) => {

        if(!req.usuario){
            return res.status(500).json({
                msg:'Se quiere verificar el role sin validar el token primero'
            })
        }

        if ( !roles.includes(req.usuario.rol) ){
            return res.status(401).json({
                msg: `El servicio require los siguientes roles ${roles}`
            })
        }
        next()
    }

}
```

Validaciones de JWT (Middleware)
```
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
```


## Readme 🖇

Por favor lee el Readme.md para detalles del código


## Versionado 📌

Uso [SemVer](http://semver.org/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/tu/proyecto/tags).

## Autor ✒️

Los proyectos que contruyo los hago de manera altruista y con el fin de que puedan ser de utilidad y de ejemplo.
Si eres Reclutador/a espero que el codigo que verifiques te ayude a comprobar mi nivel de experiencia con el codigo publicado.

* **Jesus Mª Rico Gonzalez** - *Trabajo Inicial* - 👤  [jmrg-link](https://github.com/jmrg-link/)
* **Jesus Mª Rico Gonzalez** - *Documentación*   - 👤  [jmrg-link](https://github.com/jmrg-link/) 

También puedes mirar la lista de todos los [contribuyentes](https://github.com/your/project/contributors) quíenes han participado en este proyecto.

## Licencia 📄

Este proyecto está bajo la Licencia (mit).

## Expresiones de Gratitud 🎁

* Los proyectos documentados estan testados y funcionales 📢
* Espero que estos proyectos sirvan de inspiración
* En los proyectos no publico claves ni acceso a sitios restringidos.
* Los [ < usuarios > ] y [< claves >] iran entre < menor que y mayor que > para que tu mismo pongas tus accesos
* Puedes ver tutoriales y proyectos random en https://jmrg.link ⌨️ 😊

---
