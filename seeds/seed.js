const sequelize = require('../config/connection');
const { User, Tracker } = require('../models');

const userData = require('./userData.json');
const trackerData = require('./trackerData.json');

const createDatabase = async() => {
    
    // await sequelize.query(`DROP DATABASE IF EXISTS ${sequelize.config.database};`);
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${sequelize.config.database};`);
    console.log("database: " + sequelize.config.database)
    await sequelize.query(`USE ${sequelize.config.database};`)
}

const seedDatabase = async() => {
    await createDatabase();

    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();