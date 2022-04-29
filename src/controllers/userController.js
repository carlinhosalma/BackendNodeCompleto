const {v4:UuId} = require('uuid');
const User = require('../models/User');

module.exports = {

    async destroy(request,response){       
        
        try {
            await response.user.remove();
            return response.status(200).json({message:'Usuário deletado com sucesso'});
            
        } catch (erro) {
            return response.status(500).json({ error: erro.message })     
        }

    },
    async store(request,response){ 

        const { email, password } = request.body;
        
        const user = new User({ 
            _id:UuId(),
            email,
            password     

        });
        //gravando no banco
        try {
            await user.save();
            return response.status(201).json({message:'Usuário cadastrado com sucesso'})
            
        } catch (erro) {
            return response.status(400).json({ error: erro.message })
        }
    },

    async index(request, response){
        try {
            const user = await User.find();
            return response.status(200).json({user});
        } catch (err) {
            return response.status(500).json({ error: err.message })
        }

    },

    async update(request,response){
        
               
        const {nascimentoDT,nomeUser,email,password,cpfUser,zapUser,enderecoUser,cidadeUser,ufUser,contatoFoneUser,contatoNomeUser,acessos} = request.body;
        
        const { id }  = (request.params);
       // console.log(id);
       const {originalname:nomeImage,filename:keyImage} = request.file;
       

        if(nomeUser) response.user.nomeUser = nomeUser;
        if(email) response.user.email = email;
        if(password) response.user.password = password;
        if(cpfUser) response.user.cpfUser = cpfUser;
        if(zapUser) response.user.zapUser = zapUser;
        if(enderecoUser) response.user.enderecoUser = enderecoUser;
        if(cidadeUser) response.user.cidadeUser = cidadeUser;
        if(ufUser) response.user.ufUser = ufUser;
        if(contatoFoneUser) response.user.contatoFoneUser = contatoFoneUser;
        if(contatoNomeUser) response.user.contatoNomeUser = contatoNomeUser;
        if(nomeImage)response.user.nomeImage = nomeImage;
        if(keyImage)response.user.keyImage = keyImage;
        if(nascimentoDT)response.user.nascimentoDT = nascimentoDT;
             
        // if(keyImage != response.user.keyImage ){
        //     response.user.imgAntiga = response.user.keyImage = imgAntiga;
        // } 
        if(acessos) response.user.acessos = acessos;
        //console.log(response.user);

        try {
            await response.user.save();
            return response.status(200).json({message:'Dados do usuário alterado com sucesso'}); 
        } catch (erro) {     
            return response.status(500).json({ error: erro.message });          
        }
        
    }
}