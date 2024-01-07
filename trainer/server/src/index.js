require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://translate:GEzXmqYCNaeXV8K2@translatewords.lfwu2ke.mongodb.net/translate')

const { wordsRouter } = require('./routers/wordsRouter.js')
const { usersRouter } = require('./routers/usersRouter.js')
const { authMiddleware } = require('./middleware/authMiddleware.js')

let PORT = process.env.SERVER_PORT;

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors({origin: '*'}))

app.use('/api/words', authMiddleware, wordsRouter)
app.use('/api/users', usersRouter)

const start = async () => {
    try {
        app.listen(PORT, ()=>{
            console.log(`server was started on port ${PORT}`)
        })
    } catch (err) {
        console.error(`Error on server startup: ${err.message}`)
    }
}

console.log(process.env.EMAIL_HOST)

start()

app.use(errorHandler)

function errorHandler(err, req, res, next) {
    console.error('err')
    res.status(500).send({'message': 'Server error'})
}

