const db = require('../database/connection');

const Personagens = db.connection.define('personagens', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    sexo: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    tipo: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    universo: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    origem: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    time: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Personagens;