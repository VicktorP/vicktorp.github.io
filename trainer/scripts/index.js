import wordsList from '../assets/db/dictionary.js'
import { debounce, addBlock, removeBlock, hideBlock, showBlock, clearList, randNumber } from '../assets/helpers/index.js'

const container = document.querySelector('#container')
const appChoise = document.querySelector('#app-choice')
const buttonsNextPrevBlock = document.querySelector('#buttons-wrapper')
const headerButtonsBlock = document.querySelector('#header-buttons')
const homeButton = document.querySelector('#button-home')
const settingsButton = document.querySelector('#button-settings')
const prev = document.querySelector('#previous')
const next = document.querySelector('#next')
const learnForeignWord = document.querySelector('#learn-foreign-word')
const learnForeignTranscription = document.querySelector('#learn-foreign-transcription')
const learnTranslating = document.querySelector('#learn-translating')
const practiceForeign = document.querySelector('#practice-foreign')
const practiceTranslating = document.querySelector('#practice-translating')
const settingsBlockWrapper = document.querySelector('#settings-wrapper')
const startPointTextInput = document.querySelector('#start-point-text')
const startPointRangeInput = document.querySelector('#start-point-range')
const endPointTextInput = document.querySelector('#end-point-text')
const endPointRangeInput = document.querySelector('#end-point-range')
const startEndPositionsButton = document.querySelector('#settings-button')

const showedWordsNumbers = []
let activeModeName = ''
let startWord = 0
let endWord = 0
let wordsOrder = 'straight'
let wordsOrderNumbers = []
let activeWordIndex = 0


const startInit = () => {
    document.body.height = window.innerHeight
    startPointRangeInput.setAttribute('max', wordsList.length)
    endPointRangeInput.setAttribute('max', wordsList.length)
    startPointTextInput.value = 1
    endPointTextInput.value = wordsList.length
    startPointRangeInput.value = 1
    endPointRangeInput.value = wordsList.length
}

const checkPrevButton = () => {
    if (showedWordsNumbers.length > 1) {
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

const fillTag = (block, number, method) => {
    const words = wordsList[number][method].split(' ')
    if (words.some(word=>word.length>16) && method!=='transcription') {
        block.classList.add('small-size-js')
    } else {
        block.classList.remove('small-size-js')
    }
    block.innerHTML = wordsList[number][method].toLowerCase()
}

const fillBlock = (number) => {
    fillTag(learnForeignWord, number, 'word')
    fillTag(learnForeignTranscription, number, 'transcription')
    fillTag(learnTranslating, number, 'translation')
} 

const showNextStudyWord = (wordNumber) => {
    let number
    if (wordsOrder === 'random') {
        number = wordNumber ? wordNumber : randNumber(startWord, endWord)
    } else if (wordsOrder === 'straight') {
        if (endWord === 0) {
            for (let i = 0; i < wordsList.length; i++) {
                wordsOrderNumbers.push(i)
            }
        }
        if (Number.isInteger(wordNumber)) {
            number = wordNumber
            activeWordIndex -= 1
            if (activeWordIndex < 0) {
                activeWordIndex += wordsOrderNumbers.length
            }
        } else {
            number = wordsOrderNumbers[activeWordIndex++]
        }
        if (activeWordIndex === wordsOrderNumbers.length) {
            activeWordIndex = 0
        }
    }
    console.log(number)
    console.log(showedWordsNumbers)
    fillBlock(number)
    showedWordsNumbers.push(number)
}

const showNextStudyWordPaused =  debounce(() => {
    showNextStudyWord()
    checkPrevButton()
}, 200);

const studying = () => {
    activeModeName = '#app-learning'
    clearList(showedWordsNumbers)
    addBlock(activeModeName)
    showNextStudyWord()
    next.disabled = false
    next.addEventListener('click', () => {
        showNextStudyWordPaused()
    })
    prev.addEventListener('click', () => {
        if (showedWordsNumbers.length > 1) {
            showedWordsNumbers.length = showedWordsNumbers.length-1
            showNextStudyWord(showedWordsNumbers[showedWordsNumbers.length-1])
            showedWordsNumbers.length = showedWordsNumbers.length-1
            checkPrevButton()
        }
    })
}

const practicing = () => {
    activeModeName = '#app-practicing'
    showedWordsNumbers.length = 0
    practiceForeign.value = ''
    checkNextButton()
    addBlock('#app-practicing')
    let number = randNumber(startWord, endWord)
    practiceTranslating.innerHTML = wordsList[number].translation
    practiceForeign.addEventListener('input',() => {
        checkNextButton()
    })
    next.addEventListener('click', () => {
        if (practiceForeign.value.trim().toLowerCase() === wordsList[number].word.trim().toLowerCase()) {
            showedWordsNumbers.push(number)
            number = randNumber(startWord, endWord)
            practiceTranslating.innerHTML = wordsList[number].translation
            practiceForeign.value = ''
            checkPrevButton()
        }
        
    })
}

const start = (mode) => {
    startInit()
    removeBlock('#app-choice')
    if (mode === 'learn') {
        studying()        
    } else if (mode === 'practice') {
        practicing()
    }
    showBlock(headerButtonsBlock)
    showBlock(buttonsNextPrevBlock)
    checkPrevButton()
}

appChoise.addEventListener('click', (event) => {
    start(event.target.dataset.id)
})

homeButton.addEventListener('click', () => {
    removeBlock(activeModeName)
    addBlock('#app-choice')
    hideBlock(headerButtonsBlock)
    hideBlock(buttonsNextPrevBlock)
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

startPointRangeInput.addEventListener('input', () => {
    if(Number(startPointRangeInput.value) < Number(endPointRangeInput.value)) {
        setTimeout(() => {
            startPointTextInput.value = startPointRangeInput.value
        }, 50)
    } else {
        startPointRangeInput.value = Number(endPointRangeInput.value) - 1
    }
})

startPointTextInput.addEventListener('input', () => {
    if(Number(startPointTextInput.value) < Number(endPointTextInput.value)) {
        startPointRangeInput.value = startPointTextInput.value
    } else {
        startPointTextInput.value = startPointTextInput.value.slice(0,-1)
    }
})

endPointRangeInput.addEventListener('input', () => {
    if(Number(endPointRangeInput.value) > Number(startPointRangeInput.value)) {
        setTimeout(() => {
            endPointTextInput.value = endPointRangeInput.value
        }, 50)        
    } else {
        endPointRangeInput.value = Number(startPointRangeInput.value) + 1
    }
})

endPointTextInput.addEventListener('input', () => {
    if(Number(endPointTextInput.value) > Number(startPointTextInput.value)) {
        endPointRangeInput.value = endPointTextInput.value
    } else {
        endPointTextInput.value.length = endPointTextInput.value.slice(0,-1)
    }
})

settingsButton.addEventListener('click', () => {
    settingsBlockWrapper.classList.toggle('js-hide')
})

startEndPositionsButton.addEventListener('click', (event) => {
    event.preventDefault()
    wordsOrder = document.querySelector('input[name="words-order"]:checked').value
    settingsBlockWrapper.classList.toggle('js-hide')
    startWord = Number(startPointTextInput.value)
    endWord = Number(endPointTextInput.value)
    wordsOrderNumbers = []
    for (let i = startWord-1; i <= endWord-1; i++) {
        wordsOrderNumbers.push(i)
    }
})