const mongoose = require('mongoose');
const path  = require('path');

const { unlink } = require('fs');
const {promisify } = require('util'); 

const DriverSchema = new mongoose.Schema({
    _id:String,
    user:{
        type:String,
        ref: 'User'
      },
    nomeCNH:String,    
    keyCNH:String,
    urlCNH:String,
    CNH:{ 
        type:String,
        required:true
    },
    anoVeiculo:String,
    vencimentoDT:{
        type:String,
        required:true
    },
    placa:String,
    renavam:String,
    situacao:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

    
});

 
// gera on nome da imagem e salva a imagem no diretorio antes de salvar
DriverSchema.pre('save',function(){
    if(this.keyCNH){
        this.urlCNH = `${process.env.APP_URL}/files/${this.keyCNH}`
    }
});
// apaga a imagem do diretorio antes de salvar
DriverSchema.pre('remove',function(){
    if(this.keyCNH){
    return promisify(unlink)(path.resolve(__dirname, '..', '..', 'uploads',this.keyCNH) )
    }
});

module.exports = mongoose.model('Driver', DriverSchema);