const { Word } = require('../models/Word.js');

const createWord = async (req, res, next) => {
    if (!req.body.word || !req.body.translation) {
        return res.status(500).send({'message': 'You must fill all the necessary fields'})
    }

    const { word, translation, transcription } = req.body
    const { userId } = req.body.user

    const statistics = {
        addedDate: new Date(),
        learnShowed: 0,
        practiceShowed: 0,
        success: 0,
        failed: 0,
        rate: 1
    }

    const newWord = new Word({
        userId,
        word,
        translation,
        transcription,
        statistics
    })

    newWord.save().then(saved => res.json(saved)).catch(err => next(err))
}

const getWords = async (req, res, next) => {
    return Word.find({userId: req.body.user.userId}).then(result => res.json(result))
}

const updateWord = async (req, res, next) => {
    const changingWord = await Word.findById(req.params.id)
    const { word, translation, transcription } = req.body

    if (word) changingWord.word = word
    if (translation) changingWord.translation = translation
    if (transcription) changingWord.transcription = transcription

    return changingWord.save().then( saved => res.json(saved))
}

const deleteWord = async (req, res, next) => {
    const deletingWord = await Word.findOne({ _id: req.params.id })

    if (deletingWord) {
        return  Word.findOneAndDelete({ _id: req.params.id })
                    .then( word => res.json(`Word "${word.word}" was deleted successfully`))
    } else {
        return res.json({'message': 'This word doesn\'t exist in the database'})
    }
}

module.exports = {
  createWord,
  getWords,
  updateWord,
  deleteWord,
}