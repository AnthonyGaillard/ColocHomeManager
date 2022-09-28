const { Task } = require('../db/sequelize')
  
module.exports = (app) => {
  app.put('/api/tasks/:id', (req, res) => {
    const id = req.params.id
    Task.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      Task.findByPk(id).then(task => {
        const message = `La tâche ${task.name} a bien été modifié.`
        res.json({message, data: task })
      })
    })
  })
}