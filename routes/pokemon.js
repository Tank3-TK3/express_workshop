const expres = require('express');
const pokemon = expres.Router();
const db = require('../config/database');

pokemon.post("/", (req, res, next) => {
    return res.status(200).json(req.body);
});

pokemon.get('/', async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({ code: 1, message: pkmn });
});

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id = " + id + ";");
    (id >= 1 && id <= 722) ? 
        res.status(200).json({ code: 1, message: pkmn }) : 
        res.status(404).json({ code: 404, message: "Pokemon no encontrado" });
});

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name = '"+name.toLowerCase()+"';");
    (pkmn.length > 0) ? 
        res.status(200).json({ code: 1, message: pkmn }) : 
        res.status(404).send({ code: 404, message: "Pokemon no encontrado" });
});

module.exports = pokemon;