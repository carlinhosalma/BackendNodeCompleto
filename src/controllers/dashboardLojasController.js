const {v4:UuId} = require('uuid');
const Loja = require('../models/Loja');

module.exports = {

    async index(request, response){

    const { user_id:user } = request.headers;

        try {
          const dashboard = await Loja.find({user}).populate('user').exec();
            return response.status(200).json({dashboard});

        } catch (err) {
            return response.status(500).json({ error: err.message })
        }

    }
}






