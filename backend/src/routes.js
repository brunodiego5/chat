import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import MessageController from './app/controllers/MessageController';
import SearchMessageController from './app/controllers/SearchMessageController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// métodos http: get, post, put, delete

// tipo de paramentros

// query params: /users?search=bruno (filtro, ordenacao paginacao)
// route params: request.params (identificar um recurso no put ou delete)
// body: request.body (dados para post ou put de um registro) )

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/* Apenas as rotas abaixo faram uso desse middlewares de auth */
routes.use(authMiddlewares);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);
routes.get('/messages', MessageController.index);
routes.post('/messages', MessageController.store);
routes.get('/searchmessages', SearchMessageController.index);
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
