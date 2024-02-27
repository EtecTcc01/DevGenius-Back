import express from "express";
import db from '../services/user.services.js'

const routes = express.Router();

routes.post('/register', async (request, response) => {
  try {
    const { userName, userEmail, userPassword, typeUser } = request.body;

    await db.createUser(userName, userEmail, userPassword, typeUser);

    return response.status(201).send({ message: 'Usuario criado com sucesso.' });
  } catch (error) {
    return response.status(500).send({ message: `Erro no servidor: ${error}` })
  }

})

routes.post('/validation', async (request, response) => {
  const { userEmail, userPassword } = request.body;

  const emailTest = await db.handleVerifyEmail(userEmail);

  if (emailTest.length < 1) {
    return response.status(401).send({ message: 'Email não cadastrado.' });
  }

  const user = await db.handleLogin(userEmail, userPassword);

  if (user.length < 1) {
    response.status(401).send({ message: 'Email ou senha inválido.' });
  } else {
    response.status(200).send({ message: 'Login feito com sucesso.' });
  }
});

routes.put('/', async (request, response) => {
  try {
    const { userName, userEmail, userPassword, typeUser } = request.body;

    await db.updateUser({ userName, userEmail, userPassword, typeUser });

    response.status(200).send({ message: `Dados do usuário ${userName} atualizados com sucesso` })
  } catch (error) {
    response.status(500).send({ message: `Erro ao atualizar os dados. ${error}` });
  }

})


routes.delete('/:userName', async (request, response) => {
  try {
    const { userName } = request.params;

    await db.deleteUser(userName);

    return response.status(200).send({ message: `Usuario deletado com sucesso.` })

  } catch (error) {
    response.status(500).send({ message: `Erro ao excluir os dados. ${error}` })
  }
})

routes.get('/', async (request, response) => {
  try {
    const users = await db.getUser();

    if (users.length > 0) {
      return response.status(200).send({ message: users });
    } else {
      return response.status(204);
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao chamar os dados. ${error}` })
  }
})

routes.get('/un/:userEmail', async (request, response) => {
  try {
    const { userEmail } = request.params;

    const users = await db.getUserEmail(userEmail);

    if (users.length > 0) {
      return response.status(200).send({ user: users });
    } else {
      return response.status(204);
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao chamar os dados. ${error}` })
  }
})

export default routes;