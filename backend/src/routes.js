const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();


//métodos http: get, post, put, delete

//tipo de paramentros

//query params: /users?search=bruno (filtro, ordenacao paginacao)
//route params: request.params (identificar um recurso no put ou delete)
//body: request.body (dados para post ou put de um registro) )

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes;