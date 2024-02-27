import express from "express";
import db from '../services/group.services.js'

const routes = express.Router();

routes.post('/', async (request, response) => {
    const { name } = request.body;

    try {
        await db.createGroup(name);

        return response.status(201).send({ message: 'Grupo adicionado com sucesso.' });
    } catch (error) {
        return response.status(500).send({ message: `Erro no servidor: ${error}` })
    }

})

routes.post('/groupUser', async (request, response) => {
    const { idGroup, userName } = request.body;

    try {
        await db.createGroupUser(idGroup, userName);

        return response.status(201).send({ message: 'Usuário adicionado ao grupo com sucesso.' });
    } catch (error) {
        return response.status(500).send({ message: `Erro no servidor: ${error}` })
    }

})

routes.put('/', async (request, response) => {
    try {
        const { name, idGroup } = request.body;

        await db.updateGroup(name, idGroup);

        response.status(200).send({ message: `Grupo atualizada com sucesso` })
    } catch (error) {
        response.status(500).send({ message: `Erro ao atualizar o Grupo. ${error}` });
    }

})

routes.delete('/:idGroup', async (request, response) => {
    try {
        const { idGroup } = request.params;

        await db.deleteGroup(idGroup);

        return response.status(200).send({ message: `Grupo deletado com sucesso.` })

    } catch (error) {
        response.status(500).send({ message: `Erro ao excluir o Grupo. ${error}` })
    }
})

routes.get('/', async (request, response) => {
    try {
        const group = await db.getAllGroup();

        if (group.length > 0) {
            return response.status(200).send({ group: group });
        } else {
            return response.status(204);
        }

    } catch (error) {
        response.status(500).send({ message: `Erro ao chamar os Grupo. ${error}` })
    }
})

routes.get('/un/:idGroup', async (request, response) => {
    try {
        const { idGroup } = request.params;
        const group = await db.getGroup(idGroup);

        if (group.length > 0) {
            return response.status(200).send({ group: group });
        } else {
            return response.status(204);
        }

    } catch (error) {
        response.status(500).send({ message: `Erro ao chamar os Grupo. ${error}` })
    }
})

routes.get('/userGroups/:userName', async (request, response) => {
    try {
        const { userName } = request.params;
        const group = await db.getAllGroupUserJoin(userName);

        if (group.length > 0) {
            return response.status(200).send({ group: group });
        } else {
            return response.status(204);
        }

    } catch (error) {
        response.status(500).send({ message: `Erro ao chamar os Grupo. ${error}` })
    }
})

export default routes;