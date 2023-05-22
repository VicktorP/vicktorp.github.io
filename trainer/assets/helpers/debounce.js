function debounce(func, timeout = 500){
    let timer = null

    return (...args) => {
        if (timer) {
            clearTimeout(timer)
        }
        
        timer = setTimeout(() => {
            func(...args)
        }, timeout)
    }
}

export default debounce