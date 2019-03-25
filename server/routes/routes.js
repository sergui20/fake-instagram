const path = require('path');
const util = require('util');

// Models
const User = require('../models/users');
const Post = require('../models/posts');

// Token
const generateToken = require('../config/generate-token');

// Middlewares
const authenticate = require('../middlewares/verify-token');
const userActive = require('../middlewares/user-active');

// Entries
const main = path.resolve(__dirname, '../../main.html');
const homepage = path.resolve(__dirname, '../../feed.html');

module.exports = function (app) {
    app.get('/', userActive, (req, res) => {
        res.sendFile(main);
    });
    
    // Signup
    app.get('/signup', userActive, (req, res) => {
        res.sendFile(main)
    });

    app.post('/signup', (req, res) => {
        // console.log(req)
        const {email, name, username, password} = req.body;

        User.findOne({email: email}, (err, userDB) => {
            if (err) {
                return res.json({
                    ok: false,
                    err,
                    message: 'Something went wrong. Try again later'
                })
            }

            if (userDB) {
                return res.json({
                    ok: false,
                    message: 'Email already taken'
                })

            } else {
                let newUser = new User();
                newUser.name = name;
                newUser.username = username;
                newUser.email = email;
                newUser.password = newUser.generateHash(password);

                newUser.save(function(err, userDB) {
                    if (err) {
                        res.json({
                            ok: false,
                            message: err.errors.username.message
                        })
                    } else {
                        payload = {
                            id: userDB.id,
                            name: userDB.name,
                            username: userDB.username,
                            email: userDB.email,
                            img: userDB.img
                        }

                        const token = generateToken(payload)
                        res.cookie('Authorization', `Bearer ${token}`, {path: '/homepage'})
                        res.json({
                            ok: true,
                            user: {
                                ...payload
                            }
                        })
                        // res.redirect(301, '/homepage')
                    }

                })

            }
        })
    });
    
    // Signin
    app.get('/signin', userActive, (req, res) => {
        res.sendFile(main)
    });

    app.post('/signin', (req, res) => {
        const { email, password } = req.body;

        User.findOne({email: email}, (err, userDB) => {
            if (err) {
                return res.json({
                    ok: false,
                    err,
                    message: 'Something went wrong. Try again later'
                })
            }

            if (!userDB) {
                return res.json({
                    ok: false,
                    message: 'User not found. Please signup'
                })
            }

            if (!userDB.validatePassword(password)) {
                return res.json({
                    ok: false,
                    message: 'Incorrect email or password'
                })
            }

            const payload = {
                id: userDB.id,
                name: userDB.name,
                username: userDB.username,
                email: userDB.email,
                img: userDB.img
            }

            const token = generateToken(payload);
            res.cookie('Authorization', `Bearer ${token}`, {path: '/homepage'});
            res.json({
                ok: true,
                user: {
                    ...payload
                }
            })
            // res.redirect(301, '/homepage');
        })
    })

    app.get('/homepage', authenticate, (req, res) => {
        res.sendFile(homepage)
    });

    app.get('/logout', (req, res) => {
        console.log(`Logout response: ${res}`)
        res.clearCookie('Authorization', {path: '/homepage'})
        res.redirect(301, '/')
    });

    app.get('/api/posts', (req, res) => {
        Post.find({})
            .populate('user', 'name username email img')
            .exec((err, postsDB) => {
                if (err) {
                    return res.json({
                        ok: false,
                        err,
                        message: 'Something went wrong. Please try again later'
                    })
                }
    
                if (!postsDB) {
                    return res.json({
                        ok: false,
                        message: 'No posts yet'
                    })
                }
    
                return res.json({
                    ok: true,
                    posts: postsDB
                })
            })
    })

    app.post('/api/posts', (req, res) => {
        const { path, user, location } = req.body;

        const newPost = new Post();
        newPost.path = path
        newPost.user = user
        newPost.location = location

        newPost.save(function(err, postDB) {
            if (err) {
                return res.json({
                    ok: false,
                    err,
                    message: 'Something went wrong. Try again later'
                })
            }

            return res.json({
                ok: true,
                post: postDB
            })
        })
    })

    // app.get('/profile', (req, res) => {
    //     res.json({
    //         ok: true,
    //         message: 'You are in profile !!'
    //     })
    // })
}