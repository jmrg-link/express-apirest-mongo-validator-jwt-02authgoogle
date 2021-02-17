//require libreries
require('dotenv').config()

// librerias custom
const Server = require("./models/server");

// Run server
const server = new Server()

server.listen()
