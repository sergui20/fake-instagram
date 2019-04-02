require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

// MongoDB
mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err) => {
    if (err) throw err;

    console.log('Base de datos online');
})

// Settings
app.set('port', process.env.PORT || 8080);

// Local
app.locals.isAuthenticated = false;

// Middlewares
app.use(cookieParser())
app.use(express.urlencoded({extended: false, limit: '50mb'}));
app.use(express.json({limit: '50mb'}));

// Static files
app.use(express.static('public', {
    etag: false
}));

// Routes
require('./routes/routes')(app)

// PORT
app.listen(app.get('port'), ()=> {
    console.log(`Server Listening on port ${app.get('port')}`);
})