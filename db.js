const Sequelize = require("sequelize");

const databaseUrl = //this line is in SLACK!!!
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";

const db = new Sequelize(databaseUrl);

db.sync({ force: false })
  .then(() => console.log("Database synced"))
  .catch(error => console.log("DB error", error));


module.exports = db