const moment  = require('moment');
const jwt = require('jwt-simple');

const createToken = (user) => {
    const payload = {
        usuarioId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(5, 'minutes').unix()
    }

    return jwt.encode(payload, process.env.SECRETOR_TOKEN)
 }

module.exports = {
    createToken
}