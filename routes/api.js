const router = require('express').Router();

const middlewares = require('./middlewares');


const apiFilmsRouter = require('./api/films');
const apiPersonajesRouter = require('./api/personajes');
const apiGenerosRouter = require('./api/generos');
const apiAuthsRouter = require('./api/pers');



// rutas
router.use('/movies',[middlewares.checkToken],apiFilmsRouter);
router.use('/characters',[middlewares.checkToken], apiPersonajesRouter);
router.use('/generos',[middlewares.checkToken], apiGenerosRouter);
router.use('/auths',apiAuthsRouter);





module.exports = router;