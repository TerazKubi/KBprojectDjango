function createFullscreenNavbar(buttons){
    const navBar = createElement('div', ['fullscreen-navbar'])

    
    const closeFsButton = createElement('div', ['fullscreen-navbar-close-button'])
    closeFsButton.innerHTML = '<img src="/static/Icons/close.svg" alt="expand"/>'
    closeFsButton.addEventListener('click', () => {
        destroyTextArea()
        navBar.parentElement.remove()
    })
    navBar.appendChild(closeFsButton)
    
    buttons.forEach(button => navBar.appendChild(button))
    
    
    return navBar
}