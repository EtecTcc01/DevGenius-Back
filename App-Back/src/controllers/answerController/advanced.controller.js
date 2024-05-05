import express from "express";
import db from '../../services/answerServices/advanced.services.js'

const routes = express.Router();

routes.post('/', async (request, response) => {
  const { code, taskId } = request.body;

  try {
    await db.createAnswer(code, taskId);

    return response.status(201).send({ message: 'Resposta adicionada com sucesso.' });
  } catch (error) {
    return response.status(500).send({ message: `Erro no servidor: ${error}` })
  }

})

routes.put('/', async (request, response) => {
  try {
    const { code, answerId } = request.body;

    await db.updateAnswer(code, answerId);

    response.status(200).send({ message: `Resposta atualizada com sucesso` })
  } catch (error) {
    response.status(500).send({ message: `Erro ao atualizar a Resposta. ${error}` });
  }

})


routes.delete('/:answerId', async (request, response) => {
  try {
    const { answerId } = request.params;

    await db.deleteAnswer(answerId);

    return response.status(200).send({ message: `Resposta deletado com sucesso.` })

  } catch (error) {
    response.status(500).send({ message: `Erro ao deletar a Resposta. ${error}` })
  }
})

routes.get('/', async (request, response) => {
  try {
    const answer = await db.getAllAnswer();

    if (answer.length > 0) {
      return response.status(200).send({ answer: answer });
    } else {
      return response.status(204);
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar a Resposta. ${error}` })
  }
})

routes.get('/unique/:answerId', async (request, response) => {
  try {
    const { answerId } = request.params;

    const answer = await db.getUniqueAnswer(answerId);

    if (answer.length > 0) {
      return response.status(200).send({ answer: answer });
    } else {
      return response.status(204);
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar a Resposta. ${error}` })
  }
})

routes.get('/by/task/:taskId', async (request, response) => {
  try {
    const { taskId } = request.params;

    const answer = await db.getAnswerByTask(taskId);

    if (answer.length > 0) {
      return response.status(200).send({ answer: answer });
    } else {
      return response.status(204);
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao trazer a Resposta. ${error}` })
  }
})

export default routes;