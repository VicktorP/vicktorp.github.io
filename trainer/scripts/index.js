import { debounce, hideBlock, showBlock, isLogged, randNumber } from '../assets/helpers/index.js'
import wordsList from '../assets/db/dictionary.js'

const userAutorisationJoice = document.querySelector('#autorisation-joice')
const appChoise = document.querySelector('#app-choice')
const homeButton = document.querySelector('#button-home')
const settingsButton = document.querySelector('#button-settings')
const settingsBlockWrapper = document.querySelector('#settings-wrapper')
const applySettingsButton = document.querySelector('#apply-settings-button')
const newUserRegistrationButton = document.querySelector('#new-registration')
const userRegistrationForm = document.querySelector('#registration-form')
const newUserCreateButton = document.querySelector('#create-user')
const newUserNameInput = document.querySelector('#new-user-name')
const newUserEmailnput = document.querySelector('#new-user-email')
const newUserPasswordInput = document.querySelector('#new-user-password')
const userLoggingButton = document.querySelector('#login')
const userLoginForm = document.querySelector('#login-form')
const userLoginButton = document.querySelector('#login-user')
const loginNameInput = document.querySelector('#login-user-name')
const loginPasswordInput = document.querySelector('#login-user-password')
const changingPasswordButton = document.querySelector('#to-change-password')
const changePasswordForm = document.querySelector('#change-password-form')
const changePasswordButton = document.querySelector('#change-password')
const changePasswordOldInput = document.querySelector('#change-password-old')
const changePasswordNewInput = document.querySelector('#change-password-new')
const passwordRecoveringButton = document.querySelector('#to-password-recovery')
const userCheckForm = document.querySelector('#user-check-form')
const userCheckButton = document.querySelector('#user-check')
const userCheckNameInput = document.querySelector('#user-check-name')
const userCheckEmailInput = document.querySelector('#user-check-email')
const passwordRecoveryForm = document.querySelector('#password-recovery-form')
const passwordRecoveryButton = document.querySelector('#password-recovery')
const passwordRecoveryNameInput = document.querySelector('#password-recovery-name')
const passwordRecoveryPasswordInput = document.querySelector('#password-recovery-password')
const passwordRecoveryPasswordRepeatInput = document.querySelector('#password-recovery-password-repeat')
const deletingUserButton = document.querySelector('#to-delete-user')
const deleteUserForm = document.querySelector('#delete-user-form')
const deleteUserButton = document.querySelector('#delete-user')
const deletePasswordInput = document.querySelector('#delete-password')
const logoutButton = document.querySelector('#logout')
const backButtons = document.querySelectorAll('.back-button')

// const container = document.querySelector('#container')
const controlButtonsWrapper = document.querySelector('#control-buttons-wrapper')
// const headerButtonsBlock = document.querySelector('#header-buttons')
const prev = document.querySelector('#previous')
const next = document.querySelector('#next')
const learnForeignWord = document.querySelector('#learn-foreign-word')
const learnForeignTranscription = document.querySelector('#learn-foreign-transcription')
const learnTranslating = document.querySelector('#learn-translating')
// const practiceForeign = document.querySelector('#practice-foreign')
// const practiceTranslating = document.querySelector('#practice-translating')
// const startPointTextInput = document.querySelector('#start-point-text')
// const startPointRangeInput = document.querySelector('#start-point-range')
// const endPointTextInput = document.querySelector('#end-point-text')
// const endPointRangeInput = document.querySelector('#end-point-range')

const learningButton = document.querySelector('#to-learn')
const appLearningWrapper = document.querySelector('#app-learning-wrapper')

const showedWordsNumbers = []
// let activeModeName = ''
let startWord = 0
let endWord = wordsList.length
let wordsOrder = 'straight'
let wordsOrderNumbers = []
let activeWordIndex = 0
let activeWindow = userAutorisationJoice
let lastActiveWindow = userAutorisationJoice
let authorization = ''

const url = {
    createUser:         'http://localhost:8080/api/users/register',
    loginUser:          'http://localhost:8080/api/users/login',
    checkUser:          'http://localhost:8080/api/users/checkuser',
    signUserPassword:   'http://localhost:8080/api/users/signpassword',
    changePassword:     'http://localhost:8080/api/users/changepassword', 
    deleteUser:         'http://localhost:8080/api/users/delete',
    createWord:         'http://localhost:8080/api/words',
    getWords:           'http://localhost:8080/api/words',
    updateWord:         'http://localhost:8080/api/words/:id',
    deleteWord:         'http://localhost:8080/api/words/:id'
}

