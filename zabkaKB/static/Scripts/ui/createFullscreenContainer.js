function createFullscreenContainer(content){
    const FScontainer = createElement('div', ['fullscreen-container'])

    const contentContainer = createElement('div', ['fullscreen-content-container'])
    contentContainer.appendChild(content)

    
    FScontainer.appendChild(contentContainer)

    return FScontainer
}