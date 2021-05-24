const router = require('express').Router();



const {Film} = require('../../db');
const {Personaje} = require('../../db');
const {Genero} = require('../../db');




// obtener peliculas
// querys:
// http://localhost3000/api/characters?name=...
// http://localhost3000/api/characters?genre=...
// http://localhost3000/api/characters?order=ASC|DESC
// imagen se concatena con este link https://www.imdb.com

router.get("/", async (req, res) => {
  
  const { name, genre, order } = req.query;

  // validacion query por nombre
  if (name) {
    const pelicula = await Film.findOne({
      where: { titulo: name }
    });
       
    const arrayPersonaje = await Personaje.findAll();
    const filterPersonajes = arrayPersonaje.filter(value => value.peliculaAsociada === pelicula.titulo )
    const mapeoPersonaje = filterPersonajes.map(value=>value.nombre);

    return res.json({
      titulo: pelicula.titulo,
      imagen: pelicula.imagen,
      fecha: pelicula.fechaDeCreacion,
      detalles: [
        {
         calificacion: pelicula.calificacion,
         personajeAsociado: mapeoPersonaje
        },
    
      ],
    });

  }
  // validacion query por genre
  if (genre) {
    const filmArray = await Film.findAll()
    const filterGenero = filmArray.filter(value=> value.genero === genre);
    const mapeo = filterGenero.map((value)=> {
      return {
        titulo: value.titulo,
        imagen: value.imagen,
        fechaDeCreacion: value.fechaDeCreacion
      }
    });

    res.send(mapeo)
    } 

  // order 
  if (order === 'ASC') {
    const pelis = await Film.findAll({
      attributes: ["titulo", "imagen", "fechaDeCreacion"]
    });
    const sort = pelis.sort((a, b) =>  Number(b.fechaDeCreacion) - Number(a.fechaDeCreacion) );
    return res.send(sort)
  }

  if (order === 'DESC') {
    const pelis = await Film.findAll({
      attributes: ["titulo", "imagen", "fechaDeCreacion"]
    });
    const sort = pelis.sort((a, b) =>   Number(a.fechaDeCreacion) - Number(b.fechaDeCreacion)  );
    return res.send(sort)
  }


  else {
    const pelis = await Film.findAll({
      attributes: ["titulo", "imagen", "fechaDeCreacion"],
    });
    res.json(pelis);
  }
});

// agregar pelicula
//https://www.imdb.com/title/tt0086250/
router.post('/', async(req, res)=> {
    const film = await Film.create(req.body);
    res.json(film);
});

// modificar pelicula
router.put('/:filmId', async(req, res) => {
    await Film.update(req.body, {
        where: {id: req.params.filmId}
    });

    res.json({success: 'Se ha modificado'})
});

// borrar pelicula
router.delete('/:filmId', async(req, res) => {
        await Film.destroy({
            where: {id: req.params.filmId}
        });

        res.json({ success: 'se ha borrado la pelicula'});

})

module.exports = router;









