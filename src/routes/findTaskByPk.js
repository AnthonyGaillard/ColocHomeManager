const { Task } = require('../db/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.get('/api/tasks/:id', auth, (req, res) => {
    Task.findByPk(req.params.id)
      .then(task => {
        if (task === null) {
            const message = "La tâche demandée n'existe pas. Réessayez avec un autre identifiant."
            return res.status(404).json({message})
        }
        const message = 'Une tâche a bien été trouvé.'
        res.json({ message, data: task })
      })
      .catch(error => {
        const message = "La tâche n'a pas pu être récupéré. Réessayez dans quelques instants."
        res.status(500).json({ message, data: error })
      })
  })
}