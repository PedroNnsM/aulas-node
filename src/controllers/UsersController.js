const { hash, compare } = require("bcryptjs");

const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");
const { application } = require("express");
const { use } = require("../routes");

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
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkUserExists) {
      throw new AppError("este email ja esta em uso");
    }

    const hashedPassword = await hash(password, 8);
    // Serve para inserir dados no banco de dados
    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("Usuario não encontrado");
    }

    const userWithUpdateEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("Este e-mail ja esta em uso.");
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        "Você precisa informar a senha antiga para definir a nova senha"
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError("A senha não confere.");
      }

      user.password = await hash(password, 8);
    }

    await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = ?
      WHERE id = ?`,
      [user.name, user.email, password, new Date(), id]
    );

    return response.json();
  }
}

module.exports = UsersController;
