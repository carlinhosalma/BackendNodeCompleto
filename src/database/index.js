
const mongoose = require('mongoose');

function ConnectMG () {
    
mongoose.connect(process.env.DATA_URL,{

    useNewUrlParser:true,
    useUnifiedTopology:true,
});

const db = mongoose.connection;   

db.on("error",()=>console.error(error));
db.once("open",()=>console.log('Banco de dados em mongodb conectado!!!')) 

//mongoose.Promise = global.Promise;    
}
  






module.exports = ConnectMG;