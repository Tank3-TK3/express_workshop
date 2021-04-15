const expres = require('express');
const pokemon = expres.Router();
const db = require('../config/database');

pokemon.post("/", async (req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
    if (pok_name && pok_height && pok_weight && pok_base_experience) {
        let query = "INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)";
        query += ` VALUES('${pok_name}',${pok_height},${pok_weight},${pok_base_experience})`;
        const rows = await db.query(query);
        if(rows.affectedRows == 1) {
           return res.status(201).json({code: 201, message: "Pokemon insertado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

pokemon.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM pokemon WHERE pok_id=${req.params.id}`;
    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
        return res.status(200).json({code: 200, message: "Pokemon borrado correctamete" });
    }
    return res.status(404).json({ code: 404, message: "Pokemon no encontrado" });
});

pokemon.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
    if (pok_name && pok_height && pok_weight && pok_base_experience) {
        let query = `UPDATE pokemon SET pok_name='${pok_name}', pok_height=${pok_height},`;
        query += `pok_weight=${pok_weight}, pok_base_experience=${pok_base_experience} WHERE pok_id=${req.params.id};`;
        const rows = await db.query(query);
        if(rows.affectedRows == 1) {
           return res.status(200).json({code: 200, message: "Pokemon actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

pokemon.patch("/:id([0-9]{1,3})", async (req, res, next) => {
    if (req.body.pok_name) {
        let query = `UPDATE pokemon SET pok_name='${req.body.pok_name}' WHERE POK_ID=${req.params.id}`;
        const rows = await db.query(query);
        if(rows.affectedRows == 1) {
           return res.status(200).json({code: 200, message: "Pokemon actualizado correctamente"});
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error" })
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

pokemon.get('/', async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({ code: 200, message: pkmn });
});

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id = " + id + ";");
    (id >= 1 && id <= 722) ? 
        res.status(200).json({ code: 200, message: pkmn }) : 
        res.status(404).json({ code: 404, message: "Pokemon no encontrado" });
});

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name = '"+name.toLowerCase()+"';");
    (pkmn.length > 0) ? 
        res.status(200).json({ code: 200, message: pkmn }) : 
        res.status(404).send({ code: 404, message: "Pokemon no encontrado" });
});

module.exports = pokemon;