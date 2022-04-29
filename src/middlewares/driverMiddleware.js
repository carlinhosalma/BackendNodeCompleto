const { response } = require('express');
const { validate: isUuid } = require('uuid');
const Driver = require('../models/Driver');

module.exports = {
    async validateId(req, res, next ){

     const { user_id } = req.headers;   
     const { id } = req.params;      
    

        if(! isUuid(user_id)){
            return res.status(400).json({error:'Usuário inválido'})
        }

        if(! isUuid(id) && id ){
            return res.status(400).json({error:'ID DRIVER  inválida'})
        }

        if(id){
            
    //    return res.status(200).json({error:'Encontrou a loja'})

            try {
                const driver = await Driver.findById(id) ;
                response.driver = driver;
          
                if (!driver) {
                    return res.status(404).json({error:'DRIVER não encontrado.'})
                }  
                        
            } catch (err) {
                console.log('Erro nao conhecido como  ID midleware')
                return res.status(500).json({error:err.message})
                
            }
        }

        next();
    },
}