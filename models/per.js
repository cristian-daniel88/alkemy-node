module.exports = (sequelize, type) => {
    return sequelize.define('per', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        correoElectronico: type.STRING,
        contrasenia: type.STRING
    })
}

