const { Task } = require('../db/sequelize')
  
module.exports = (app) => {
  app.put('/api/tasks/:id', (req, res) => {
    const id = req.params.id
    return Task.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      Task.findByPk(id).then(task => {
        if (task === null) {
            const message = "La tâche demandée n'existe pas. Réessayez avec un autre identifiant."
            return res.status(404).json({message})
        }
        const message = `La tâche ${task.name} a bien été modifié.`
        res.json({message, data: task })
      })
    })
    .catch(error => {
        const message = "La tâche n'a pas pu être modifiée. Réessayez dans quelques instants."
        res.status(500).json({ message, data: error })
      })
  })
}