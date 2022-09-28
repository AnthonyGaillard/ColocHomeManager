const { Task } = require('../db/sequelize')
  
module.exports = (app) => {
  app.post('/api/tasks', (req, res) => {
    Task.create(req.body)
      .then(task => {
        const message = `La tâche ${req.body.name} a bien été crée.`
        res.json({ message, data: task })
      })
      .catch(error => {
        const message = "La tâche n'a pas pu être crée. Réessayez dans quelques instants."
        res.status(500).json({ message, data: error })
      })
  })
}