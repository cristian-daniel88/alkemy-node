const router = require('express').Router();
const {Genero} = require('../../db')

//imagen se concatena con este link https://www.imdb.com

router.get('/', async(req, res) => {
    const genero = await Genero.findAll();
    res.send(genero)
});

router.post("/", async (req, res) => {
    const genero = await Genero.create(req.body);
    res.json(genero);
});

module.exports = router;