const method = {
    post: "POST",
    get: "GET",
    patch: "PATCH",
    delete: "DELETE"
}

document.oncontextmenu = function () { return false }

const startInit = () => {
    document.body.height = window.innerHeight
    // if (isLogged()) {
    //     authorization = localStorage.getItem("userToken")
    //     hideBlock(userAutorisationJoice)
    //     showBlock(appChoise)
    //     changeActiveWindow(appChoise)
    // }

    hideBlock(userAutorisationJoice)
    showBlock(appChoise)
    changeActiveWindow(appChoise)

    // startPointRangeInput.setAttribute('max', wordsList.length)
    // endPointRangeInput.setAttribute('max', wordsList.length)
    // startPointTextInput.value = 1
    // endPointTextInput.value = wordsList.length
    // startPointRangeInput.value = 1
    // endPointRangeInput.value = wordsList.length
}

const changeActiveWindow = (newActiveWindow) => {
    lastActiveWindow = activeWindow
    activeWindow = newActiveWindow
}

const returnToMainScreen = () => {
    const wereActiveInputs = activeWindow.querySelectorAll('input')
    if (wereActiveInputs.length !== 0) {
        wereActiveInputs.forEach(input => input.value = '')
    }

    if ( activeWindow !== userAutorisationJoice ) {
        hideBlock(activeWindow)
        hideBlock(controlButtonsWrapper)
        if (isLogged()) {
            changeActiveWindow(appChoise)
        } else {
            changeActiveWindow(userAutorisationJoice)
        }
        showBlock(activeWindow)
    }
}

const sendRequest = async (method, URL, data, headers) => {
    const request = {
        method,
        body: JSON.stringify(data),
        headers
    }

    try {
        const response = await fetch(URL, request)
        const json = await response.json()
        return json
    } catch (error) {
        return error
    }
}

backButtons.forEach(backButton => backButton.addEventListener('click', () => returnToMainScreen()))

newUserRegistrationButton.addEventListener('click', () => {
    hideBlock(userAutorisationJoice)
    showBlock(userRegistrationForm)
    changeActiveWindow(userRegistrationForm)
})

newUserCreateButton.addEventListener('click', () => {
    const data = {
        userName: newUserNameInput.value,
        password: newUserPasswordInput.value,
        userEmail: newUserEmailnput.value
    }
    const headers = {
        'Content-Type': 'application/json'
    }

    sendRequest(method.post, url.createUser, data, headers)
        .then(res => {
            if (res.status !== 200) {
                throw new Error(res.message)
            }
            window.alert(res.message)
        })
        .then(res => {
            sendRequest(method.post, url.loginUser, data, headers)
                .then(res => {
                    authorization = res.token
                    localStorage.setItem("userName", data.userName)
                    localStorage.setItem("userToken", authorization)
                })
        })
        .then(res => {
            hideBlock(userRegistrationForm)
            showBlock(appChoise)
            newUserNameInput.value = ''
            newUserEmailnput.value = ''
            newUserPasswordInput.value = ''
            changeActiveWindow(appChoise)
        })
        .catch(err => window.alert(err))
})

userLoggingButton.addEventListener('click', () => {
    hideBlock(userAutorisationJoice)
    showBlock(userLoginForm)
    changeActiveWindow(userLoginForm)
})

userLoginButton.addEventListener('click', () => {
    const data = {
        userName: loginNameInput.value,
        password: loginPasswordInput.value
    }
    const headers = {
        'Content-Type': 'application/json'
    }

    sendRequest(method.post, url.loginUser, data, headers)
        .then(res => {
            if (res.status !== 200) {
                throw new Error(res.message)
            }
            if (res.status === 200) {
                authorization = res.token
                localStorage.setItem("userName", data.userName)
                localStorage.setItem("userToken", authorization)
                hideBlock(userLoginForm)
                showBlock(appChoise)
                loginNameInput.value = ''
                loginPasswordInput.value = ''
                changeActiveWindow(appChoise)
                window.alert(res.message)
            }
        })
        .catch(err => window.alert(err))
})

changingPasswordButton.addEventListener('click', () => {
    hideBlock(settingsBlockWrapper)
    showBlock(changePasswordForm)
    changeActiveWindow(changePasswordForm)
})

