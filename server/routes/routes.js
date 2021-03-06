const path = require('path');
const util = require('util');

// Multipart/form-data
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../public/uploads/posts'))
    },
    filename: function (req, file, cb) {
        cb(null, `${req.query._id}-${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|JPG|JPEG|GIF|PNG/;
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname));
        
        if (mimeType && extName) {
            return cb(null, true)
        }
        
        cb("Error: Invalid file extension")
    }
})

// Models
const User = require('../models/users');
const Post = require('../models/posts');

// Token
const generateToken = require('../config/generate-token');

// Middlewares
const verifyToken = require('../middlewares/verify-token');
const userActive = require('../middlewares/user-active');

// Entries
const main = path.resolve(__dirname, '../../main.html');
const homepage = path.resolve(__dirname, '../../feed.html');

module.exports = function (app) {
    app.get('/', userActive, (req, res) => {
        // console.log(`Signin request: ${util.inspect(req)}`)
        // res.set("Cache-Control", "no-cache, no-store, must-revalidate");
        // res.set("Pragma", "no-cache");
        // res.set("Expires", -1);
        res.sendFile(main);
    });
    
    // Signup
    app.get('/signup', userActive, (req, res) => {
        // res.set("Cache-Control", "no-cache, no-store, must-revalidate");
        // res.set("Pragma", "no-cache");
        // res.set("Expires", -1);
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
                        res.cookie('Authorization', `Bearer ${token}`, {path: '/homepage'});
                        res.status(200).json({
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
        // res.set("Cache-Control", "no-cache, no-store, must-revalidate");
        // res.set("Pragma", "no-cache");
        // res.set("Expires", -1);
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

    app.get('/homepage', verifyToken, (req, res) => {
        req.app.locals.isAuthenticated = true

        // res.set("Cache-Control", "no-cache, no-store, must-revalidate");
        // res.set("Pragma", "no-cache");
        // res.set("Expires", -1);
        res.sendFile(homepage)
    });

    app.get('/logout', (req, res) => {
        req.app.locals.isAuthenticated = false

        // res.clearCookie('Authorization', {path: '/'})
        res.set("Cache-Control", "no-cache, no-store, must-revalidate");
        res.set("Pragma", "no-cache");
        res.set("Expires", -1);
        
        res.redirect(301, '/')
    });

    app.get('/api/posts', (req, res) => {
        Post.find({})
            .populate('user', 'name username email img')
            .sort({uploaded: 'descending'})
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

    app.post('/api/posts', upload.any(), (req, res) => {
        console.log(util.inspect(req.files[0].filename));
        const ID = req.query._id

        let newPost;
        
        if (req.query.location) {
            const location = req.query.location

            newPost = new Post();
            newPost.path = `/uploads/posts/${req.files[0].filename}`
            newPost.user = ID
            newPost.location = location

        } else {
            newPost = new Post();
            newPost.path = `/uploads/posts/${req.files[0].filename}`
            newPost.user = ID
        }

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
                message: "Posted !"
            })
        })
    });

    app.put('/api/posts/:postID/:likes/:userID/:liked', async (req, res) => {
        const postID = req.params.postID
        const likes = req.params.likes
        const userID = req.params.userID
        const liked = req.params.liked

        console.log(liked)

        if (liked == "true") {
            const post = await Post.findOne({_id: postID})

            post.likes = likes
            post.likedBy.push(userID)
            
            await post.save()
        } else {
            const post = await Post.findOne({_id: postID})

            post.likes = likes
            post.likedBy.remove(userID)

            await post.save()
        }
    })

    app.delete('/api/posts/:id', (req, res) => {
        const postID = req.params.id;
        const userID = req.body.userID;
        
        Post.find({_id: postID}, (err, postDB) => {
            if (err) {
                return res.json({
                    ok: false,
                    err,
                    message: "Something went wrong. Please try again later"
                })
            }

            if (!postDB) {
                return res.json({
                    ok: false,
                    message: "Post not found"
                })
            }

            if (userID != postDB[0].user) {
                return res.json({
                    ok: false,
                    message: "Unauthorize to delete the post"
                })
            }

            Post.deleteOne({_id: postID}, (err) => {
                if (err) {
                    return res.json({
                        ok: false,
                        err,
                        message: "The post could not be deleted"
                    })
                }

                return res.json({
                    ok: true,
                    message: "Post deleted"
                })
            })
        })
    });
}