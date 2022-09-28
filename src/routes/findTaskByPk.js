const { Task } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/tasks/:id', (req, res) => {
    Task.findByPk(req.params.id)
      .then(task => {
        const message = 'Une tâche a bien été trouvé.'
        res.json({ message, data: task })
      })
  })
}