changePasswordButton.addEventListener('click', () => {
    const data = {
        oldPassword: changePasswordOldInput.value,
        newPassword: changePasswordNewInput.value
    }
    const headers = {
        'Content-Type': 'application/json',
        authorization
    }

    sendRequest(method.patch, url.changePassword, data, headers)
        .then(res => {
            window.alert(res.message)
            if (res.status === 200) {
                hideBlock(changePasswordForm)
                showBlock(settingsBlockWrapper)
                changeActiveWindow(settingsBlockWrapper)
            }
        })
})

passwordRecoveringButton.addEventListener('click', () => {
    hideBlock(userLoginForm)
    showBlock(userCheckForm)
    changeActiveWindow(userCheckForm)
})

userCheckButton.addEventListener('click', () => {
    const data = {
        userName: userCheckNameInput.value,
        userEmail: userCheckEmailInput.value
    }
    const headers = {
        'Content-Type': 'application/json'
    }
    
    sendRequest(method.post, url.checkUser, data, headers)
        .then(res => {
            window.alert(res.message)
            if (res.status === 200) {
                hideBlock(userCheckForm)
                showBlock(passwordRecoveryForm)
                changeActiveWindow(passwordRecoveryForm)
                passwordRecoveryNameInput.value = data.userName
            }
        })
})

passwordRecoveryButton.addEventListener('click', () => {
    if ( passwordRecoveryPasswordInput.value === passwordRecoveryPasswordRepeatInput.value && 
        passwordRecoveryPasswordInput.value.length > 0 ) {
        const data = {
            userName: passwordRecoveryNameInput.value,
            userPassword: passwordRecoveryPasswordInput.value,
        }
        const headers = {
            'Content-Type': 'application/json'
        }

        sendRequest(method.patch, url.signUserPassword, data, headers)
            .then(res => {
                window.alert(res.message)
                if (res.status === 200) {
                    hideBlock(passwordRecoveryForm)
                    showBlock(userAutorisationJoice)
                    changeActiveWindow(userAutorisationJoice)
                }
            })
    }
})

deletingUserButton.addEventListener('click', () => {
    hideBlock(settingsBlockWrapper)
    showBlock(deleteUserForm)
    changeActiveWindow(deleteUserForm)
})

deleteUserButton.addEventListener('click', () => {
    const data = {
        password: deletePasswordInput.value,
    }
    const headers = {
        'Content-Type': 'application/json',
        authorization
    }

    sendRequest(method.delete, url.deleteUser, data, headers)
        .then(res => {
            window.alert(res.message)
            if (res.status === 200) {
                hideBlock(deleteUserForm)
                showBlock(userAutorisationJoice)
                localStorage.removeItem("userName")
                localStorage.removeItem("userToken")
                authorization = ''
                deletePasswordInput.value = ''
                changeActiveWindow(settingsBlockWrapper)
            }
        })
})

logoutButton.addEventListener('click', () => {
    localStorage.removeItem("userName")
    localStorage.removeItem("userToken")
    authorization = ''
    returnToMainScreen()
})

homeButton.addEventListener('click', () => {
    returnToMainScreen()
})

settingsBlockWrapper.addEventListener('click', (event) => {
    event.preventDefault()
})

settingsButton.addEventListener('click', () => {
    settingsBlockWrapper.classList.toggle('js-hide')

    if (activeWindow !== settingsBlockWrapper) {
        hideBlock(activeWindow)
        hideBlock(controlButtonsWrapper)
        changeActiveWindow(settingsBlockWrapper)
    } else if (lastActiveWindow === appLearningWrapper) {
        showBlock(controlButtonsWrapper)
        showBlock(lastActiveWindow)
        changeActiveWindow(lastActiveWindow)
    } else {
        showBlock(lastActiveWindow)
        changeActiveWindow(lastActiveWindow)  
    }

    if (!isLogged()) {
        authorization = ''
    }

    if (!authorization) {
        changingPasswordButton.disabled = true
        deletingUserButton.disabled = true
        logoutButton.disabled = true
    } else {
        changingPasswordButton.disabled = false
        deletingUserButton.disabled = false
        logoutButton.disabled = false
    }
})

applySettingsButton.addEventListener('click', () => {
    returnToMainScreen()
})

learningButton.addEventListener('click', () => {
    hideBlock(appChoise)
    showBlock(appLearningWrapper) 
    changeActiveWindow(appLearningWrapper)
    showBlock(controlButtonsWrapper)
    studying()
    checkPrevButton()
})

