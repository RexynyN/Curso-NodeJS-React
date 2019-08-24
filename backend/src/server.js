//Importando o express
const express = require('express');

//Impoortando o Mongoose (BDD)
const mongoose = require('mongoose');

//Impoortando o Cors
const cors = require('cors');

//Importando o routes.js
const routes = require('./routes')

//Criando novo servidor 
const server = express();

//Conectando com o banco de dados MongoDB
mongoose.connect('mongodb+srv://Rex:devpw2002@clustercursonodejs-40fce.mongodb.net/CursoReact?retryWrites=true&w=majority', {
    useNewUrlParser : true
})

//Configurando o Cors no servidor
server.use(cors());

//Configurando o envio de requisições por json
server.use(express.json());

//Configurando as rotas do routes.js no servidor
server.use(routes);

//Criando um local host na porta 3000
server.listen(3000);