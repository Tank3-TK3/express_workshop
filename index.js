const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemon = require('./routes/pokemon');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    return res.status(200).send('Bienvenidos al Pokedex');
});

app.use('/pokemon', pokemon);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is runing...');
});