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

        if (targetDev.likes.includes(loggedDev._id)) {

            console.log('MATCH!');

            const loggedConn = await req.Connection.findOne({userId: loggedDev}),
                  targetConn = await req.Connection.findOne({userId: targetDev});

            console.log('loggedConn: ', loggedConn);
            console.log('targetConn: ', targetConn);

            if (loggedConn && loggedConn.socketId) req.io.to(loggedConn.socketId).emit('match', targetDev);
            if (targetConn && targetConn.socketId) req.io.to(targetConn.socketId).emit('match', loggedDev);
        }

        loggedDev.likes.push(targetDev._id);
        await loggedDev.save();

        return res.json({ok: true, logged_dev: loggedDev});
    }
}