const addTag = (tag) => {
    document.querySelector(`${tag}`).classList.remove('js-hide')
}

const removeTag = (tag) => {
    document.querySelector(`${tag}`).classList.add('js-hide')
}

const hideTag = (tag) => {
    tag.classList.add('opacity-hide')
}

const showTag = (tag) => {
    tag.classList.remove('opacity-hide')
}

export { 
    addTag,
    removeTag,
    hideTag,
    showTag
}