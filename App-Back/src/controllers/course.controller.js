import express from "express";
// import db from '../services/course.services'
import db from '../services/course.services.js'

const routes = express.Router();

routes.post('/', async (request, response) => {
  const { name, description, icon, groupId } = request.body;

  try {
    await db.createCourse(name, description, icon, groupId);

    return response.status(201).send({ message: 'Curso criado com sucesso.' });
  } catch (error) {
    return response.status(500).send({ message: `Erro no servidor: ${error}` })
  }

})

routes.put('/', async (request, response) => {
  try {
    const { name, description, icon, groupId, courseId } = request.body;

    await db.updateCourse(name, description, icon, groupId, courseId);

    response.status(200).send({ message: `Curso atualizado com sucesso` })
  } catch (error) {
    response.status(500).send({ message: `Erro ao atualizar o Curso. ${error}` });
  }

})

routes.delete('/:courseId', async (request, response) => {
  try {
    const { courseId } = request.params;

    await db.deleteCourse(courseId);

    return response.status(200).send({ message: `Curso deletado com sucesso.` })

  } catch (error) {
    response.status(500).send({ message: `Erro ao deletar o Curso. ${error}` })
  }
})

routes.get('/', async (request, response) => {
  try {
    const course = await db.getAllCourse();

    if (course.length > 0) {
      return response.status(200).send({ course: course });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar os Cursos. ${error}` })
  }
})

routes.get('/unique/:courseId', async (request, response) => {
  try {
    const { courseId } = request.params;

    const course = await db.getUniqueCourse(courseId);

    if (course.length > 0) {
      return response.status(200).send({ course: course });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar o curso. ${error}` })
  }
})

routes.get('/by/group/:groupId', async (request, response) => {
  try {
    const { groupId } = request.params;

    const course = await db.getCourseByGroup(groupId);

    if (course.length > 0) {
      return response.status(200).send({ course: course });
    } else {
      return response.status(204).end();
    }

  } catch (error) {
    response.status(500).send({ message: `Erro ao buscar o curso. ${error}` })
  }
})

export default routes;