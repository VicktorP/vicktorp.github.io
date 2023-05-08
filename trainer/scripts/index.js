import wordsList from '../assets/db/dictionary.js'

const appChoise = document.querySelector('#app-choice')
const buttonsWrapper = document.querySelector('#buttons-wrapper')
const home = document.querySelector('#button-home')
const prev = document.querySelector('#previous')
const next = document.querySelector('#next')
const learnForeign = document.querySelector('#learn-foreign')
const learnTranslating = document.querySelector('#learn-translating')
const practiceForeign = document.querySelector('#practice-foreign')
const practiceTranslating = document.querySelector('#practice-translating')
const numbersPrintedWords = []

const randNumber = () => Math.floor(Math.random() * wordsList.length)

const showItem = (item) => {
    document.querySelector(`${item}`).classList.remove('js-hide')
}

const hideItem = (item) => {
    document.querySelector(`${item}`).classList.add('js-hide')
}

const checkPrevButton = () => {
    if (numbersPrintedWords.length > 1) {
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
    block.innerHTML = wordsList[number][method].toLowerCase()
}

const fillLearnBlocks = (wordNumber) => {
    let number = 0
    if (wordNumber) {
        number = wordNumber
    } else {
        number = randNumber()
    }
    fillBlock(learnForeign, number, 'word')
    fillBlock(learnTranslating, number, 'translation')
    numbersPrintedWords.push(number)
}

const studying = () => {
    numbersPrintedWords.length = 0
    showItem('#app-learning')
    fillLearnBlocks()
    next.disabled = false
    next.addEventListener('click', () => {
        fillLearnBlocks()
        checkPrevButton()
    })
    prev.addEventListener('click', () => {
        if (numbersPrintedWords.length > 1) {
            numbersPrintedWords.length = numbersPrintedWords.length-1
            fillLearnBlocks(numbersPrintedWords[numbersPrintedWords.length-1])
            numbersPrintedWords.length = numbersPrintedWords.length-1
            checkPrevButton()
        }
    })
}

const practicing = () => {
    numbersPrintedWords.length = 0
    checkNextButton()
    showItem('#app-practicing')
    let number = randNumber()
    practiceTranslating.innerHTML = wordsList[number].translation
    practiceForeign.value = ''
    practiceForeign.addEventListener('input',() => {
        checkNextButton()
    })
    next.addEventListener('click', () => {
        if (practiceForeign.value.trim() === wordsList[number].word) {
            numbersPrintedWords.push(number)
            number = randNumber()
            practiceTranslating.innerHTML = wordsList[number].translation
            practiceForeign.value = ''
            checkPrevButton()
        }
        
    })
}

const start = (mode) => {
    hideItem('#app-choice')
    showItem('#app-work')
    if (mode === 'learn') {
        studying()        
    } else if (mode === 'practice') {
        practicing()
    }
    home.classList.remove('opacity-hide')
    buttonsWrapper.classList.remove('opacity-hide')
    checkPrevButton()
}

appChoise.addEventListener('click', (event) => {
    const mode = event.target.dataset.id
    start(mode)
})

home.addEventListener('click', () => {
    showItem('#app-choice')
    hideItem('#app-work')
    hideItem('#app-learning')
    hideItem('#app-practicing')
    home.classList.add('opacity-hide')
    buttonsWrapper.classList.add('opacity-hide')
})
