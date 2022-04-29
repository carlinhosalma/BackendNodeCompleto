const { response } = require('express');
const { validate: isUuid } = require('uuid');
const Loja = require('../models/Loja');

module.exports = {
    async validateId(req, res, next ){

     const { user_id } = req.headers;   
     const { id } = req.params;      
    

        if(! isUuid(user_id)){
            return res.status(400).json({error:'Usuário inválido'})
        }

        if(! isUuid(id) && id ){
            return res.status(400).json({error:'ID loja  inválida'})
        }

        if(id){
            
    //    return res.status(200).json({error:'Encontrou a loja'})

            try {
                const loja = await Loja.findById(id) ;
                response.loja = loja;
               // console.log(loja); 
            //  console.log(response.ponto ); 
            

                if (!loja) {
                    return res.status(404).json({error:'Loja não encontrada.'})
                }  
                        
            } catch (err) {
                console.log('Erro nao conhecido como  ID midleware')
                return res.status(500).json({error:err.message})
                
            }
        }





        next();
    },
}