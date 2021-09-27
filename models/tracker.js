const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tracker extends Model {}


Tracker.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    track_date: {
        type: DataTypes.DATE,
        allowNull: false,

    },
    daily_weight: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        }
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tracker',
});

module.exports = Tracker;