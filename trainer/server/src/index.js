require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

const dbPassword = process.env.DB_PASSWORD
const serverPort = process.env.SERVER_PORT

mongoose.set('strictQuery', true)
mongoose.connect(`mongodb+srv://translate:${dbPassword}@translatewords.lfwu2ke.mongodb.net/translate`)

const { wordsRouter } = require('./routers/wordsRouter.js')
const { usersRouter } = require('./routers/usersRouter.js')
const { authMiddleware } = require('./middleware/authMiddleware.js')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors({origin: '*'}))

app.use('/api/words', authMiddleware, wordsRouter)
app.use('/api/users', usersRouter)

const start = async () => {
    try {
        app.listen(serverPort, ()=>{
            console.log(`server was started on port ${serverPort}`)
        })
    } catch (err) {
        console.error(`Error on server startup: ${err.message}`)
    }
}

start()

app.use(errorHandler)

function errorHandler(err, req, res, next) {
    console.error('err', err)
    res.status(500).send({'message': 'Server error'})
}

