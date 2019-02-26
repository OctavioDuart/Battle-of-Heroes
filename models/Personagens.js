const db = require('../database/connection');

const Personagens = db.connection.define('personagens', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    sexo: {
        type: db.Sequelize.STRING(1),
        allowNull: false
    },
    tipo: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    universo: {
        type: db.Sequelize.STRING(6),
        allowNull: false
    },
    origem: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    time: {
        type: db.Sequelize.STRING(50),
        allowNull: false
    }
});

//Personagens.sync({ force: true });
module.exports = Personagens;