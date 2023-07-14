const {Sequelize, DataTypes} = require('sequelize');
const fs = require("fs");
const path = require("path");

const db = {}

const sequelize = new Sequelize('amul_db_local', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
  });


//checking if connection is done
sequelize.authenticate().then(() => {
  console.log(`Database connected to discover`)
}).catch((err) => {
  console.log(err)
})

fs.readdirSync(path.join(__dirname, "/../models")).forEach((modelFile) => {
  const model = require(path.join(__dirname, "/../models/", modelFile))(
    sequelize,
    Sequelize
  );
  db[model.getTableName()] = model;
});


// associations
for (const model in db) {
  if ("associate" in db[model]) {
    db[model].associate(db);
  }
}


db.Sequelize = Sequelize
db.sequelize = sequelize

//connecting to model
// db.users = require('./agent_users') (sequelize, DataTypes)

//exporting the module
module.exports = db
