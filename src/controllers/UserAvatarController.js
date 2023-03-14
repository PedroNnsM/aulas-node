const { diskStorage } = require("multer");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFileName = request.file.filename;

    const user = await knex("users").where({ id: user_id });

    if (!user) {
      throw new AppError(
        "Somente usuários atenticados podem mudar a foto de perfil",
        401
      );

      if(user.avatar){
        await diskStorage
      }
    }
  }
}

module.exports = UserAvatarController;
