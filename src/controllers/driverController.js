const {v4:UuId} = require('uuid');
const Driver = require('../models/Driver');

module.exports = {

    async index(request, response){
        try {
            const driver = await Driver.find();
            return response.status(200).json({driver});
        } catch (err) {
            return response.status(500).json({ error: err.message })
        }

    },

   async show(request, response){
    //console.log(request.params);
    const { ramo } = request.params;
    const busca = await Driver.find({ ramos: ramo });
 
        try {
            
            return response.status(200).json({busca});
        } catch (err) {
            return response.status(500).json({ error: `${busca} foi não encotrado` })
        }

    },
   

    async store(request, response){
        
        const {originalname:nomeCNH,filename:keyCNH} = request.file;
        const { user_id } = request.headers;
        const {CNH,vencimentoDT,placa,renavam, anoVeiculo } = request.body
        
       
        //mensagens de erro enviadas para o front antes de ir para o banco
        
        if(!CNH){return response.status(400).json({error:'Informe o numero da CNH'})}
        if(!vencimentoDT){return response.status(400).json({error:'Informe a data de vencimento da CNH'})}
        if(!placa){return response.status(400).json({error:'Informe a placa do veículo'})}
        if(!renavam){return response.status(400).json({error:'Informe o numero do renavam'})}
       
        //tratando as variáveis antes de ir para o banco

        
        const driver = new Driver({ 
            _id:UuId(),
            user:user_id,
            nomeCNH,
            keyCNH,
            renavam,
            anoVeiculo,
            placa,
            CNH,
            vencimentoDT
            
        });
        console.log(driver);
      
        //gravando no banco
        try {
            await driver.save();
            return response.status(201).json({message:'Driver cadastrado com sucesso'})
            
        } catch (erro) {
            return response.status(400).json({ error: erro.message })
        }
    },

    async update(request, response){
        const {originalname:nomeCNH,filename:keyCNH} = request.file;

       const {user,urlCNH,CNH,vencimentoDT,placa,renavam,situacao,anoVeiculo } = request.body
       // console.log(request.body);


        if(user) response.driver.user = user;
        if(nomeCNH) response.driver.nomeCNH = nomeCNH;
        if(keyCNH) response.driver.keyCNH = keyCNH;
        if(urlCNH) response.driver.urlCNH = urlCNH;
        if(CNH) response.driver.CNH = CNH;
        if(vencimentoDT) response.driver.vencimentoDT = vencimentoDT;
        if(placa) response.driver.placa = placa;
        if(renavam) response.driver.renavam = renavam;
        if(situacao) response.driver.situacao = situacao;
        if(anoVeiculo) response.driver.anoVeiculo = anoVeiculo;
        
       
        
        try {
            await response.driver.save();
            return response.status(200).json({message:'Driver alterado com sucesso'})  
        } catch (erro) {     
            return response.status(500).json({ error: erro.message })          
        }

    },

    async destroy(request,response){
        try {
            await response.driver.remove();
            return response.status(200).json({message:'Driver deletado com sucesso'}) 
            
        } catch (erro) {
            return response.status(500).json({ error: erro.message })     
        }

    }        
    
}

/*
index – Lista os dados da tabela
show – Mostra um item específico
create – Retorna a View para criar um item da tabela
store – Salva o novo item na tabela
edit – Retorna a View para edição do dado
update – Salva a atualização do dado
destroy – Remove o dado
*/