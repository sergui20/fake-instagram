import jwt from'jsonwebtoken';

function verifyToken (token) {
    console.log(req)
    if (jwt.verify(req.headers.authorization, 'SNMC-my-f1rst-50cialNET')) {
        next()
    } else {
        res.json({
            ok: false, 
            message: 'False token'
        })
    }
}

export default verifyToken;