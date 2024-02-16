import express from "express";
import db from '../services/langServices.js'

const routes = express.Router();

routes.post('/', async (request, response) => {
  const {name, description} = request.body;
  
  try {
    await db.createLang(name, description);
    
    return response.status(201).send({message: 'Linguagem adicionada com sucesso.'});
  } catch (error) {
    return response.status(500).send({message: `Erro no servidor: ${error}`}) 
  }

})

routes.put('/', async (request, response) => {
  try {
  const {name, description, idLanguage} = request.body;

  await db.updateLang(name, description, idLanguage);

  response.status(200).send({message: `Linguagem atualizada com sucesso`})
  } catch (error) {
    response.status(500).send({message: `Erro ao atualizar a Linguagem. ${error}`});
  }

})


routes.delete('/:idLanguage', async (request, response) => {
  try {
    const {idLanguage} = request.params; 

    await db.deleteLang(idLanguage);

    return response.status(200).send({message: `Linguagem deletado com sucesso.`})

  }catch (error) {
    response.status(500).send({message: `Erro ao excluir a Linguagem. ${error}`})
  }
})

routes.get('/', async (request, response) => {
  try {
    const lang = await db.getAllLang();

    if (lang.length > 0) {
      return response.status(200).send({language: lang});
    } else {
      return response.status(204);
    }

  }catch (error) {
    response.status(500).send({message: `Erro ao chamar a Linguagem. ${error}`})
  }
})

routes.get('/group/:idGroup', async (request, response) => {
  try {
    const {idGroup} = request.params;

    const lang = await db.getAllLangGroup(idGroup);

    if (lang.length > 0) {
      return response.status(200).send({language: lang});
    } else {
      return response.status(204);
    }

  }catch (error) {
    response.status(500).send({message: `Erro ao chamar a Linguagem. ${error}`})
  }
})

routes.get('/un/:idLanguage', async (request, response) => {
  try {
    const {idLanguage} = request.params;

    const lang = await db.getLang(idLanguage);

    if (lang.length > 0) {
      return response.status(200).send({language: lang});
    } else {
      return response.status(204);
    }

  }catch (error) {
    response.status(500).send({message: `Erro ao chamar a Linguagem. ${error}`})
  }
})

export default routes;