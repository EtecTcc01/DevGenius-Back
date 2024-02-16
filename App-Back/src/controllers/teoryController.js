import express from "express";
import db from '../services/teoryServices.js'

const routes = express.Router();

routes.post('/', async (request, response) => {
  const {name, teory, idLanguage, idDifficulty} = request.body;
  
  try {
    await db.createTeory(name, teory, idLanguage, idDifficulty);
    
    return response.status(201).send({message: 'Teoria adicionada com sucesso.'});
  } catch (error) {
      return response.status(500).send({message: `Erro no servidor: ${error}`}) 
  }

})

routes.put('/', async (request, response) => {
  try {
  const {name, teory, idLanguage, idDifficulty, idTeory} = request.body;

  await db.updateTeory(name, teory, idLanguage, idDifficulty, idTeory);

  response.status(200).send({message: `Teoria atualizada com sucesso`})
  } catch (error) {
    response.status(500).send({message: `Erro ao atualizar a teoria. ${error}`});
  }

})


routes.delete('/:idTeory', async (request, response) => {
  try {
    const {idTeory} = request.params;

    await db.deleteTeory(idTeory);

    return response.status(200).send({message: `Teoria deletado com sucesso.`})

  }catch (error) {
    response.status(500).send({message: `Erro ao excluir a teoria. ${error}`})
  }
})

routes.get('/', async (request, response) => {
  try {
    const teory = await db.getAllTeory();

    if (teory.length > 0) {
      return response.status(200).send({teory: teory});
    } else {
      return response.status(204);
    }

  }catch (error) {
    response.status(500).send({message: `Erro ao chamar a Linguagem. ${error}`})
  }
})

routes.get('/un/:idTeory', async (request, response) => {
  try {
    const {idTeory} = request.params;

    const teory = await db.getTeory(idTeory);

    if (teory.length > 0) {
      return response.status(200).send({teory: teory});
    } else {
      return response.status(204);
    }

  }catch (error) {
    response.status(500).send({message: `Erro ao chamar a teoria. ${error}`})
  }
})

export default routes;