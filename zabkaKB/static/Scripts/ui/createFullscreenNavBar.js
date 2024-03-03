function createFullscreenNavbar(buttons){
    const navBar = createElement('div', ['fullscreen-navbar'])

    const buttonsContainer = createElement('div', ['fullscreen-navbar-buttons-container'])

    const closeFsButton = createElement('div', ['fullscreen-navbar-close-button'])
    closeFsButton.innerHTML = '<img src="/static/Icons/close.svg" alt="expand"/>'
    closeFsButton.addEventListener('click', () => {
        destroyTextArea()
        navBar.parentElement.remove()
    })
    buttons.forEach(button => buttonsContainer.appendChild(button))

    navBar.appendChild(buttonsContainer)
    navBar.appendChild(closeFsButton)
    
    
    
    return navBar
}