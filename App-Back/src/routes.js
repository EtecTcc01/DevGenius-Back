import userController from './controllers/user.controller.js';
import infoController from './controllers/info.controller.js';
import languageController from './controllers/language.controller.js';
import difficultyController from './controllers/difficulty.controller.js';
import teoryController from './controllers/teory.controller.js';
import basicController from './controllers/answerController/basic.controller.js';
import intermediaryController from './controllers/answerController/intermediary.controller.js';
import advancedController from './controllers/answerController/advanced.controller.js';
import taskController from './controllers/task.controller.js';
import groupController from './controllers/group.controller.js';
import express from 'express';

const routes = express();

routes.use('/user', userController);

routes.use('/info', infoController);

routes.use('/language', languageController);

routes.use('/difficulty', difficultyController);

routes.use('/teory', teoryController);

routes.use('/task', taskController);

routes.use('/basicAnswer', basicController);

routes.use('/intermediaryAnswer', intermediaryController);

routes.use('/advancedAnswer', advancedController);

routes.use('/group', groupController);

export default routes;