module.exports = (sequelize, type) => {
    return sequelize.define('film', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        imagen: type.STRING,
        titulo: type.STRING,
        fechaDeCreacion:type.STRING,
        calificacion: type.INTEGER,
        personajeAsociado: type.STRING,
        genero: type.STRING
    })
}