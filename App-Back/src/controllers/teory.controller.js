import express from "express";
import db from '../services/teory.services.js'

const routes = express.Router();

routes.post('/', async (request, response) => {
  const { name, teory, stageId } = request.body;

  try {
    await db.createTeory(name, teory, stageId);

    return response.status(201).send({ message: 'Teoria adicionada com sucesso.' });
  } catch (error) {
    return response.status(500).send({ message: `Erro no servidor: ${error}` })
  }

})

routes.put('/', async (request, response) => {
  try {
    const { name, teory, stageId, teoryId } = request.body;

    await db.updateTeory(name, teory, stageId, teoryId);

    response.status(200).send({ message: `Teoria atualizada com sucesso` })
  } catch (error) {
    response.status(500).send({ message: `Erro ao atualizar a teoria. ${error}` });
  }

})


routes.delete('/:teoryId', async (request, response) => {
  try {
    const { teoryId } = request.params;

    await db.deleteTeory(teoryId);

    return response.status(200).send({ message: `Teoria deletado com sucesso.` })

  } catch (error) {
    response.status(500).send({ message: `Erro ao excluir a teoria. ${error}` })
  }
})

routes.get('/', async (request, response) => {
  try {
    const teory = await db.getAllTeory();

    if (teory.length > 0) {
      return response.status(200).send({ teory: teory });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar a teoria. ${error}` })
  }
})

routes.get('/unique/:teoryId', async (request, response) => {
  try {
    const { teoryId } = request.params;

    const teory = await db.getUniqueTeory(teoryId);

    if (teory.length > 0) {
      return response.status(200).send({ teory: teory });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar a teoria. ${error}` })
  }
})

routes.get('/by/course/:courseId', async (request, response) => {
  try {
    const { courseId } = request.params;

    const teory = await db.getTeoryByCourse(courseId);

    if (teory.length > 0) {
      return response.status(200).send({ teory: teory });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar a teoria. ${error}` })
  }
})

routes.get('/by/group/ordened/:groupId', async (request, response) => {
  try {
    const { groupId } = request.params;

    const teory = await db.getTeoryOrdenedByGroup(groupId);

    if (teory.length > 0) {
      return response.status(200).send({ teory: teory });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar a teoria. ${error}` })
  }
})

routes.get('/by/stage/:stageId', async (request, response) => {
  try {
    const { stageId } = request.params;

    const teory = await db.getTeoryByStage(stageId);

    if (teory.length > 0) {
      return response.status(200).send({ teory: teory });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar a teoria. ${error}` })
  }
})

export default routes;