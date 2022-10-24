const { ValidationError } = require('sequelize')
const { Task } = require('../db/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.post('/api/tasks', (req, res) => {
    Task.create(req.body)
      .then(task => {
        const message = `La tâche ${req.body.name} a bien été crée.`
        res.json({ message, data: task })
      })
      .catch(error => {
        if(error instanceof ValidationError){
          return res.status(400).json({ message: error.message, data: error })
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error})
        }
        const message = "La Tâche n'a pas pu être ajoutée. Réessayez dans quelques instants."
        res.status(500).json({ message, data: error })
      })
  })
}