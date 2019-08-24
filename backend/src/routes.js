//Importando o express
const express = require('express');

//Importando o controller do dev
const DevController = require('./controllers/DevController');

//Importando o controller do like
const LikeController = require('./controllers/LikeController');

//Importando o controller do dislike
const DisikeController = require('./controllers/DislikeController');

//Criando objeto de Router
const routes = express.Router();

//Criando a rota pra página principal por meio do GET
routes.get('/', (requisicao, resposta) => {
    return resposta.json({ message : `Olá ${requisicao.query.name /* O nome que colocar na URL*/}`});
});

//Criando rota para listagem de devs por meio do get
routes.get('/devs', DevController.index);

//Criando rota para cadastro de devs por meio do POST
routes.post('/devs', DevController.store);

//Criando rota para computar o like em um dev especificado por id
routes.post('/devs/:devId/likes', LikeController.store);

//Criando rota para computar o dislike em um dev especificado por id
routes.post('/devs/:devId/dislikes', DisikeController.store);

//Expor a variavel 'routes' para qualquer um que invocar routes.js
module.exports = routes;