const start = () => {
    startInit()
    // removeBlock('#app-choice')
    // if (mode === 'learn') {
    //     studying()
    // } else if (mode === 'practice') {
    //     practicing()
    // }
    // showBlock(headerButtonsBlock)
    // showBlock(controlButtonsWrapper)
    // checkPrevButton()
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

const showStudyWord = (direction, wordNumber) => {
    let number
    if (wordNumber) {
        number = wordNumber
    } else if (wordsOrder === 'random') {
        number = randNumber(startWord, endWord) 
    } else if (wordsOrder === 'straight') {
        if (showedWordsNumbers.length === 0) {
            number = 0
        } else {
            number = showedWordsNumbers.length
        }
    }
    
    if (direction === 'forward') {
        fillBlock(number)
        showedWordsNumbers.push(number)
    } else if (direction === 'back') {
        showedWordsNumbers.length = showedWordsNumbers.length-1
        fillBlock(showedWordsNumbers[showedWordsNumbers.length-1])
    }
}

// const showStudyWordPaused =  debounce(() => {
//     showStudyWord()
//     checkPrevButton()
// }, 200);

const studying = () => {
    // clearList(showedWordsNumbers)
    showStudyWord('forward')
    next.disabled = false
    next.addEventListener('click', () => {
        // showStudyWordPaused()
        showStudyWord('forward')
        checkPrevButton()
    })
    prev.addEventListener('click', () => {
        if (showedWordsNumbers.length >= 1) {
            showStudyWord('back')
            checkPrevButton()
        }  
    })
}

// const practicing = () => {
//     activeModeName = '#app-practicing'
//     showedWordsNumbers.length = 0
//     practiceForeign.value = ''
//     checkNextButton()
//     addBlock('#app-practicing')
//     let number = randNumber(startWord, endWord)
//     practiceTranslating.innerHTML = wordsList[number].translation
//     practiceForeign.addEventListener('input',() => {
//         checkNextButton()
//     })
//     next.addEventListener('click', () => {
//         if (practiceForeign.value.trim().toLowerCase() === wordsList[number].word.trim().toLowerCase()) {
//             showedWordsNumbers.push(number)
//             number = randNumber(startWord, endWord)
//             practiceTranslating.innerHTML = wordsList[number].translation
//             practiceForeign.value = ''
//             checkPrevButton()
//         }
//     })
// }

// appChoise.addEventListener('click', (event) => {
//     start(event.target.dataset.id)
// })

// practiceForeign.addEventListener('focus',() => {
//     if (window.innerWidth < 920) {
//         container.style.justifyContent = 'flex-start'
//     } else {
//         container.style.justifyContent = 'space-between'
//     }
// })

// practiceForeign.addEventListener('blur',() => {
//     container.style.justifyContent = 'space-between'
// })

// startPointRangeInput.addEventListener('input', () => {
//     if(Number(startPointRangeInput.value) < Number(endPointRangeInput.value)) {
//         setTimeout(() => {
//             startPointTextInput.value = startPointRangeInput.value
//         }, 50)
//     } else {
//         startPointRangeInput.value = Number(endPointRangeInput.value) - 1
//     }
// })

// startPointTextInput.addEventListener('input', () => {
//     if(Number(startPointTextInput.value) < Number(endPointTextInput.value)) {
//         startPointRangeInput.value = startPointTextInput.value
//     } else {
//         startPointTextInput.value = startPointTextInput.value.slice(0,-1)
//     }
// })

// endPointRangeInput.addEventListener('input', () => {
//     if(Number(endPointRangeInput.value) > Number(startPointRangeInput.value)) {
//         setTimeout(() => {
//             endPointTextInput.value = endPointRangeInput.value
//         }, 50)
//     } else {
//         endPointRangeInput.value = Number(startPointRangeInput.value) + 1
//     }
// })

// endPointTextInput.addEventListener('input', () => {
//     if(Number(endPointTextInput.value) > Number(startPointTextInput.value)) {
//         endPointRangeInput.value = endPointTextInput.value
//     } else {
//         endPointTextInput.value.length = endPointTextInput.value.slice(0,-1)
//     }
// })

// startEndPositionsButton.addEventListener('click', (event) => {
//     event.preventDefault()
//     wordsOrder = document.querySelector('input[name="words-order"]:checked').value
//     settingsBlockWrapper.classList.toggle('js-hide')
//     startWord = Number(startPointTextInput.value)
//     endWord = Number(endPointTextInput.value)
//     wordsOrderNumbers = []
//     for (let i = startWord-1; i <= endWord-1; i++) {
//         wordsOrderNumbers.push(i)
//     }
// })

start()