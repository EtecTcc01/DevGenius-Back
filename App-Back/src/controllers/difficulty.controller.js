import express from "express";
import db from '../services/difficulty.services.js'

const routes = express.Router();

routes.post('/', async (request, response) => {
  const { name, description } = request.body;

  try {
    await db.createDiff(name, description);

    return response.status(201).send({ message: 'Dificuldade adicionada com sucesso.' });
  } catch (error) {
    return response.status(500).send({ message: `Erro no servidor: ${error}` })
  }

})

routes.put('/', async (request, response) => {
  try {
    const { name, description, idDifficulty } = request.body;

    await db.updateDiff(name, description, idDifficulty);

    response.status(200).send({ message: `Dificuldade atualizada com sucesso` })
  } catch (error) {
    response.status(500).send({ message: `Erro ao atualizar a Dificuldade. ${error}` });
  }

})


routes.delete('/:idDifficulty', async (request, response) => {
  try {
    const { idDifficulty } = request.params;

    await db.deleteDiff(idDifficulty);

    return response.status(200).send({ message: `Dificuldade deletado com sucesso.` })

  } catch (error) {
    response.status(500).send({ message: `Erro ao excluir a Dificuldade. ${error}` })
  }
})

routes.get('/', async (request, response) => {
  try {
    const diff = await db.getAllDiff();

    if (diff.length > 0) {
      return response.status(200).send({ difficulty: diff });
    } else {
      return response.status(204);
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao chamar a Dificuldade. ${error}` })
  }
})

routes.get('/un/:idDifficulty', async (request, response) => {
  try {
    const { idDifficulty } = request.params;

    const diff = await db.getDiff(idDifficulty);

    if (diff.length > 0) {
      return response.status(200).send({ difficulty: diff });
    } else {
      return response.status(204);
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao chamar a Dificuldade. ${error}` })
  }
})

export default routes;