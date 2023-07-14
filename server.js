const express = require("express");
const dotenv = require("dotenv").config();
const sequelize = require('sequelize')
const routes = require('./routes/index');
const db = require('./database')
const middlewares = require('./middleware/index')

const port = process.env.PORT || 5050;

const app = express();

// middleware
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser())
middlewares(app)
routes(app)

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("db has been re sync")
// })

db.sequelize
  .sync({ alter: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port no ${port}`);
    })
  })
  .catch((err) => {
    console.log("Error while syncing database...", err);
  });

// app.listen(port, () => {
//     console.log(`server running on port ${port}`);
// }
// )