const { Schema, model } = require('../../node_modules/mongoose');

const   ConnectionSchema = new Schema({
            userId: {
                type: Schema.Types.ObjectId,
                ref:  'Dev',
            },
            socketId: {
                type: String,
            },
        }, {timestamps: true});

module.exports = model('Connection', ConnectionSchema);