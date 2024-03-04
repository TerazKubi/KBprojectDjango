function displayNoteEditor(noteObject = null){
    const contentContainer = createNoteEditor(noteObject)

    const saveButton = createElement('div', ['fullscreen-navbar-button'])
    saveButton.innerHTML = '<img src="/static/Icons/save.svg" alt="expand"/>'
    saveButton.addEventListener('click', async () => {
        const res = await saveNoteHandler(noteObject)
        if(!res) return

        const data = await getNotes()

        displayData(data?.notes, reversed=true)

        destroyTextArea()
        FsContainer.remove()
    })

    const buttons = [saveButton]
    const navBar = createFullscreenNavbar(buttons)
    const FsContainer = createFullscreenContainer(contentContainer)

    FsContainer.insertBefore(navBar, FsContainer.firstChild)

    
    document.body.appendChild(FsContainer)
}