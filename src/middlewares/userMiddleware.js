const { response } = require('express');
const { validate: isUuid } = require('uuid');
const User = require('../models/User');

module.exports = {
    async validateId(req, res, next ){
        const { id } = req.params;
                

        if(! isUuid(id)){
            return res.status(400).json({error:'ID inválido'})
        }

        try {
            const user = await User.findById(id) ;
            res.user = user;

           // console.log(user);
            
            if (!user) {
                return res.status(404).json({error:'Usuário não encontrado.'})
            }  
                      
        } catch (err) {
           // console.log('Erro nao conhecido como  ID midleware')
            return res.status(500).json({error:err.message})
            
        }


        next();
    },
}