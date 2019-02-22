const Sequelize = require('sequelize');
const connection = new Sequelize('battle_of_heroes', 'root', 'Insira sua senha aqui', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    operatorsAliases: false,

    additional: {
        timestamps: false
    }
});

connection.authenticate()
    .then(() => {
        console.log(`A conexão com o banco foi estabelecida com sucesso ! . `);
    })
    .catch((error) => {
        console.error(`Ocorreu um erro ao se conectar com o banco ${error}`);
    });

module.exports = {
    Sequelize: Sequelize,
    connection: connection
};
