const { Task } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.get('/api/tasks', auth, (req, res) => {
    if(req.query.name) {
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5
    
      if(name.length < 2) {
        const message = 'le terme recherché doit au moins contenir 2 caractères'
        return res.status(400).json({ message })
      }  

      return Task.findAndCountAll({ 
        where: {
          name : {                       // 'name' est la propriété du modèle Task
            [Op.like]: `%${name}%`       // 'name' est le critère de recherche
          } 
        },
        limit: limit,
        order: ['name'] 
      })
      .then(({count, rows}) => {
        const message = `Il y a ${count} tâches qui correspondent au terme de recherche ${name}.`
        res.json({ message, data: rows})
      })
    } else {
    Task.findAll()
      .then(tasks => {
        const message = 'La liste des tâches a bien été récupérée.'
        res.json({ message, data: tasks })
      })
      .catch(error => {
        const message = "La liste des tâches n'a pas pu être récupérées. Réessayez dans quelques instants."
        res.status(500).json({ message, data: error })
      })
    }
  })
}