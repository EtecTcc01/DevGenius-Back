import express from "express";
import db from '../services/stage.services.js'

const routes = express.Router();

routes.post('/', async (request, response) => {
    const { name, courseId } = request.body;

    try {
        await db.createStage(name, courseId);

        return response.status(201).send({ message: 'Estágio adicionada com sucesso.' });
    } catch (error) {
        return response.status(500).send({ message: `Erro no servidor: ${error}` })
    }

})

routes.put('/', async (request, response) => {
    try {
        const { name, courseId, stageId } = request.body;

        await db.updateStage(name, courseId, stageId);

        response.status(200).send({ message: `Estágio atualizada com sucesso` })
    } catch (error) {
        response.status(500).send({ message: `Erro ao atualizar o Estágio. ${error}` });
    }

})


routes.delete('/:stageId', async (request, response) => {
    try {
        const { stageId } = request.params;

        await db.deleteStage(stageId);

        return response.status(200).send({ message: `Estágio deletado com sucesso.` })

    } catch (error) {
        response.status(500).send({ message: `Erro ao deletar o Estágio. ${error}` })
    }
})

routes.get('/', async (request, response) => {
    try {
        const stage = await db.getAllStage();

        if (stage.length > 0) {
            return response.status(200).send({ stage: stage });
        } else {
            return response.status(204).end();
        }

    } catch (error) {
        response.status(500).send({ message: `Erro ao buscar o Estágio. ${error}` })
    }
})

routes.get('/unique/:stageId', async (request, response) => {
    try {
        const { stageId } = request.params;

        const stage = await db.getUniqueStage(stageId);

        if (stage.length > 0) {
            return response.status(200).send({ stage: stage });
        } else {
            return response.status(204).end();
        }

    } catch (error) {
        response.status(500).send({ message: `Erro ao buscar o Estágio. ${error}` })
    }
})

routes.get('/by/course/:courseId', async (request, response) => {
    try {
        const { courseId } = request.params;

        const stage = await db.getStageByCourse(courseId);

        if (stage.length > 0) {
            return response.status(200).send({ stage: stage });
        } else {
            return response.status(204).end();
        }

    } catch (error) {
        response.status(500).send({ message: `Erro ao buscar o Estágio. ${error}` })
    }
})

export default routes;