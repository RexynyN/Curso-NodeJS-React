//Importando o Axios
const axios = require('axios')

//Importando a classe dev
const Dev = require('../models/Dev');


module.exports = {


    async index(req, res){
        //Seleciona o ID do dev logado no site por meio do header
        const { user } = req.headers;

        //Procura o dev logado no BDD
        const loggedDev = await Dev.findById(user);

        //Procura no BDD devs que não sejam o logado, e aqueles que ele ainda não deu like/dislike
        const users = await Dev.find({
            $and: [
                { _id: { /*not equal*/  $ne: user  }},
                { _id: { /*not in*/ $nin: loggedDev.likes}},
                { _id: { /*not in*/ $nin: loggedDev.dislikes}},
            ],
        });
        
        return res.json(users);
    },


    /*Método assincrono: Ele demora um pouco para processar a requisição, por isso deve-se usar 
    o notação "await, que espera a requisição ser processada para continuar o código.
    
    Metodo store: Guarda os dados do Dev na classe Dev e no BDD
    "*/
    async store(req, res){
        //Criando um variavel que retira a parte 'username' do req.body para ser usada
        const { username } = req.body;

        //Verificando se o usuário ja existe no BDD
        const userExists = await Dev.findOne({ user : username});

        //Se o Usuário existe, retorna ele, ao inves de criar outro
        if(userExists){
            return res.json(userExists);
        }

        //Usando a API do GitHub para retornar os dados do usuario
        const response = await axios.get(`https://api.github.com/users/${username}`);

        //Desestruturação das informações retornadas da API 
        const { name, bio, avatar_url: avatar} = response.data;

        //Guardando todos as informações necessária no Schema do Dev
        const dev = await Dev.create({
            name,
            user : username,
            bio,
            avatar,
        })

        
        return res.json(dev);
    }
};