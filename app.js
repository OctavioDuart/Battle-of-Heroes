const express = require('express');
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const connection = require('./database/connection'); // @ Apenas para log
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./route/Powers/powers_crud')(app);
require('./route/Characters/characters_crud')(app);
require('./route/PowersAndCharacters/powers_characters_crud')(app);

app.listen(port, (err) => {
    (err) ? console.error(`Ocorreu um erro ao subir o servidor : ${err}`)
        :
        console.log(`Servidor iniciado com sucesso na porta  ${port}`);
})

