const { Router } = require('express');
const UserController = require('./controllers/UserController');
const MessageController = require('./controllers/MessageController');
const SearchMessageController = require('./controllers/SearchMessageController');


const routes = Router();


//métodos http: get, post, put, delete

//tipo de paramentros

//query params: /users?search=bruno (filtro, ordenacao paginacao)
//route params: request.params (identificar um recurso no put ou delete)
//body: request.body (dados para post ou put de um registro) )

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/messages', MessageController.index);
routes.post('/messages', MessageController.store);
routes.get('/searchmessages', SearchMessageController.index);

module.exports = routes;