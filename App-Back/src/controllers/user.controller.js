import express from "express";
import db from '../services/user.services.js'

const routes = express.Router();

routes.post('/register', async (request, response) => {
  try {
    const { userEmail, userName, userPassword, userType } = request.body;

    const user = await db.createUser(userEmail, userName, userPassword, userType);

    return response.status(201).send({ message: 'Usuario criado com sucesso.', user: user });
  } catch (error) {
    return response.status(500).send({ message: `Erro no servidor: ${error}` })
  }

})

routes.put('/', async (request, response) => {
  try {
    const { userName, userEmail, userPassword, userId } = request.body;

    await db.updateUser(userName, userEmail, userPassword, userId);

    response.status(200).send({ message: `Dados do usuário ${userName} atualizados com sucesso` })
  } catch (error) {
    response.status(500).send({ message: `Erro ao atualizar os dados. ${error}` });
  }

})

routes.put('/inactive', async (request, response) => {
  try {
    const { userId } = request.body;

    await db.inactiveUser(userId);

    response.status(200).send({ message: `Usuário ${userId} desativado com sucesso` })
  } catch (error) {
    response.status(500).send({ message: `Erro ao atualizar os dados. ${error}` });
  }

})


routes.delete('/:userId', async (request, response) => {
  try {
    const { userId } = request.params;

    await db.deleteUser(userId);

    return response.status(200).send({ message: `Usuario deletado com sucesso.` })

  } catch (error) {
    response.status(500).send({ message: `Erro ao excluir os dados. ${error}` })
  }
})

routes.get('/', async (request, response) => {
  try {
    const users = await db.getAllUser();

    if (users.length > 0) {
      return response.status(200).send({ message: users });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar os dados. ${error}` })
  }
})

routes.get('/unique/:userId', async (request, response) => {
  try {
    const { userId } = request.params;

    const users = await db.getUniqueUser(userId);

    if (users.length > 0) {
      return response.status(200).send({ user: users });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar os dados. ${error}` })
  }
})

routes.get('/userInfo/:userId', async (request, response) => {
  try {
    const { userId } = request.params;

    const users = await db.getUserInfo(userId);

    if (users.length > 0) {
      return response.status(200).send({ user: users });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar os dados. ${error}` })
  }
})

//LOGIN --------------------------------------------------------------------------

routes.post('/validation', async (request, response) => {
  const { userEmail, userPassword } = request.body;
  const dataTest = [userEmail]

  const emailTest = await db.handleVerification([userEmail]);

  if (emailTest.length > 1) {
    return response.status(401).send({ message: 'Email já cadastrado.' });
  }

  const user = await db.handleLogin(userEmail, userPassword);

  if (user.length < 1) {
    response.status(401).send({ message: 'Email ou senha inválido.' });
  } else {
    response.status(200).send({
      message: 'Login realizado com sucesso.',
      user: emailTest
    });
  }
});

routes.get('/verify/:dataTest', async (request, response) => {
  try {
    let { dataTest } = request.params;

    if (dataTest.includes(",")) {
      dataTest = dataTest.split(",")
    }

    const verifyTest = await db.handleVerification(dataTest);

    if (verifyTest.length < 1) {
      response.status(200).send({ message: 'Email/Usuário não cadastrado.' });
    } else {
      return response.status(401).send({ message: 'Email/Usuário já cadastrado.' });
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar os dados. ${error}` })
  }
});

export default routes;