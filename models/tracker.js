const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tracker extends Model {}

Tracker.init(
    {
      //   user_id: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: 'User',
      //     key: 'id',
      //     unique: false
      //   }
      // },
        date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        
      },
        dailyWeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
  
      },
      
    },

{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tracker',
});

module.exports = Tracker;