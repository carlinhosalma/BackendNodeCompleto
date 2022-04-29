const express = require('express');
const {v4:uuid} = require('uuid');

const routes = express.Router();


//UPLOADS
const multer = require('multer');
const uploadConfig = require('./config/upload');



const lojaController = require('./controllers/lojaController');
const lojaMiddleware = require('./middlewares/lojaMiddleware');

const userController = require('./controllers/userController');
const userMiddleware = require('./middlewares/userMiddleware');

const dashboardLojasController = require('./controllers/dashboardLojasController');
const dashboardDriversController = require('./controllers/dashboardDrivresController');

const driverController = require('./controllers/driverController');
const driverMiddleware = require('./middlewares/driverMiddleware');

// ROTA ABERTA PARA IDENTIFICAÇÃO
routes.get('/',(req, res)=>{ res.send('DinnApp')});
// DRIVER - MOTOQUEIROS

routes.get('/driver',driverController.index);
routes.post('/driver',driverMiddleware.validateId,multer(uploadConfig).single('nomeCNH'), driverController.store);
routes.put('/driver/:id', driverMiddleware.validateId, multer(uploadConfig).single('nomeCNH'), driverController.update);
routes.get('/driver/:ramo',driverController.show);
routes.delete('/driver/:id', driverMiddleware.validateId, driverController.destroy);

//LOJAS
routes.get('/loja',lojaController.index);
routes.post('/loja',lojaMiddleware.validateId,multer(uploadConfig).single('nomeFachada'), lojaController.store);
routes.put('/loja/:id', lojaMiddleware.validateId, multer(uploadConfig).single('nomeFachada'), lojaController.update);
routes.get('/loja/:ramo',lojaController.show);
routes.delete('/loja/:id', lojaMiddleware.validateId, lojaController.destroy);

// USER multer(uploadConfig).single('nomeImage')
routes.post('/user',userController.store);
routes.get('/user',userController.index);
routes.put('/user/:id', userMiddleware.validateId, multer(uploadConfig).single('nomeImage'), userController.update);
routes.delete('/user/:id', userMiddleware.validateId, userController.destroy);

//DASHBOARD
routes.get('/lojas',dashboardLojasController.index);
routes.get('/drivers',dashboardDriversController.index);



module.exports = routes;