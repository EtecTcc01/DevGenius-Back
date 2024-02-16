import express from "express";
import db from '../services/taskServices.js'

const routes = express.Router();

routes.post('/', async (request, response) => {
  const {name, task, explanation, idLanguage, idDifficulty, exp} = request.body;
  
  try {
    await db.createTask(name, task, explanation, idLanguage, idDifficulty, exp);
    
    return response.status(201).send({message: 'Tarefa adicionada com sucesso.'});
  } catch (error) {
      return response.status(500).send({message: `Erro no servidor: ${error}`}) 
  }

})

routes.put('/', async (request, response) => {
  try {
  const {name, task, explanation, idLanguage, idDifficulty, exp, idTask} = request.body;

  await db.updateTask(name, task, explanation, idLanguage, idDifficulty, exp, idTask);

  response.status(200).send({message: `Tarefa atualizada com sucesso`})
  } catch (error) {
    response.status(500).send({message: `Erro ao atualizar a tarefa. ${error}`});
  }

})



routes.delete('/:idTask', async (request, response) => {
  try {
    const {idTask} = request.params; 
    
    await db.deleteTask(idTask);
    
    return response.status(200).send({message: `Tarefa deletado com sucesso.`})
    
  }catch (error) {
    response.status(500).send({message: `Erro ao excluir a tarefa. ${error}`})
  }
})

routes.get('/', async (request, response) => {
  try {
    const task = await db.getAllTask();

    if (task.length > 0) {
      return response.status(200).send({task: task});
    } else {
      return response.status(204);
    }

  }catch (error) {
    response.status(500).send({message: `Erro ao chamar a Tarefa. ${error}`})
  }
})

routes.get('/un/:idLanguage/:idDifficulty', async (request, response) => {
  try {
    const {idLanguage, idDifficulty} = request.params;

    const task = await db.getTask(idLanguage, idDifficulty);

    if (task.length > 0) {
      return response.status(200).send({task: task});
    } else {
      return response.status(204);
    }

  }catch (error) {
    response.status(500).send({message: `Erro ao chamar a tarefa. ${error}`})
  }
})

routes.get('/unName/:name', async (request, response) => {
  try {
    const {name} = request.params;

    const task = await db.getNameTask(name);

    if (task.length > 0) {
      return response.status(200).send({task: task});
    } else {
      return response.status(204);
    }

  }catch (error) {
    response.status(500).send({message: `Erro ao chamar a tarefa. ${error}`})
  }
})

routes.get('/unLang/:idLanguage', async (request, response) => {
  try {
    const {idLanguage} = request.params;

    const task = await db.getLangTask(idLanguage);

    if (task.length > 0) {
      return response.status(200).send({task: task});
    } else {
      return response.status(204);
    }

  }catch (error) {
    response.status(500).send({message: `Erro ao chamar a tarefa. ${error}`})
  }
})

export default routes;