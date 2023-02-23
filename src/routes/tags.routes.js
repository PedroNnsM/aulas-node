const { Router } = require("express");

const TagsController = require("../controllers/TagsController");

const tagsRoutes = Router();

// // middleware routes serve para interceptar as rotas podendo acessar as partes como request, response e fazer tratamento.
// function myMiddleware(request, response, next){
//     console.log('voce passou pelo middleware')

//     next()
// }

const tagsController = new TagsController();

tagsRoutes.get("/:user_id", tagsController.index);

module.exports = tagsRoutes;
