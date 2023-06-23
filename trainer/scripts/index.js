import wordsList from '../assets/db/dictionary.js'
import { debounce, addTag, removeTag, hideTag, showTag } from '../assets/helpers/index.js'

const container = document.querySelector('#container')
const appChoise = document.querySelector('#app-choice')
const buttonsWrapper = document.querySelector('#buttons-wrapper')
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
const startEndPositionsWrapper = document.querySelector('#start-end-positions-wrapper')
const startPointTextInput = document.querySelector('#start-point-text')
const startPointRangeInput = document.querySelector('#start-point-range')
const endPointTextInput = document.querySelector('#end-point-text')
const endPointRangeInput = document.querySelector('#end-point-range')
const startEndPositionsButton = document.querySelector('#start-end-positions-button')

const wordNumbers = []
let activeModeId = ''

document.body.height = window.innerHeight

startPointRangeInput.setAttribute('max', wordsList.length)
endPointRangeInput.setAttribute('max', wordsList.length)
endPointTextInput.value = wordsList.length
endPointRangeInput.value = wordsList.length

const randNumber = () => Math.floor(Math.random() * wordsList.length)

// const changeMinMaxPoints = () => {
//     startPointRangeInput.setAttribute('max', Number(endPointTextInput.value) - 1)
//     endPointRangeInput.setAttribute('min', Number(startPointTextInput.value) + 1)
// }

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
    showTag(headerButtonsBlock)
    showTag(buttonsWrapper)
    changeMinMaxPoints()
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
    hideTag(settingsButton)
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
        startPointTextInput.value = startPointRangeInput.value
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
        endPointTextInput.value = endPointRangeInput.value
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
    startEndPositionsWrapper.classList.toggle('opacity-hide')
})

startEndPositionsButton.addEventListener('click', () => {
    startEndPositionsWrapper.classList.toggle('opacity-hide')
})