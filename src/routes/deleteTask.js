const { Task } = require('../db/sequelize')
  
module.exports = (app) => {
  app.delete('/api/tasks/:id', (req, res) => {
    Task.findByPk(req.params.id).then(task => {
      const taskDeleted = task;
      Task.destroy({
        where: { id: task.id }
      })
      .then(_ => {
        const message = `La tâche avec l'identifiant n°${taskDeleted.id} a bien été supprimé.`
        res.json({message, data: taskDeleted })
      })
    })
  })
}