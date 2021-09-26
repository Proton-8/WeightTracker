const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    }
}

User.init(
    {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
        fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
        //username: {
        email:{
        type: DataTypes.STRING,
        allowNull: false,
  
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currentWeight: {
        type: DataTypes.INTEGER,
        allowNull:false,
      },
      targetWeight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
      },
      targetDate: {
        type: DataTypes.DATE,
      }
    },

{
    hooks: {
        beforeCreate: async(newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        beforeUpdate: async(updatedUserData) => {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: 'user',
});

module.exports = User;