const express = require('express');
const router = express.Router();
const con = require('../../database/connection');
const querys = require('../../sql/query');

router.post('/register', (req, res) => {
    const data = req.body;

    const sql = `INSERT INTO personagens_poderes (id_personagem , id_poder) VALUES ('${data.id_personagem}' ,'${data.id_poder}' )`;

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

    con.connection.query(querys.find_power_heroe, { type: con.connection.QueryTypes.SELECT })
        .then(result => {
            if (result.length !== 0)
                return res.status(200).send(result);

            return res.status(200).send(`Não há dados registrados`);
        })
        .catch(error => {
            return res.status(500).send(`Ocorreu o seguinte erro ao consultar os dados : ${error}`);
        });
});

router.get('/find/one/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const sql = `SELECT personagens.nome , poderes.poder FROM personagens_poderes 
    INNER JOIN personagens ON personagens.id = personagens_poderes.id_personagem AND personagens.id = ${id}
    INNER JOIN poderes 	ON poderes.id = personagens_poderes.id_poder ORDER BY nome ;`

    con.connection.query(sql, { type: con.connection.QueryTypes.SELECT })
        .then(result => {
            if (result.length !== 0)
                return res.status(200).send(result);

            return res.status(200).send(`Não há dados registrados`);
        })
        .catch(error => {
            return res.status(500).send(`Ocorreu o seguinte erro ao consultar os dados : ${error}`);
        });

});

router.put('/update/:id_character/:id_power', (req, res) => {
    const idp = parseInt(req.params.id_character); // ID Personagem
    const idw = parseInt(req.params.id_power);     // ID Poder
    const new_value = req.body.id_poder;           // Novo ID a ser inserido

    const sql = `UPDATE personagens_poderes 
    SET id_poder = ${new_value} WHERE id_personagem = ${idp} AND id_poder = ${idw}`;

    con.connection.query(sql, { type: con.connection.QueryTypes.UPDATE })
        .then(() => {
            return res.status(200).send(`O registro foi alterado com sucesso .`);
        })
        .catch(error => {
            if (error.original.errno === 1062)
                return res.status(500).send(`O poder ID: ${new_value} já esta inserido no personagem ID: ${idp}`);

            if (error.reltype === "child")
                return res.status(500).send(`O ID ${new_value} é inválido , consulte os IDs de poderes`);

            return res.status(500).send(`Ocorreu o seguinte erro ao alterar o registro ${error}`);
        });
});


router.delete('/remove/:id_character/:id_power' , (req , res) => {
    const idp = parseInt(req.params.id_character);
    const idw = parseInt(req.params.id_power);

    const sql = `DELETE FROM personagens_poderes WHERE id_personagem= ${idp} AND id_poder = ${idw} `;

    con.connection.query(sql , {type: con.connection.QueryTypes.DELETE})
        .then(() => {
            return res.status(200).send(`O registro foi deletado com sucesso`);
        })
        .catch(error => {
            return res.status(500).send(`Ocorreu o seguinte erro ao deletar o registro : ${error}`);
        });
});




module.exports = app => app.use('/personagens/poderes', router);

// Poderes e Personagens
// Relação N -> N 