const express = require('express');
const router = express.Router();
const Poderes = require('../../models/Poderes');

router.post('/register', (req, res) => {
    const power = req.body.poder;

    Poderes.findOne({ where: { poder: power } })
        .then(response => {
            if (!response) {
                Poderes.create({ poder: power });
                return res.status(200).send(`O poder ${power} foi criado com sucesso`);
            } else {
                return res.status(500).send(`Esse poder já está cadastrado`);
            }
        })
        .catch(error => {
            return res.status(500).send(`Ocorreu o seguinte erro ao salvar o novo poder : ${error}`);
        });
});

router.get('/find', (req, res) => {
    Poderes.findAll().
        then(result => {
            if (result.length !== 0)
                return res.status(200).send(result);
            return res.status(200).send(`Não existem poderes cadastrados`);
        })
        .catch(error => {
            return res.status(500).send(`Ocorreu o seguinte erro na busca dos dados ${error}`);
        })
});

router.get('/find/one/:id', (req, res) => {
    Poderes.findById(req.params.id)
        .then(result => {
            if (result)
                return res.status(200).send(result);
            return res.status(200).send(`ID não encontrado`);
        })
        .catch(error => {
            return res.status(500).send(`Ocorreu o seguinte erro na busca ${error}`);
        });
});

router.put('/update/:id', (req, res) => {
    Poderes.findById(req.params.id)
        .then(response => {
            if (!response)
                return res.status(200).send(`ID não encontrado`);

            Poderes.update(
                { poder: req.body.poder },
                { returning: true, where: { id: req.params.id } })
                .then(() => {
                    return res.status(200).send(`O poder foi alterado com sucesso`);
                })
                .catch(error => {
                    return res.status(500).send(`Ocorreu o seguinte erro ao alterar o registro : ${error}`);
                });
        })
        .catch(error => {
            return res.status(500).send(`Ocorreu o seguinte erro ao alterar o registro : ${error}`);
        });
});

router.delete('/remove/:id', (req, res) => {
    Poderes.findById(req.params.id)
        .then(response => {
            if (!response)
                return res.status(200).send(`ID não encontrado`);

            Poderes.destroy({ where: { id: req.params.id } })
                .then(() => {
                    return res.status(200).send(`O poder foi deletado com sucesso`);
                })
                .catch(error => {
                    return res.status(500).send(`Ocorreu o seguinte erro ao deletar o poder ${error}`);
                });
        })
        .catch(error => {
            return res.status(500).send(`Ocorreu o seguinte erro ao deletar o poder ${error}`);
        });
});

module.exports = app => app.use('/poderes', router);