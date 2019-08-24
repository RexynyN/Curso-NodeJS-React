//Importando a classe dev
const Dev = require('../models/Dev');


module.exports = {
    async store(req, res){
        //Seleciona o ID do dev logado no site por meio do header
        const { user } = req.headers;

        //Seleciona o ID do dev que recebeu o like
        const { devId } = req.params;

        //Procura o dev logado no BDD
        const loggedDev = await Dev.findById(user);
        
        //Procura o dev que recebeu like no BDD
        const targetDev = await Dev.findById(devId);

        //Caso o dev-alvo não existir, retorna um erro de BadRequest do HTTP
        if(!targetDev){
            return res.status(400).json({ error: 'Dev não existe!'});
        }

        //Caso os dois dev derem like um no outro, aparece que deu match!
        if(targetDev.likes.includes(loggedDev._id)){
            console.log('Deu match!');
        }

        //Salva o ID do dev-alvo no Schema do dev logado, confirmando o like
        loggedDev.likes.push(targetDev._id);

        //Salva as alterações no dev logado
        await loggedDev.save();

        return res.json(loggedDev);
    }
};