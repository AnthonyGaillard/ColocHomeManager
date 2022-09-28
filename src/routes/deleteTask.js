const { Task } = require('../db/sequelize')
  
module.exports = (app) => {
  app.delete('/api/tasks/:id', (req, res) => {
    Task.findByPk(req.params.id).then(task => {
        if (task === null) {
            const message = "La tâche demandée n'existe pas. Réessayez avec un autre identifiant."
            return res.status(404).json({message})
        }    
        const taskDeleted = task;
        return Task.destroy({
            where: { id: task.id }
        })
        .then(_ => {
            const message = `La tâche avec l'identifiant n°${taskDeleted.id} a bien été supprimé.`
            res.json({message, data: taskDeleted })
        })
    })
    .catch(error => {
        const message = "La tâche n'a pas pu être supprimé. Réessayez dans quelques instants."
        res.status(500).json({ message, data: error })
    })
  })
}