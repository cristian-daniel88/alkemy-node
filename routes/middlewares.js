const jwt = require('jwt-simple');
const moment = require('moment')

const checkToken = (req, res, next) => {
  
    if (!req.headers["user-token"]) {
    return res.json({ error: "Necesitas incluir el user-token en el header" });
}

const userToken = req.headers["user-token"];
let payload = {};

try {
    payload = jwt.decode(userToken, process.env.SECRETOR_TOKEN);
} catch (error) {
    return res.json({error: 'el token es incorrecto'});
}

if (payload.expiredAt < moment().unix()) {
    return res.json({error: 'el token expiro'});
}

req.usuarioId = payload.usuarioId

next();
};


module.exports = {
    checkToken: checkToken
}
