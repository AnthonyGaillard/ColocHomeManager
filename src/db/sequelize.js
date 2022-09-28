const { Sequelize, DataTypes } = require('sequelize')
const TaskModel = require('../models/task')

const sequelize = new Sequelize('colochomev2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  })

const Task = TaskModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
        Task.create({
            name : "test",
            state: "inactive",
            next: "none"
        }).then(task => console.log(task.toJSON()))
        console.log('La base de donnée a bien été initialisée !')
    })
  }
    
  module.exports = { 
    initDb, Task
  }