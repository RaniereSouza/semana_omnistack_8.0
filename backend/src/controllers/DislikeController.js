const Dev = require('../models/Dev');

module.exports = {
    async store (req, res) {

        console.log('req.headers["logged-id"]: ', req.headers["logged-id"]);
        console.log('req.params.devId: ', req.params.devId);

        const { "logged-id": loggedId } = req.headers,
              { devId }                 = req.params,
              loggedDev                 = await Dev.findById(loggedId),
              targetDev                 = await Dev.findById(devId);

        if (!targetDev) return res.status(400).json({error: 'dev not exists'});

        loggedDev.dislikes.push(targetDev._id);
        await loggedDev.save();

        return res.json({ok: true, logged_dev: loggedDev});
    }
}