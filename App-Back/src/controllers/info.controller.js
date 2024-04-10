import express from "express";
import db from '../services/info.services.js'

const routes = express.Router();

routes.post('/', async (request, response) => {
  const { userName, firstName, lastName, userDate, userSex } = request.body;

  try {
    await db.createInfo(userName, firstName, lastName, userDate, userSex);

    return response.status(201).send({ message: 'Informação adicionada com sucesso.' });
  } catch (error) {
    return response.status(500).send({ message: `Erro no servidor: ${error}` })
  }
})

routes.put('/', async (request, response) => {
  try {
    const { firstName, lastName, userDate, userSex, userName } = request.body;

    await db.updateInfo({ firstName, lastName, userDate, userSex, userName });

    response.status(200).send({ message: `Informações do usuário ${userName} atualizados com sucesso` })
  } catch (error) {
    response.status(500).send({ message: `Erro ao atualizar os dados. ${error}` });
  }

})


routes.delete('/:userName', async (request, response) => {
  try {
    const { userName } = request.params;

    await db.deleteInfo(userName);

    return response.status(200).send({ message: `Usuario deletado com sucesso.` })

  } catch (error) {
    response.status(500).send({ message: `Erro ao excluir os dados. ${error}` })
  }
})

routes.get('/:userName', async (request, response) => {
  try {
    const { userName } = request.params;

    const info = await db.getInfo(userName);

    if (info.length > 0) {
      return response.status(200).send(json(info));
    } else {
      return response.status(204);
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao chamar as informações. ${error}` })
  }
})

export default routes;