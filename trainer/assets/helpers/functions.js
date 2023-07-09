const addBlock = (block) => {
    document.querySelector(`${block}`).classList.remove('js-hide')
}

const removeBlock = (block) => {
    document.querySelector(`${block}`).classList.add('js-hide')
}

const hideBlock = (block) => {
    block.classList.add('opacity-hide')
    let blockChildren = block.childNodes
    for ( let i=0; i<blockChildren.length; i++) {
        if (blockChildren[i].nodeName === "BUTTON") {
            blockChildren[i].disabled = true
            blockChildren[i].classList.add('button-disabled')
        }        
    }
}

const showBlock = (block) => {
    block.classList.remove('opacity-hide')
    let blockChildren = block.childNodes
    for ( let i=0; i<blockChildren.length; i++) {
        if (blockChildren[i].nodeName === "BUTTON") {
            blockChildren[i].disabled = false
            blockChildren[i].classList.remove('button-disabled')
        }
    }
}

const clearList = (list) => {
    list.length = 0
}

const randNumber = (startWord, endWord) => Math.round(startWord + Math.random() * (endWord - startWord))

export { 
    addBlock,
    removeBlock,
    hideBlock,
    showBlock,
    clearList,
    randNumber
}