function createFullscreenContainer(navbar, content){
    const FScontainer = createElement('div', ['fullscreen-container'])

    const contentContainer = createElement('div', ['fullscreen-content-container'])
    contentContainer.appendChild(content)
    
    FScontainer.appendChild(navbar)
    FScontainer.appendChild(contentContainer)

    return FScontainer
}