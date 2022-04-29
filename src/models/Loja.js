const mongoose = require('mongoose');
const path  = require('path');

const { unlink } = require('fs');
const {promisify } = require('util'); 

const LojaSchema = new mongoose.Schema({
    _id:String,
    user:{
        type:String,
        ref: 'User'
      },
    nomeFachada:String,
    keyFachada:String,
    urlFachada:String,
    nomeComercial:{
        type:String,
        required:true
    },
    emailComercial:{
        type:String,
        required:true
    },
    cepComercial:{
        type:String,
        required:true
    },
    enderecoComercial:{
        type:String,
        required:true
    },
    cnpj:{
        type:String,
        required:true
    },
    zapComercial:{
        type:String,
        required:true
    },
    cidadeComercio:{
        type:String,
        required:true
    },
    ufComercio:{
        type:String,
        required:true
    },
    latlong:{
        type:String,
        required:true
    },
    situacao:{
        type:Boolean,
        default:false
    },
    produtos:[String],
    createdAt:{
        type:Date,
        default:Date.now,
    }
    

});

  
// gera on nome da imagem e salva a imagem no diretorio antes de salvar
LojaSchema.pre('save',function(){
    if(this.keyFachada){
        this.urlFachada = `${process.env.APP_URL}/files/${this.keyFachada}`
    }
});
// apaga a imagem do diretorio antes de salvar
LojaSchema.pre('remove',function(){
    if(this.keyFachada){
    return promisify(unlink)(path.resolve(__dirname, '..', '..', 'uploads',this.keyFachada) )
    }
});

module.exports = mongoose.model('Loja', LojaSchema);