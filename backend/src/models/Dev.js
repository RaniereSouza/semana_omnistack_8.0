const { Schema, model } = require('../../node_modules/mongoose');

const   DevSchema = new Schema({
            name: {
                type:     String,
                required: true,
            },
            githubUsername: {
                type:     String,
                required: true,
                unique:   true
            },
            bio: String,
            avatar: {
                type:     String,
                required: true,
            },
            likes: [{
                type: Schema.Types.ObjectId,
                ref:  'Dev',
            }],
            dislikes: [{
                type: Schema.Types.ObjectId,
                ref:  'Dev',
            }],
        }, {timestamps: true});

module.exports = model('Dev', DevSchema);