const { Router } = require("express");

const NotesController = require("../controllers/NotesController");

const notesRoutes = Router();

// // middleware routes serve para interceptar as rotas podendo acessar as partes como request, response e fazer tratamento.
// function myMiddleware(request, response, next){
//     console.log('voce passou pelo middleware')

//     next()
// }

const notesController = new NotesController();

notesRoutes.post("/:user_id", notesController.create);
notesRoutes.get("/:id", notesController.show);

module.exports = notesRoutes;
