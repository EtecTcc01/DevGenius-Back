import express from "express";
import db from '../services/group.services.js'

const routes = express.Router();

routes.post('/', async (request, response) => {
    try {
        const { name } = request.body;

        await db.createGroup(name);

        return response.status(201).send({ message: 'Grupo adicionado com sucesso.' });
    } catch (error) {
        return response.status(500).send({ message: `Erro no servidor: ${error}` })
    }

})

routes.put('/', async (request, response) => {
    try {
        const { name, groupId } = request.body;

        await db.updateGroup(name, groupId);

        response.status(200).send({ message: `Grupo atualizado com sucesso` })
    } catch (error) {
        response.status(500).send({ message: `Erro ao atualizar o Grupo. ${error}` });
    }

})

routes.delete('/:groupId', async (request, response) => {
    try {
        const { groupId } = request.params;

        await db.deleteGroup(groupId);

        return response.status(200).send({ message: `Grupo deletado com sucesso.` })

    } catch (error) {
        response.status(500).send({ message: `Erro ao deletar o Grupo. ${error}` })
    }
})

routes.get('/', async (request, response) => {
    try {
        const group = await db.getAllGroup();

        if (group.length > 0) {
            return response.status(200).send({ group: group });
        } else {
            return response.status(204).end();
        }

    } catch (error) {
        response.status(500).send({ message: `Erro ao buscar os Grupo. ${error}` })
    }
})

routes.post('/userGroup', async (request, response) => {
    const { groupId, userId } = request.body;

    const verifyTest = await db.handlerVerification(groupId, userId)

    if (verifyTest.length > 0) {
        return response.status(401).send({ message: 'Usuário já cadastrado no grupo.' });
    }

    try {
        await db.createUserGroup(groupId, userId);

        return response.status(201).send({ message: 'Usuário adicionado ao grupo com sucesso.' });
    } catch (error) {
        return response.status(500).send({ message: `Erro no servidor: ${error}` })
    }

})

routes.get('/unique/:groupId', async (request, response) => {
    try {
        const { groupId } = request.params;
        const group = await db.getUniqueGroup(groupId);

        if (group.length > 0) {
            return response.status(200).send({ group: group });
        } else {
            return response.status(204).end();
        }

    } catch (error) {
        response.status(500).send({ message: `Erro ao buscar os Grupo. ${error}` })
    }
})

routes.get('/userGroups/:userId', async (request, response) => {
    try {
        const { userId } = request.params;
        // console.log(userId)
        const group = await db.getAllUserGroup(userId);

        if (group.length > 0) {
            return response.status(200).send({ group: group });
        } else {
            return response.status(204).end();
        }

    } catch (error) {
        response.status(500).send({ message: `Erro ao buscar os Grupo. ${error}` })
    }
})

export default routes;