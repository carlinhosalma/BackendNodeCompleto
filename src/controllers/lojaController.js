const {v4:UuId} = require('uuid');
const Loja = require('../models/Loja');

module.exports = {

    async index(request, response){
        try {
            const loja = await Loja.find();
            return response.status(200).json({loja});
        } catch (err) {
            return response.status(500).json({ error: err.message })
        }

    },

   async show(request, response){
    //console.log(request.params);
    const { ramo } = request.params;
    const busca = await Loja.find({ ramos: ramo });

        try {
            
            return response.status(200).json({busca});
        } catch (err) {
            return response.status(500).json({ error: `${busca} foi não encotrado` })
        }

    },
   

    async store(request, response){
        
        const {originalname:nomeFachada,filename:keyFachada} = request.file;
        const { user_id } = request.headers;
        const {nomeComercial,emailComercial,enderecoComercial,cnpj,zapComercial,cidadeComercio,cepComercial,ufComercio,latlong,thumbnail,produtos } = request.body;
        
       // filename
        
        //mensagens de erro enviadas para o front antes de ir para o banco
        
        if(!nomeComercial){return response.status(400).json({error:'Informe o nome do estabelecimento'})}
        if(!emailComercial){return response.status(400).json({error:'Informe o email comercial'})}
        if(!enderecoComercial){return response.status(400).json({error:'Informe o endereço do estabelecimento'})}
        if(!cnpj){return response.status(400).json({error:'Informe o cnpj'})}
        if(!zapComercial){return response.status(400).json({error:'Informe a celular comercial'})}
        if(!cidadeComercio){return response.status(400).json({error:'Informe a cidade comercial'})}
        if(!ufComercio){return response.status(400).json({error:'Informe o estado comercial'})}
        if(!produtos){return response.status(400).json({error:'Informe os produtos'})}
        if(!cepComercial){return response.status(400).json({error:'Informe o CEP comercial'})}

        
        if(!nomeFachada){return response.status(400).json({error:'Envie uma foto do estabelecimento'})}
        
        //tratando as variáveis antes de ir para o banco

        
        const loja = new Loja({ 
            _id:UuId(),
            user:user_id,
            nomeFachada,
            keyFachada,
            nomeComercial,
            emailComercial,
            enderecoComercial,
            cnpj,
            zapComercial,
            cidadeComercio,
            cepComercial,
            ufComercio,
            latlong,
            thumbnail,
            situacao:false,
            thumbnail,
            produtos:produtos.split(',').map(produto => produto.trim()),
            
        });
        console.log(loja);
      
        //gravando no banco
        try {
            await loja.save();
            return response.status(201).json({message:'Loja cadastrada com sucesso'})
            
        } catch (erro) {
            return response.status(400).json({ error: erro.message })
        }
    },

    async update(request, response){
        const {originalname:nomeFachada,filename:keyFachada} = request.file;

       const {nomeComercial,emailComercial,enderecoComercial,cnpj,zapComercial,cidadeComercio,cepComercial,ufComercio,latlong,thumbnail,situacao,produtos } = request.body
       // console.log(request.body);

        if(nomeComercial) response.loja.nomeComercial = nomeComercial;
        if(emailComercial) response.loja.emailComercial = emailComercial;
        if(enderecoComercial) response.loja.enderecoComercial = enderecoComercial;
        if(cnpj) response.loja.cnpj = cnpj;
        if(zapComercial) response.loja.zapComercial = zapComercial;
        if(cidadeComercio) response.loja.cidadeComercio = cidadeComercio;
        if(cepComercial) response.loja.cepComercial = cepComercial;
        if(ufComercio) response.loja.ufComercio = ufComercio;
        if(latlong) response.loja.latlong = latlong;
        if(thumbnail) response.loja.thumbnail = thumbnail;
        if(situacao) response.loja.situacao = situacao;
        if(produtos) response.loja.produtos = produtos;
        if(nomeFachada) response.loja.nomeFachada = nomeFachada;
        if(keyFachada) response.loja.keyFachada = keyFachada;
       
        
        try {
            await response.loja.save();
            return response.status(200).json({message:'Loja alterada com sucesso'})  
        } catch (erro) {     
            return response.status(500).json({ error: erro.message })          
        }

    },

    async destroy(request,response){
        try {
            await response.loja.remove();
            return response.status(200).json({message:'Loja deletada com sucesso'}) 
            
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