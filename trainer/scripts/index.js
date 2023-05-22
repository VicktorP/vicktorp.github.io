import wordsList from '../assets/db/dictionary.js'
import { debounce, addTag, removeTag, hideTag, showTag } from '../assets/helpers/index.js'

const container = document.querySelector('#container')
const appChoise = document.querySelector('#app-choice')
const buttonsWrapper = document.querySelector('#buttons-wrapper')
const homeButton = document.querySelector('#button-home')
const tipButton = document.querySelector('#button-tip')
const prev = document.querySelector('#previous')
const next = document.querySelector('#next')
const learnForeignWord = document.querySelector('#learn-foreign-word')
const learnForeignTranscription = document.querySelector('#learn-foreign-transcription')
const learnTranslating = document.querySelector('#learn-translating')
const practiceForeign = document.querySelector('#practice-foreign')
const practiceTranslating = document.querySelector('#practice-translating')
const wordNumbers = []
let activeModeId = ''

document.body.height = window.innerHeight

const randNumber = () => Math.floor(Math.random() * wordsList.length)

const checkPrevButton = () => {
    if (wordNumbers.length > 1) {
        prev.disabled = false
    } else {
        prev.disabled = true
    }
}

const checkNextButton = () => {
    if (practiceForeign.value.length > 0) {
        next.disabled = false
    } else {
        next.disabled = true
    }
}

const fillBlock = (block, number, method) => {
    const words = wordsList[number][method].split(' ')
    if (words.some(word=>word.length>16) && method!=='transcription') {
        block.classList.add('small-size-js')
    } else {
        block.classList.remove('small-size-js')
    }
    block.innerHTML = wordsList[number][method].toLowerCase()
}

const showNextStudyWord = (wordNumber) => {
    const number = wordNumber ? wordNumber : randNumber()
    fillBlock(learnForeignWord, number, 'word')
    fillBlock(learnForeignTranscription, number, 'transcription')
    fillBlock(learnTranslating, number, 'translation')
    wordNumbers.push(number)
}

const showNextStudyWordPaused =  debounce(() => {
    showNextStudyWord()
    checkPrevButton()
}, 200);

const studying = () => {
    activeModeId = '#app-learning'
    wordNumbers.length = 0
    addTag('#app-learning')
    showNextStudyWord()
    next.disabled = false
    next.addEventListener('click', () => {
        showNextStudyWordPaused()
    })
    prev.addEventListener('click', () => {
        if (wordNumbers.length > 1) {
            wordNumbers.length = wordNumbers.length-1
            showNextStudyWord(wordNumbers[wordNumbers.length-1])
            wordNumbers.length = wordNumbers.length-1
            checkPrevButton()
        }
    })
}

const practicing = () => {
    activeModeId = '#app-practicing'
    tipButton.classList.remove('opacity-hide')
    wordNumbers.length = 0
    practiceForeign.value = ''
    checkNextButton()
    addTag('#app-practicing')
    let number = randNumber()
    practiceTranslating.innerHTML = wordsList[number].translation
    practiceForeign.addEventListener('input',() => {
        checkNextButton()
    })
    next.addEventListener('click', () => {
        if (practiceForeign.value.trim().toLowerCase() === wordsList[number].word.trim().toLowerCase()) {
            wordNumbers.push(number)
            number = randNumber()
            practiceTranslating.innerHTML = wordsList[number].translation
            practiceForeign.value = ''
            checkPrevButton()
        }
        
    })
}

const start = (mode) => {
    removeTag('#app-choice')
    if (mode === 'learn') {
        studying()        
    } else if (mode === 'practice') {
        practicing()
    }
    showTag(homeButton)
    showTag(buttonsWrapper)
    checkPrevButton()
}

appChoise.addEventListener('click', (event) => {
    start(event.target.dataset.id)
})

homeButton.addEventListener('click', () => {
    addTag('#app-choice')
    removeTag(activeModeId)
    hideTag(homeButton)
    hideTag(buttonsWrapper)
    hideTag(tipButton)
})

practiceForeign.addEventListener('focus',() => {
    if (window.innerWidth < 920) {
        container.style.justifyContent = 'flex-start'
    } else {
        container.style.justifyContent = 'space-between'
    }
})

practiceForeign.addEventListener('blur',() => {
    container.style.justifyContent = 'space-between'
})


