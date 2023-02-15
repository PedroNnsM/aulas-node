const { Router } = require("express");

const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();

// // middleware routes serve para interceptar as rotas podendo acessar as partes como request, response e fazer tratamento.
// function myMiddleware(request, response, next){
//     console.log('voce passou pelo middleware')

//     next()
// }

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);

module.exports = usersRoutes;
