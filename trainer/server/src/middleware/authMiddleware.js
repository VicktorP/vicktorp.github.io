const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({ 'message': 'Please provide authorization header' })
    }

    // const [, token] = authorization.split(' ')
    const token = authorization

    if(!token) {
        return res.status(401).json({ 'message': 'Please include token to request' })
    }

    try {
        const tokenPayload = jwt.verify(token, 'secret-jwt-key')
        req.body.user = {
            userId: tokenPayload.userId,
            userName: tokenPayload.userName
        }
        next()
    } catch (err) {
        return res.status(401).json({message: err.message})
    }
}

module.exports = {
    authMiddleware
}