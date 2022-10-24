const express = require('express')
const morgan = require('morgan')                            // Log les requêtes pour débugguer en dev
const bodyParser = require('body-parser')                   // Transforme automatiquement en json ou string
const sequelize = require('./src/db/sequelize')             // ORM
const fs = require('fs');

const app = express ()
const port = 3000

app
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb()

app.get('/', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('./index.html', null, (error, data) => {
        if (error) {
            res.writeHead(404);
            res.write('Whoops! File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
})

require('./src/routes/findAllTasks')(app)
require('./src/routes/findTaskByPk')(app)
require('./src/routes/createTask')(app)
require('./src/routes/updateTask')(app)
require('./src/routes/deleteTask')(app)

app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée! Essayez un autre URL.'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}`))