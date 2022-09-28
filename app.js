const express = require('express')
const morgan = require('morgan')                            // Log les requêtes pour débugguer en dev
const bodyParser = require('body-parser')                   // Transforme automatiquement en json ou string
const sequelize = require('./src/db/sequelize')             // ORM

const app = express ()
const port = 3000

app
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb()

require('./src/routes/findAllTasks')(app)
require('./src/routes/findTaskByPk')(app)
require('./src/routes/createTask')(app)
require('./src/routes/updateTask')(app)
require('./src/routes/deleteTask')(app)


app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}`))