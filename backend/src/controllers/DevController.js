const axios = require('../../node_modules/axios'),
      Dev   = require('../models/Dev');

module.exports = {

    async index (req, res) {

        const { "logged-id": loggedId }   = req.headers,
              loggedUser                  = loggedId ?
                                            await Dev.findById(loggedId) :
                                            false,
              visibleUsers                = loggedUser ?
                                            await Dev.find({
                                                $and: [
                                                    {_id: {$ne:  loggedUser._id}},
                                                    {_id: {$nin: loggedUser.likes}},
                                                    {_id: {$nin: loggedUser.dislikes}}
                                                ]
                                            }) :
                                            false;
        
        return res.json({ok: true, visible_users: visibleUsers});
    },

    async search (req, res) {

        const { devId }   = req.params,
              dev         = devId ? 
                            await Dev.findById(devId) :
                            false;

        return res.json({ok: true, dev});
    },

    async store (req, res) {

        const { githubUsername } = req.body;
        console.log('githubUsername: ', githubUsername);
        if (!githubUsername) {
            return res.json({
                ok:           "no username",
                request_body: req.body
            });
        }

        const userExists = await Dev.findOne({githubUsername: githubUsername});
        console.log('userExists: ', userExists);
        if (userExists) {
            return res.json({
                ok:           "already exists",
                request_body: req.body,
                dev:          userExists
            });
        }

        let response, dev;
        try {

            response = await axios.get(`https://api.github.com/users/${githubUsername}`);
            console.log('response.data: ', response.data);

            const { name, bio, avatar_url: avatar } = response.data;
            dev = await Dev.create({
                name,
                githubUsername,
                bio,
                avatar
            });
            console.log('dev: ', dev);
        }
        catch (err) { 
            console.log('err: ', err);
            return res.status(400);
        }

        return res.json({
            ok:            true,
            request_body:  req.body,
            response_data: response.data,
            dev:           dev
        });
    }
}