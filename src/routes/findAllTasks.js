const { Task } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/tasks', (req, res) => {
    Task.findAll()
      .then(tasks => {
        const message = 'La liste des tâches a bien été récupérée.'
        res.json({ message, data: tasks })
      })
  })
}