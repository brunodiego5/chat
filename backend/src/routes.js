import { Router } from 'express';
import UserController from './app/controllers/UserController';
import MessageController from './app/controllers/MessageController';
import SearchMessageController from './app/controllers/SearchMessageController';

const routes = new Router();

// métodos http: get, post, put, delete

// tipo de paramentros

// query params: /users?search=bruno (filtro, ordenacao paginacao)
// route params: request.params (identificar um recurso no put ou delete)
// body: request.body (dados para post ou put de um registro) )

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/messages', MessageController.index);
routes.post('/messages', MessageController.store);
routes.get('/searchmessages', SearchMessageController.index);

export default routes;
