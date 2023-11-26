const express = require('express')
const router = express.Router()
const { createWord, getWords, deleteWord, updateWord } = require('../services/wordsService.js')

router.post('/', createWord)

router.get('/', getWords)

router.patch('/:id', updateWord)

router.delete('/:id', deleteWord)

module.exports = {
   wordsRouter: router,
}