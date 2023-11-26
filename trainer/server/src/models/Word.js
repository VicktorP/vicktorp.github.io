const mongoose = require('mongoose')

const wordSchema = mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    word: {
        type: String,
        required: true,
    },
    translation: {
        type: String,
        required: true,
    },
    transcription: {
        type: String
    },
    statistics: {
        addDate: {
            type: Date,
            default: Date.now()
        },
        learnShowed: {
            type: Number,
            default: 0
        },
        practiceShowed: {
            type: Number,
            default: 0
        },
        success: {
            type: Number,
            default: 0
        },
        failed: {
            type: Number,
            default: 0
        },
        rate: {
            type: Number,
            default: 1
        }   
    }
})

const Word = mongoose.model('word', wordSchema)

module.exports = {
    Word
}