const express = require('express');
const mongoose = require('mongoose');
// const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
// const passport = require('passport');
// const session = require('express-session');

const app = express();

// MongoDB
mongoose.connect('mongodb://localhost:27017/platzigram', { useNewUrlParser: true }, (err) => {
    if (err) throw err;

    console.log('Base de datos online');
})

// ENV variables
require('dotenv').config()

// Passport config
// require('./config/passport')(passport);

// Settings
app.set('port', process.env.PORT || 8080);

// Middlewares
app.use(cookieParser())
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// app.use(session({
//     secret: 'SNMC1999',
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(flash());

// Static files
app.use(express.static('public'));

// Routes
require('./routes/routes')(app)

// PORT
app.listen(app.get('port'), ()=> {
    console.log(`Server Listening on port ${app.get('port')}`);
})