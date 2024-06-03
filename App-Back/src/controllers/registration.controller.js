import express from "express";
import db from '../services/registration.services.js'

const routes = express.Router();

routes.post('/', async (request, response) => {
    const { userId, courseId } = request.body;

    try {
        await db.createRegistration(userId, courseId);

        return response.status(201).send({ message: 'Registro criado com sucesso.' });
    } catch (error) {
        return response.status(500).send({ message: `Erro no servidor: ${error}` })
    }

})

routes.put('/', async (request, response) => {
    try {
        const { phase, lifes, date, userId, courseId, registrationId } = request.body;

        await db.updateRegistration(phase, lifes, date, userId, courseId, registrationId);

        response.status(200).send({ message: `Registro atualizado com sucesso` })
    } catch (error) {
        response.status(500).send({ message: `Erro ao atualizar o Registro. ${error}` });
    }

})

routes.delete('/:registrationId', async (request, response) => {
    try {
        const { registrationId } = request.params;

        await db.deleteRegistration(registrationId);

        return response.status(200).send({ message: `Registro deletado com sucesso.` })

    } catch (error) {
        response.status(500).send({ message: `Erro ao deletar o Registro. ${error}` })
    }
})

routes.get('/', async (request, response) => {
    try {
        const registration = await db.getAllRegistration();

        if (registration.length > 0) {
            return response.status(200).send({ registration: registration });
        } else {
            return response.status(204).end();
        }

    } catch (error) {
        response.status(500).send({ message: `Erro ao buscar os Registros. ${error}` })
    }
})

routes.put('/level', async (request, response) => {
    try {
        const { stageLvl, registrationId } = request.body;

        await db.updateLevelRegistration(stageLvl, registrationId);

        const registration = await db.getUniqueRegistration(registrationId)

        if (registration.length > 0) {
            return response.status(200).send({
                registration: registration,
                message: `Registro atualizado com sucesso`
            });
        } else {
            return response.status(204).end();
        }
    } catch (error) {
        response.status(500).send({ message: `Erro ao atualizar o Registro. ${error}` });
    }
})

routes.put('/lifes', async (request, response) => {
    try {
        const { lifes, registrationId } = request.body;

        await db.updateLifeRegistration(lifes, registrationId);

        const registration = await db.getUniqueRegistration(registrationId)

        if (registration.length > 0) {
            return response.status(200).send({
                registration: registration,
                message: `Registro atualizado com sucesso`
            });
        } else {
            return response.status(204).end();
        }
    } catch (error) {
        response.status(500).send({ message: `Erro ao atualizar o Registro. ${error}` });
    }
})

routes.put('/phase', async (request, response) => {
    try {
        const { phase, registrationId } = request.body;

        await db.updatePhaseRegistration(phase, registrationId);

        const registration = await db.getUniqueRegistration(registrationId)

        if (registration.length > 0) {
            return response.status(200).send({
                registration: registration,
                message: `Registro atualizado com sucesso`
            });
        } else {
            return response.status(204).end();
        }
    } catch (error) {
        response.status(500).send({ message: `Erro ao atualizar o Registro. ${error}` });
    }
})

routes.get('/unique/:registrationId', async (request, response) => {
    try {
        const { registrationId } = request.params;

        const registration = await db.getUniqueRegistration(registrationId);

        if (registration.length > 0) {
            return response.status(200).send({ registration: registration });
        } else {
            return response.status(204).end();
        }

    } catch (error) {
        response.status(500).send({ message: `Erro ao buscar o Registro. ${error}` })
    }
})

routes.get('/for/stages/:dataIds', async (request, response) => {
    try {
        const { dataIds } = request.params;
        const dataS = dataIds.split(',')

        // [0] = userId || [1] = courseId
        const registration = await db.getRegistrationByCourse(dataS[0], dataS[1]);

        if (registration.length > 0) {
            return response.status(200).send({ registration: registration[0] });
        } else {
            return response.status(204).end();
        }

    } catch (error) {
        response.status(500).send({ message: `Erro ao buscar o Registro. ${error}` })
    }
})

routes.get('/by/group/:dataIds', async (request, response) => {
    try {
        const { dataIds } = request.params;
        const dataS = dataIds.split(',')

        const registration = await db.getRegistrationByGroup(dataS[0], dataS[1]);

        if (registration.length > 0) {
            return response.status(200).send({ registration: registration });
        } else {
            return response.status(204).end();
        }

    } catch (error) {
        response.status(500).send({ message: `Erro ao buscar o Registro. ${error}` })
    }
})

export default routes;