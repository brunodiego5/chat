const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const MessageSchema = new mongoose.Schema({
    text: String,
    location: {
        type: PointSchema,
        index: '2dsphere'
    },
    user: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Message', MessageSchema);