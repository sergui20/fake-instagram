const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    path: {
        type: String,
        unique: true,
        required: [true, 'El path es necesario']
    },
    location: {
        type: String,
        required: false
    },
    uploaded: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [{
        type: Schema.Types.ObjectId
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

postsSchema.plugin(uniqueValidator, {message: '{PATH} has to be unique'});

module.exports = mongoose.model('Post', postsSchema);