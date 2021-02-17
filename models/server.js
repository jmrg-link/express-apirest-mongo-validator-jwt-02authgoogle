const express = require('express')
const cors = require("cors");

const {dbConnecetion} = require("../db/config.db");

// Clase Server
// Contructor de la App
class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.authPath     = '/api/auth'

        //Conectar BDMongo
        this.conectarDB()

        // Middlewares
        this.middlewares()

        //Routes my App
        this.routes()
    }

    // Funcion asincrona para conectar con base de datos mongo
    async conectarDB(){
        await dbConnecetion()
    }

    middlewares() {

        // CORS
        this.app.use( cors() )

        // DIR PUBLIC
        this.app.use( express.static('public') )

        //READ AND PARSER BODY
        this.app.use( express.json() )
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.routes'))
        this.app.use(this.usuariosPath, require('../routes/user.routes'))

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto:${this.port}`)
        })
    }
}

module.exports = Server
