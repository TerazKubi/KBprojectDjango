function createNoteCard(noteObject, fullscreen=false){
    const noteCard = createElement('div', fullscreen? ['note-container-FS'] : ['note-container'])
    noteCard.setAttribute('id', noteObject?.id)

    const noteHeader = createElement('div', ['note-header-container'])

    const noteHeaderTags = createElement('div', ['note-tags'])
    noteObject?.tags.forEach(tag => {
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
            displayNoteFullscreen(noteObject)
        })
        noteHeaderButtons.appendChild(expandButton)
        noteHeader.appendChild(noteHeaderButtons)  
    }

    


    
    const noteTitle = createElement('div', ['note-titleContainer'])
    const title = createElement('span', ['note-title'])
    title.innerText = noteObject?.title || ""
    noteTitle.appendChild(title)

    const noteBody = createElement('div', fullscreen? ['note-bodyContainer-FS'] : ['note-bodyContainer'])
    noteBody.innerHTML = noteObject?.text || ""


    if(fullscreen){
        const images = noteBody.getElementsByTagName("img");
        const imagesArray = [...images];
        console.log(images)
        imagesArray.forEach((image, index) => {

            image.classList.add('note-fullscreen-image')

            image.addEventListener("click", () => {
                console.log(image)
                displayImageGalery(index, imagesArray)
            })
        })
    }

    noteCard.appendChild(noteHeader)
    noteCard.appendChild(noteTitle)
    noteCard.appendChild(noteBody)

    return noteCard
}


