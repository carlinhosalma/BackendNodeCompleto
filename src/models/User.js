const mongoose = require('mongoose');
const path  = require('path');

const { unlink } = require('fs');
const {promisify } = require('util'); 

const UserSchema = new mongoose.Schema({
    _id:String,
    
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        require:true,
       // select:false,
    },
    nomeImage:String,    
    keyImage:String,
    urlImage:String,
    nomeUser:{
        type:String
    },
    cpfUser:{
        type:String
    },
    nascimentoDT:{
        type:String
     },
    zapUser:{
        type:String
    },
    enderecoUser:{
        type:String
    },
    cidadeUser:{
        type:String
    },
    ufUser:{
        type:String
    },
    contatoFoneUser:{
        type:String
    },
    contatoNomeUser:{
        type:String
    },
    situacao:{
        type:String,
        default:false
    },
    acessos:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

});


// gera on nome da imagem e salva a imagem no diretorio antes de salvar
UserSchema.pre('save',function(){
    if(this.keyImage){
        this.urlImage = `${process.env.APP_URL}/files/${this.keyImage}`
    }
});
// apaga a imagem do diretorio antes de salvar
UserSchema.pre('remove',function(){
    if(this.keyImage){
    return promisify(unlink)(path.resolve(__dirname, '..', '..', 'uploads',this.keyImage) )
    }
});

// UserSchema.pre('update',function(){
//     if(this.imgAntiga){
//         return promisify(unlink)(path.resolve(__dirname, '..', '..', 'uploads',this.imgAntiga) )
//     }
// });

module.exports = mongoose.model('User', UserSchema);


