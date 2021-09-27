const User = require('./user');
const Tracker = require('./tracker');

// User.hasMany(Tracker, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE'
// });

// Tracker.belongsTo(User, {
//     foreignKey: 'user_id'
// });

module.exports = { User, Tracker };