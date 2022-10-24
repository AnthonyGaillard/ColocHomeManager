const { Sequelize, DataTypes } = require('sequelize')
const TaskModel = require('../models/task')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')

const sequelize = new Sequelize('colochomev2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  })

const Task = TaskModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    Task.create({
      name : "test",
      next: "none"
    }).then(task => console.log(task.toJSON()))

    bcrypt.hash('coloc512',10)
    .then(hash => User.create({ username: 'antho', password: hash }))
    .then(user => console.log(user.toJSON()))

    console.log('La base de donnée a bien été initialisée !')
  })   
}

  
    
  module.exports = { 
    initDb, Task
  }