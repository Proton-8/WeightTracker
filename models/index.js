const User = require('./user');
const Plan = require('./plan');

User.hasMany(Plan, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Plan.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Plan };