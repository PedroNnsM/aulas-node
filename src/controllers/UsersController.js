const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UsersController {
  /**
   * index - GET para listar varios registros.
   *  show - GET para exibir um registro especifico.
   * create - POST para criar um registro.
   * update - PUT para atualizar um registro.
   * delete - DELETE para remover um registro.
   */

  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();

    const checkUserExists = await database.get(
      //faz a busca no banco de dados
      "SELECT * FROM users WHERE email = (?)", [email]
    );

    if (checkUserExists) {
      throw new AppError("este email ja esta em uso");
    }
    // Serve para inserir dados no banco de dados
    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    return response.status(201).json();
  }
}

module.exports = UsersController;
