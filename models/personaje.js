module.exports = (sequelize, type) => {
    return sequelize.define('personaje', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        imagen: type.STRING,
        nombre: type.STRING,
        edad: type.INTEGER,
        peso: type.INTEGER,
        historia: type.STRING,
        peliculaAsociada: type.STRING,
    })
}

