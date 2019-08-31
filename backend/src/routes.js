const express           = require('../node_modules/express'),
      DevController     = require('./controllers/DevController'),
      LikeController    = require('./controllers/LikeController'),
      DislikeController = require('./controllers/DislikeController'),
      routes            = express.Router();

routes.get('/', (req, res) => {
    return res.json({ message: `Olá, ${req.query.name ? req.query.name : "Mundo"}` });
});

routes.get('/devs',       DevController.index);
routes.get('/dev/:devId', DevController.search);
routes.post('/devs',      DevController.store);

routes.post('/devs/:devId/likes',    LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes;