require('dotenv').config();

const express = require('express');
const path = require('path');

//configurando as rotas
const routes = require('./routes')

//conexão
const connectMG =  require('./database');
connectMG();

// definindo a porta
const PORT = 3333;



const app = express();

app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

//require('./controllers/authController')(app)

app.listen(PORT,()=>{
    console.log(`backend rodando em http://localhost:${PORT}/`);
})