const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un role valido'
};

const usersSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'El username es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        default: '/assets/images/profilePic.png'
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles
    },
    status: {
        type: Boolean,
        default: true
    },
    facebook: {
        type: Boolean,
        default: false
    }
});

usersSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

usersSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

usersSchema.plugin(uniqueValidator, {message: '{PATH} has to be unique'});

module.exports = mongoose.model('User', usersSchema)