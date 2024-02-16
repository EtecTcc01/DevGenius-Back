import userController from './controllers/userController.js';
import infoController from './controllers/infoController.js';
import langController from './controllers/langController.js';
import difficultyController from './controllers/difficultyController.js';
import teoryController from './controllers/teoryController.js';
import basicController from './controllers/answerController/basicController.js';
import intermediaryController from './controllers/answerController/intermediaryController.js';
import advancedController from './controllers/answerController/advancedController.js';
import taskController from './controllers/taskController.js';
import loginController from './controllers/loginController.js';
import groupController from './controllers/groupController.js';
import express from 'express';

const routes = express();

routes.use('/user', userController);

routes.use('/login', loginController);

routes.use('/info', infoController);

routes.use('/language', langController);

routes.use('/difficulty', difficultyController);

routes.use('/teory', teoryController);

routes.use('/task', taskController);

routes.use('/basicAnswer', basicController);

routes.use('/intermediaryAnswer', intermediaryController);

routes.use('/advancedAnswer', advancedController);

routes.use('/group', groupController);

export default routes;