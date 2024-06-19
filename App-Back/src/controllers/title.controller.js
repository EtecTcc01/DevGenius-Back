import express from "express";
import db from '../services/title.services.js'

const routes = express.Router();

routes.post('/', async (request, response) => {
  const { name, description, exp } = request.body;

  try {
    await db.createTitle(name, description, exp);

    return response.status(201).send({ message: 'Título criado com sucesso.' });
  } catch (error) {
    return response.status(500).send({ message: `Erro no servidor: ${error}` })
  }

})

routes.put('/', async (request, response) => {
  try {
    const { name, description, exp, titleId } = request.body;

    await db.updateTitle(name, description, exp, titleId);

    response.status(200).send({ message: `Título atualizado com sucesso` })
  } catch (error) {
    response.status(500).send({ message: `Erro ao atualizar o Título. ${error}` });
  }

})

routes.delete('/:titleId', async (request, response) => {
  try {
    const { titleId } = request.params;

    await db.deleteTitle(titleId);

    return response.status(200).send({ message: `Título deletado com sucesso.` })

  } catch (error) {
    response.status(500).send({ message: `Erro ao deletar o Título. ${error}` })
  }
})

routes.get('/', async (request, response) => {
  try {
    const title = await db.getAllTitle();

    if (title.length > 0) {
      return response.status(200).send({ title: title });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar os Títulos. ${error}` })
  }
})

routes.post('/user/title', async (request, response) => {
  const { userId, titleId } = request.body;

  try {
    await db.createUserTitle(userId, titleId);

    return response.status(201).send({ message: 'Título adicionado com sucesso.' });
  } catch (error) {
    return response.status(500).send({ message: `Erro no servidor: ${error}` })
  }

})

routes.get('/unique/:titleId', async (request, response) => {
  try {
    const { titleId } = request.params;

    const title = await db.getUniqueTitle(titleId);

    if (title.length > 0) {
      return response.status(200).send({ title: title });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar o Título. ${error}` })
  }
})

routes.get('/by/user/:userId', async (request, response) => {
  try {
    const { userId } = request.params;

    const title = await db.getTitleByUser(userId);

    if (title.length > 0) {
      return response.status(200).send({ title: title });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar o Título. ${error}` })
  }
})

export default routes;