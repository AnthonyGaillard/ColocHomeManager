module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Task', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          state: {
            type: DataTypes.STRING,
            allowNull: false
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