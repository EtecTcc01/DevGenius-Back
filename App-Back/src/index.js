import express from "express";

import cors from "cors";
import routes from './routes.js';

const api = express();

api.use(cors());

api.use(express.json());

api.use('/devgenius', routes);

api.listen(process.env.PORT || 3000, () => {
  console.log('Servidor RODANDO! WIUWIU ☜(ﾟヮﾟ☜) ')
})
