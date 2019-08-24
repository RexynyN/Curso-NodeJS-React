//Importando mongoose
const { Schema, model} = require('mongoose');

//Criando um Schema para armazenar devs
const DevSchema = new Schema ({
    //Criando os atributos do Schema Dev
    name : {
        type: String,
        required: true,
    },
    //Link do GitHub do Usuário
    user:{
        type: String,
        required:true,
    },
    bio: String,
     //Avatar vai pegar o link da imagem do GitHub do usuario
    avatar : {
        type: String,
        required:true,
    },
    likes : [{
        type : Schema.Types.ObjectId,
        ref : 'Dev',
    }],
    dislikes : [{
        type : Schema.Types.ObjectId,
        ref : 'Dev',
    }],

}, 
{
    timestamps: true,
});

module.exports = model('Dev', DevSchema);