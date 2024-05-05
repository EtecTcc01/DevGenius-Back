import express from "express";
import db from '../services/task.services.js'

const routes = express.Router();

routes.post('/', async (request, response) => {
  const { name, task, explanation, exp, operationId, stageId } = request.body;

  try {
    await db.createTask(name, task, explanation, exp, operationId, stageId);

    return response.status(201).send({ message: 'Tarefa adicionada com sucesso.' });
  } catch (error) {
    return response.status(500).send({ message: `Erro no servidor: ${error}` })
  }

})

routes.put('/', async (request, response) => {
  try {
    const { name, task, explanation, exp, operationId, stageId, taskId } = request.body;

    await db.updateTask(name, task, explanation, exp, operationId, stageId, taskId);

    response.status(200).send({ message: `Tarefa atualizada com sucesso` })
  } catch (error) {
    response.status(500).send({ message: `Erro ao atualizar a tarefa. ${error}` });
  }

})

routes.delete('/:taskId', async (request, response) => {
  try {
    const { taskId } = request.params;

    await db.deleteTask(taskId);

    return response.status(200).send({ message: `Tarefa deletado com sucesso.` })

  } catch (error) {
    response.status(500).send({ message: `Erro ao deletar a tarefa. ${error}` })
  }
})

routes.get('/', async (request, response) => {
  try {
    const task = await db.getAllTask();

    if (task.length > 0) {
      return response.status(200).send({ task: task });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar a Tarefa. ${error}` })
  }
})

routes.get('/unique/:taskId', async (request, response) => {
  try {
    const { taskId } = request.params;

    const task = await db.getUniqueTask(taskId);

    if (task.length > 0) {
      return response.status(200).send({ task: task });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar a tarefa. ${error}` })
  }
})

routes.get('/by/stage/:stageId', async (request, response) => {
  try {
    const { stageId } = request.params;

    const task = await db.geTaskByStage(stageId);

    if (task.length > 0) {
      return response.status(200).send({ task: task });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar a tarefa. ${error}` })
  }
})

export default routes;