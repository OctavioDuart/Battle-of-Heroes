const express = require('express');
const router = express.Router();
const Personagens = require('../../models/Personagens');

router.post('/register', (req, res) => {
    const character = req.body;

    Personagens.findOne({ where: { nome: character.nome } })
        .then(result => {
            if (!result) {
                Personagens.create(character);
                return res.status(200).send(`${character.nome} foi registrado(a) com sucesso`);
            } else {
                return res.status(200).send(`Esse personagem já foi registrado`);
            }
        })
        .catch(error => {
            return res.status(500).send(`Ocorreu o seguinte erro ao registrar o personagem : ${error}`);
        });
});

router.get('/find', (req, res) => {

    Personagens.findAll()
        .then(result => {
            if (result.length !== 0)
                return res.status(200).send(result);
            return res.status(200).send(`Não há personagens registrados na base de dados`);
        })
        .catch(error => {
            return res.status(500).send(`Ocorreu o seguinte erro na consulta pelos personagens : ${error}`);
        });
});

router.get('/find/one/:id', (req, res) => {

    Personagens.findById(req.params.id)
        .then(result => {
            if (result)
                return res.status(200).send(result);
            return res.status(200).send(`ID não encontrado . `);
        })
        .catch(error => {
            return res.status(500).send(`Ocorreu o seguinte erro na consulta dos dados ${error}`);
        });
});

router.put('/update/:id', (req, res) => {
    Personagens.findById(req.params.id)
        .then(result => {
            if (!result)
                return res.status(200).send(`ID não encontrado`);

            Personagens.update(req.body,
                { returning: true, where: { id: req.params.id } }
            )
                .then(() => {
                    return res.status(200).send(`Os dados foram alterados com sucesso`);
                })
                .catch(error => {
                    return res.status(500).send(`Ocorreu o seguinte erro ao alterar os dados : ${error}`);
                });
        })
        .catch(error => {
            return res.status(500).send(`Ocorreu o seguinte erro ao alterar os dados : ${error}`);
        });
});

router.delete('/remove/:id', (req, res) => {
    Personagens.findById(req.params.id)
        .then(result => {
            if (!result)
                return res.status(200).send(`ID não encontrado`);

            Personagens.destroy({ where: { id: req.params.id } })
                .then(() => {
                    return res.status(200).send(`Personagem deletado com sucesso ! .`);
                })
                .catch(error => {
                    return res.status(500).send(`Ocorreu o seguinte erro ao deletar o personagem ${error}`)
                });
        })
        .catch(error => {
            return res.status(500).send(`Ocorreu o seguinte erro ao deletar o personagem ${error}`);
        });
});

module.exports = app => app.use('/personagens', router);