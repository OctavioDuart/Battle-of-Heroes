const express = require('express');
const router = express.Router();
const con = require('../../database/connection');

router.post('/register', (req, res) => {
    const data = req.body;

    const sql = `INSERT INTO personagens_poderes (id_personagem , id_poder) VALUES 
        ('${data.id_personagem}' ,'${data.id_poder}' )`;

    con.connection.query(sql)
        .then(() => {
            return res.status(200).send(`O poder foi atribuído ao personagem com sucesso`);
        })
        .catch(error => {
            if (error.original.errno === 1062)
                return res.status(500).send(`O poder de id : ${data.id_poder} já esta registrado para o personagem id : ${data.id_personagem}`);

            if (error.reltype === "child")
                return res.status(500).send(`O valor que referencia a tabela ${error.table} é inválido , consulte os IDs`);

            return res.status(500).send(`Ocorreu o seguinte erro ao registrar o poder ao personagem : ${error}`);
        });
});


router.get('/find', (req, res) => {

    const sql = `SELECT * FROM personagens_poderes`;

    con.connection.query(sql, { type: con.connection.QueryTypes.SELECT })
        .then(result => {
            if (result.length !== 0)
                return res.status(200).json(result);

            return res.status(500).send(`Não há dados registrados`);
        })
        .catch(error => {
            return res.status(500).send(`Ocorreu o seguinte erro ao consultar os dados : ${error}`);
        });
});




module.exports = app => app.use('/personagens/poderes', router);

// Poderes e Personagens
// Relação N -> N 