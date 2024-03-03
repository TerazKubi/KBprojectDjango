function createNoteCard(cardObject, fullscreen=false){
    const noteCard = createElement('div', fullscreen? ['note-container-FS'] : ['note-container'])
    noteCard.setAttribute('id', cardObject.id)

    const noteHeader = createElement('div', ['note-header-container'])

    const noteHeaderTags = createElement('div', ['note-tags'])
    cardObject?.tags.forEach(tag => {
        const tagContainer = createElement('div', ['note-tag'])
        tagContainer.innerText = tag

        tagContainer.addEventListener('click', () => {
            tagEventHandler(tag)
        })

        noteHeaderTags.appendChild(tagContainer)
    })

    noteHeader.appendChild(noteHeaderTags)
    
    if(!fullscreen){
        const noteHeaderButtons = createElement('div', ['note-buttons'])

        const expandButton = createElement('div', ['note-btn', 'expand'])
        expandButton.innerHTML = `<img src="/static/Icons/expandB.svg" alt="expand"/>`
        expandButton.addEventListener('click', () => {
            showNoteCardFS(cardObject)
        })
        noteHeaderButtons.appendChild(expandButton)
        noteHeader.appendChild(noteHeaderButtons)  
    }
    
    const noteTitle = createElement('div', ['note-titleContainer'])
    const title = createElement('span', ['note-title'])
    title.innerText = cardObject?.title || ""
    noteTitle.appendChild(title)

    const noteBody = createElement('div', fullscreen? ['note-bodyContainer-FS'] : ['note-bodyContainer'])
    noteBody.innerHTML = cardObject?.text || ""

    noteCard.appendChild(noteHeader)
    noteCard.appendChild(noteTitle)
    noteCard.appendChild(noteBody)

    return noteCard
}


async function tagEventHandler(tag){
    searchInput.focus()
    searchInput.value = tag
    const inputEvent = new Event('input')
    searchInput.dispatchEvent(inputEvent)
}