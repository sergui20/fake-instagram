const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/users');

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'SNMC-my-f1rst-50cialNET';

module.exports = function (passport) {
    // For Login
    passport.use('local-login', new JwtStrategy(jwtOptions, function(jwt_payload, done) {
        User.findOne({email: jwt_payload.email}, (err, userDB) => {
            if (err) return done(err);

            if (!userDB) {
                return done(null, false, { failureMessage: 'No user found' })
            }

            if (!userDB.validatePassword(jwt_payload.password)) {
                return done(null, false, { failureMessage: 'Incorrect email or password' })
            }

            return done(null, userDB, {successMessage: 'Authenticated user'})
        });
    }));

    // For Signup
    passport.use('local-signup', new JwtStrategy(jwtOptions, function(jwt_payload, done) {
        // console.log(`Passport Signup: ${JSON.stringify(jwt_payload)}`)
        User.findOne({email: jwt_payload.email}, (err, userDB) => {
            if (err) return done (err);

            if (userDB) {
                return done(null, false, { failureMessage: 'Email already taken' });

            } else {
                let newUser = new User();
                newUser.name = jwt_payload.name;
                newUser.username = jwt_payload.username;
                newUser.email = jwt_payload.email;
                newUser.password = newUser.generateHash(jwt_payload.password);

                newUser.save(function(err) {
                    if (err) throw err;
                })

                return done(null, newUser, { successMessage: 'Welcome :)' });
            }
        });
    }));

    // For Homepage
    passport.use('homepage-auth', new JwtStrategy(jwtOptions, function(jwt_payload, done) {
        console.log(jwt_payload)
        User.findOne({email: jwt_payload.email}, (err, userDB) => {
            if (err) return done(err);

            if (userDB) {
                return done(null, userDB, { successMessage: 'Welcome :)' })

            } else {
                return done(null, false, { failureMessage: 'Unauthorize' })
            }
        })
    }))
} 