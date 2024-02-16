import express from "express";

import cors from "cors";
import routes from './routes.js';

const api = express();

api.use(cors());

api.use(express.json());

api.use('/devgenius', routes);

api.listen(3333, () => {
  console.log('Servidor RODANDO! WIUWIU ☜(ﾟヮﾟ☜) ')
})
