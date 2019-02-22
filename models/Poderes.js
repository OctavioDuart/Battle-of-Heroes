const db = require('../database/connection');

const Poderes = db.connection.define('poderes', {
    poder: {
        type: db.Sequelize.STRING
    }
});

module.exports = Poderes;