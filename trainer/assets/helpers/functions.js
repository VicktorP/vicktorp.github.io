const showBlock = (block) => {
    block.classList.remove('js-hide')
}

const hideBlock = (block) => {
    block.classList.add('js-hide')
}

const isLogged = () => localStorage.getItem("userName") && localStorage.getItem("userToken") ? true : false

// const clearList = (list) => {
//     list.length = 0
// }

const randNumber = (startWord, endWord) => Math.round(startWord + Math.random() * (endWord - startWord))

export {
    hideBlock,
    showBlock,
    isLogged,
    randNumber
}