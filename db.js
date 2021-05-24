const Sequelize = require('sequelize');

const FilmModel = require('./models/film');
const PersonajeModel = require('./models/personaje');
const GeneroModel = require('./models/genero');
const PersonaModel = require('./models/per');

const sequelize = new Sequelize(process.env.MYSQL_USER1 , process.env.MYSQL_USER1, process.env.MYSQL_KEY, {
    host: process.env.MYSQL_HOST,
    dialect:process.env.MYSQL_DIALECT
});


const Film = FilmModel(sequelize, Sequelize);
const Personaje = PersonajeModel(sequelize, Sequelize);
const Genero = GeneroModel(sequelize, Sequelize);
const Persona = PersonaModel(sequelize, Sequelize);

sequelize.sync({force: false})
    .then(()=> {
        console.log('tabla sincronizada')
    })

module.exports = {
    Film,
    Personaje,
    Genero,
    Persona
}



