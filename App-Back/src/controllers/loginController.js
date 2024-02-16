import express from "express";
import db from "../services/loginServices.js";

const routes = express.Router();

routes.post('/', async (request, response) => {
    const {userEmail, userPassword} = request.body;

    const emailTest = await db.verifyEmail(userEmail);

    if (emailTest.length < 1) {
        return response.status(401).send({message: 'Email não cadastrado.'});
    }

    const user = await db.handleLogin(userEmail, userPassword);

    if(user.length < 1) {
         response.status(401).send({message: 'Email ou senha inválido.'});
    } else{
         response.status(200).send({message: 'Login feito com sucesso.'});
    }
});

export default routes;