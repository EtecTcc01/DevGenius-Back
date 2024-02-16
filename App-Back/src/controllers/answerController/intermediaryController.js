import express from "express";
import db from '../../services/answerServices/intermediaryServices.js'

//INCOMPLETO

const routes = express.Router();

routes.post('/', async (request, response) => {
  const { answer, idTask, altA, altB, altC, altD, altE } = request.body;

  try {
    await db.createAnswer( answer, idTask, altA, altB, altC, altD, altE );

    return response.status(201).send({ message: 'Resposta adicionada com sucesso.' });
  } catch (error) {
    return response.status(500).send({ message: `Erro no servidor: ${error}` })
  }

})

routes.put('/', async (request, response) => {
  try {
    const { answer, idTask, altA, altB, altC, altD, altE, idAnswer } = request.body;

    await db.updateAnswer(answer, idTask, altA, altB, altC, altD, altE, idAnswer);

    response.status(200).send({ message: `Resposta atualizada com sucesso` })
  } catch (error) {
    response.status(500).send({ message: `Erro ao atualizar a Resposta. ${error}` });
  }

})


routes.delete('/:idAnswer', async (request, response) => {
  try {
    const { idAnswer } = request.params; 

    await db.deleteAnswer(idAnswer);

    return response.status(200).send({ message: `Resposta deletado com sucesso.` })

  } catch (error) {
    response.status(500).send({ message: `Erro ao excluir a Resposta. ${error}` })
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
    response.status(500).send({ message: `Erro ao chamar a Resposta. ${error}` })
  }
})

routes.get('/un/:idAnswer', async (request, response) => {
  try {
    const { idAnswer } = request.params;

    const answer = await db.getAnswer(idAnswer);

    if (answer.length > 0) {
      return response.status(200).send({ answer: answer });
    } else {
      return response.status(204);
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao chamar a Resposta. ${error}` })
  }
})

routes.get('/unTask/:idTask', async (request, response) => {
  try {
    const { idTask } = request.params;

    const answer = await db.getAnswerTask(idTask);

    if (answer.length > 0) {
      return response.status(200).send({answer: answer});
    } else {
      return response.status(204);
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao trazer a Resposta. ${error}` })
  }
})

export default routes;