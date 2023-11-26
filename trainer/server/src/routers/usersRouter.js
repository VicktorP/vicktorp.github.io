const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/authMiddleware.js')
const { createUser, loginUser, checkUser, signUserPassword, changePassword, deleteUser } = require('../services/usersService.js')

router.post('/register', createUser)

router.post('/login', loginUser)

router.post('/checkuser', checkUser)

router.patch('/signpassword', signUserPassword)

router.patch('/changepassword', authMiddleware, changePassword)

router.delete('/delete', authMiddleware, deleteUser)

module.exports = {
    usersRouter: router,
}