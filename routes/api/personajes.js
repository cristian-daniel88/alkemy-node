const router = require("express").Router();

const { Personaje } = require("../../db");





// obtener los personajes
// querys:
// http://localhost3000/api/characters?nombre=...
// http://localhost3000/api/characters?edad=...
// http://localhost3000/api/characters?movies=...
// imagen se concatena con este link https://www.imdb.com

router.get("/", async (req, res) => {
  const { nombre, edad, movies } = req.query;

  if (nombre) {
    const personaje = await Personaje.findOne({
      where: { nombre: nombre },
    });

    return res.json({
      nombre: personaje.nombre,
      imagen: personaje.imagen,
      detalles: [
        {
          edad: personaje.edad,
          peso: personaje.peso,
          historia: personaje.historia,
          peliculasSeries: personaje.peliculaAsociada,
        },
      ],
    });
  }

  if (edad) {
    const arrayPersonaje = await Personaje.findAll();
    const filterPersonajes = arrayPersonaje.filter(
      (value) => value.edad == edad
    );
    const mapeoPersonaje = filterPersonajes.map((value) => {
      const personaj = {
        nombre: value.nombre,
        imagen: value.imagen,
        detalles: [
          {
            edad: value.edad,
            peso: value.peso,
            historia: value.historia,
            peliculasSeries: value.peliculaAsociada,
          },
        ],
      };
      return personaj;
    });

    return res.json(mapeoPersonaje);
  }
  if (movies) {
    const arrayPersonaje = await Personaje.findAll();
    const filterPersonajes = arrayPersonaje.filter(
      (value) => value.peliculaAsociada === movies
    );
    const mapeoPersonaje = filterPersonajes.map((value) => {
      const personaj = {
        nombre: value.nombre,
        imagen: value.imagen,
        detalles: [
          {
            edad: value.edad,
            peso: value.peso,
            historia: value.historia,
            peliculasSeries: value.peliculaAsociada,
          },
        ],
      };
      return personaj;
    });
    return res.send(mapeoPersonaje);
  } else {
    const personajes = await Personaje.findAll({
      attributes: ["nombre", "imagen"],
    });
    res.json({
      personajes,
    });
  }
});

// agregar personajes
router.post("/", async (req, res) => {
  const personaje = await Personaje.create(req.body);
  res.json(personaje);
});

// modificar personaje
router.put("/:personajeId", async (req, res) => {
  const idd = req.params.personajeId;
  await Personaje.update(req.body, {
    where: { id: idd },
  });

  res.json({ success: "se a modificado", idd });
});

// borrar personaje
router.delete("/:personajeId", async (req, res) => {
  await Personaje.destroy({
    where: { id: req.params.personajeId },
  });

  res.json({ success: "se ha borrado la personaje" });
});

module.exports = router;
