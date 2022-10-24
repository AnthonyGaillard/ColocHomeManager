module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Task', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
              msg: 'Ce nom existe déjà.'
            }, 
            validate:{
              notEmpty: { msg: 'Le nom ne peut pas être vide.'},
              notNull: { msg: 'Le nom est une propriété requise.'}
            }
          },
          next: {
            type: DataTypes.STRING,
            allowNull: false,
          }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'modified'
      })
}