const { User } = require('../models/User.js')
const { Word } = require('../models/Word.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = async (req, res, next) => {
    if (!req.body.userName || !req.body.password || !req.body.userEmail) {
        return res.status(500).send({
            message: 'You must fill all the necessary fields', 
            status: 500
        })
    }

    const { userName, userEmail, password } = req.body

    if ( !/.+@.+\..+/i.test(userEmail) ) {
        return res.status(500).send({
            message: 'Email isn\'t correct format', 
            status: 500
        })
    }    

    const user = new User({
        userName,
        userEmail,
        password: await bcrypt.hash(password,10)
    })

    await User.findOne({userName})
        .then(result => {
            if (result) {
                return res.status(500).send({
                    message: 'User already exist', 
                    status: 500
                })
            } else {
                user.save()
                    .then(saved => res.status(200).json({
                        message: `User ${userName} has been created successfully`, 
                        status: 200
                    }))
                    .catch(err => next(err))
            }
        }
    )
}

const loginUser = async (req, res, next) => {
    if (!req.body.userName || !req.body.password) {
        return res.status(500).send({
            message: 'You must fill all the necessary fields', 
            status: 500
        })
    }

    const { userName, password } = req.body
    console.log(process.env.EMAIL_HOST)

    const user = await User.findOne({ userName })

    if (!user) {
        return res.status(403).json({
            message: `User ${userName} doesn\'t exist`,
            status: 403
        })
    }

    if ( !await bcrypt.compare(String(password), String(user.password)) ) {
        return res.status(403).json({
            message: `Password doesn\'t match to ${userName}`,
            status: 403
        })
    }

    if ( user && await bcrypt.compare(String(password), String(user.password)) ) {
        const payload = { userName: user.userName, userId: user._id }
        const jwtToken = jwt.sign(payload, 'secret-jwt-key')
        return res.json({
            token: jwtToken,
            message: `User ${userName} logged successfully`,
            status: 200
        })
    }
    
    return res.status(403).json({
        message: 'Not autharised',
        status: 403
    })
}

const checkUser = async (req, res, next) => {
    if (!req.body.userName || !req.body.userEmail) {
        return res.status(500).send({
            message: 'You must fill all the necessary fields', 
            status: 500
        })
    }

    const { userName, userEmail } = req.body

    const user = await User.findOne({ userName })

    if (!user) {
        return res.status(403).json({
            message: `User ${userName} doesn\'t exist`,
            status: 403
        })
    }

    if ( user.userEmail !== userEmail ) {
        return res.status(403).json({
            message: `Email doesn\'t match to ${userName}\'s Email`,
            status: 403
        })
    }

    if ( user && user.userEmail === userEmail ) {
        return res.status(200).json({
            message: `You can change your password`,
            status: 200
        })
    }
    
    return res.status(400).json({
        message: 'Smth is wrong',
        status: 400
    })
}



const signUserPassword = async (req, res, next) => {
    if (!req.body.userName || !req.body.userPassword) {
        console.log('userName - ', req.body.userName)
        console.log('userPassword - ', req.body.userPassword)
        return res.status(500).send({
            message: 'You must fill all the necessary fields', 
            status: 500
        })
    }

    const { userName, userPassword } = req.body

    const user = await User.findOne({ userName })

    if (user) {
        user.password = await bcrypt.hash(userPassword,10)

        return user.save()
            .then( saved => res.status(200).send({
                message: 'Password has been changed',
                status: 200
            }))
            .catch(err => next(err))
    }

    return res.status(400).json({
        message: 'Smth is wrong',
        status: 400
    })
}




const changePassword = async (req, res, next) => {
    if (!req.body.oldPassword || !req.body.newPassword) {
        return res.status(500).send({
            message: 'You must fill all the necessary fields',
            status: 500
        })
    }

    const user = await User.findOne({ _id: req.body.user.userId })

    if (!user) {
        return res.status(400).send({
            message: 'Current user doresn\'t exist', 
            status: 400
        })
    }

    const { oldPassword, newPassword } = req.body

    if (user && await bcrypt.compare(String(oldPassword), String(user.password))) {
        if (oldPassword === newPassword) {
            return res.status(400).send({
                message: 'New password can\'t be the same with old password',
                status: 400
            })
        }
        user.password = await bcrypt.hash(newPassword,10)
    } else {
        return res.status(400).send({
            message: 'Old password isn\'t correct', 
            status: 400
        })
    }

    return user.save()
                .then( saved => res.json({
                    message: 'Password has been changed',
                    status: 200
                }))
                .catch(err => next(err))
}

const deleteUser = async (req, res, next) => {
    const user = await User.findOne({ _id: req.body.user.userId })

    if (!req.body.password) {
        return res.status(400).send({
            message: 'You must fill the password',
            status: 400
        })
    }

    const isPasswordCorrect = await bcrypt.compare(String(req.body.password), String(user.password))

    if (!isPasswordCorrect) {return res.status(400).json({
        message: 'Your password isn\'t correct',
        status: 400
    })}

    if ( user && isPasswordCorrect ) {
        return Word.deleteMany({userId: req.body.user.userId})
        .then(
            User.findOneAndDelete({ _id: req.body.user.userId })
                .then( deletedUser => res.json({
                    message: `User ${deletedUser.userName} has been deleted successfully`,
                    status: 200
                }))
        )

    } else {
        return res.status(400).json({
            message: 'You aren\'t logged user',
            status: 400
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    checkUser,
    signUserPassword,
    changePassword,
    deleteUser
}

//add .env to work
// add locale storage to protect against unlogged during page reload