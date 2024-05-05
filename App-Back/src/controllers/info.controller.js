import express from "express";
import db from '../services/info.services.js'

const routes = express.Router();

routes.post('/', async (request, response) => {
  const { firstName, lastName, userDate, userSex, userId } = request.body;

  try {
    await db.createInfo(firstName, lastName, userDate, userSex, userId);

    return response.status(201).send({ message: 'Informações do usuário adicionada com sucesso.' });
  } catch (error) {
    return response.status(500).send({ message: `Erro no servidor: ${error}` })
  }
})

routes.put('/', async (request, response) => {
  try {
    const { firstName, lastName, userDate, profileImage, userSex, userId } = request.body;

    await db.updateInfo(firstName, lastName, userDate, profileImage, userSex, userId);

    response.status(200).send({ message: `Informações do usuário ${userId} atualizados com sucesso` })
  } catch (error) {
    response.status(500).send({ message: `Erro ao atualizar os dados. ${error}` });
  }

})


routes.delete('/:userId', async (request, response) => {
  try {
    const { userId } = request.params;

    await db.deleteInfo(userId);

    return response.status(200).send({ message: `Usuario deletado com sucesso.` })

  } catch (error) {
    response.status(500).send({ message: `Erro ao excluir os dados. ${error}` })
  }
})

routes.get('/', async (request, response) => {
  try {
    const info = await db.getAllInfo();

    if (info.length > 0) {
      return response.status(200).send({ message: info });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar os dados. ${error}` })
  }
})

routes.get('/unique/:userId', async (request, response) => {
  try {
    const { userId } = request.params;

    const info = await db.getUniqueInfo(userId);

    if (info.length > 0) {
      return response.status(200).send({ message: info });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar os dados. ${error}` })
  }
})

export default routes;