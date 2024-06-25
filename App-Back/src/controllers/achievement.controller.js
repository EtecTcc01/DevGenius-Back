import express from "express";
import db from '../services/achievement.services.js'

const routes = express.Router();

routes.post('/register', async (request, response) => {
  const { title, description, icon, exp } = request.body;

  try {
    await db.createAchievement(title, description, icon, exp);

    return response.status(201).send({ message: 'Conquista criado com sucesso.' });
  } catch (error) {
    return response.status(500).send({ message: `Erro no servidor: ${error}` })
  }

})

routes.put('/', async (request, response) => {
  try {
    const { title, description, icon, exp, achievementId } = request.body;

    await db.updateAchievement(title, description, icon, exp, achievementId);

    response.status(200).send({ message: `Conquista atualizado com sucesso` })
  } catch (error) {
    response.status(500).send({ message: `Erro ao atualizar o Conquista. ${error}` });
  }

})

routes.delete('/:achievementId', async (request, response) => {
  try {
    const { achievementId } = request.params;

    await db.deleteAchievement(achievementId);

    return response.status(200).send({ message: `Conquista deletado com sucesso.` })

  } catch (error) {
    response.status(500).send({ message: `Erro ao deletar o Conquista. ${error}` })
  }
})

routes.get('/', async (request, response) => {
  try {
    const achievement = await db.getAllAchievement();

    if (achievement.length > 0) {
      return response.status(200).send({ achievement: achievement });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar os Conquistas. ${error}` })
  }
})

routes.post('/user/register', async (request, response) => {
  const { userId, achievementId } = request.body;

  try {
    await db.createUserAchievement(userId, achievementId);

    return response.status(201).send({ message: 'Conquista adicionada com sucesso.' });
  } catch (error) {
    return response.status(500).send({ message: `Erro no servidor: ${error}` })
  }

})

routes.get('/unique/:achievementId', async (request, response) => {
  try {
    const { achievementId } = request.params;

    const achievement = await db.getUniqueAchievement(achievementId);

    if (achievement.length > 0) {
      return response.status(200).send({ achievement: achievement });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar o Conquista. ${error}` })
  }
})

routes.get('/by/user/:userId', async (request, response) => {
  try {
    const { userId } = request.params;

    const achievement = await db.getAchievementByUser(userId);

    if (achievement.length > 0) {
      return response.status(200).send({ achievement: achievement });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar o Conquista. ${error}` })
  }
})

routes.get('/by/user/ordened/:userId', async (request, response) => {
  try {
    const { userId } = request.params;

    const achievement = await db.getAchievementByUserOrdened(userId);

    if (achievement.length > 0) {
      return response.status(200).send({ achievement: achievement });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar o Conquista. ${error}` })
  }
})

routes.get('/all/by/user/:userId', async (request, response) => {
  try {
    const { userId } = request.params;

    const achievement = await db.getAllAchievementsByUser(userId);

    if (achievement.length > 0) {
      return response.status(200).send({ achievement: achievement });
    } else {
      return response.status(204).send({ message: "Usuário sem conquistas adquiridas." });
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar o Conquista. ${error}` })
  }
})

export default routes;