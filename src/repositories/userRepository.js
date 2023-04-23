const sqliteConnection = require("../database/sqlite");

class userRepository {
  async findByEmail(email) {
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE email = (?)", [
      email,
    ]);
  }

  async create({name, email, password}) {
    const database = await sqliteConnection();
    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
  }
}
module.exports = userRepository;
