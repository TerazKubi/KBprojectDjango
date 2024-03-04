function createNoteEditor(note = null){
    const contentContainer = createElement('div', ['fullscreen-content-container'])
    const editorContainer = createElement('div', ['editor-container'])

    const titleContainer = initTitleContainer(note?.title)
    const tagsContainer = initTagsContainer(note?.tags)
    
    const textAreaContainer = createElement('div', ['textAreaContainer'])
    
    const textArea = document.createElement('textarea')
    textArea.setAttribute('id', 'textArea')

    textAreaContainer.appendChild(textArea)
    
    editorContainer.appendChild(titleContainer)
    editorContainer.appendChild(tagsContainer)
    editorContainer.appendChild(textAreaContainer)

    contentContainer.appendChild(editorContainer)

    return contentContainer
}


function initTitleContainer(title = null){
    const titleInputContainer = createElement('div', ['titleInputContainer'])
    titleInputContainer.innerHTML = `<input type='text' class='inputTitle' value='${ title || "" }'placeholder='Tytuł' maxlength='200'/>`

    return titleInputContainer
}

function initTagsContainer(tags = null){
    const tagsInputContainer = createElement('div', ['tagsContainer'])

    const tagsContainer = createElement('div', ['tagsInputContainer'])
    tagsContainer.innerHTML = `<ul id='tags'></ul>
        <input type='text' id='tagInput' placeholder='Dodaj tag' maxlength='50'>
    `
    const inputTag = tagsContainer.querySelector('#tagInput')
    const tagsList = tagsContainer.querySelector('ul')

    if(tags){
        tags.forEach(tag => {
            addTag(tag, tagsList)
        })
    }

    inputTag.addEventListener('keydown', (event) => {
        if (event.key === "Enter" || event.key === ","){
            event.preventDefault()
            const tagText = inputTag.value.trim().toLowerCase()
            if (tagText){
                inputTag.value = ""
                addTag(tagText, tagsList)
            }
        }
    })

    tagsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('tag')) {
            event.preventDefault()
            event.target.remove()
        }
    })

    tagsInputContainer.appendChild(tagsContainer)

    return tagsInputContainer
}

function addTag(text, parent){
    const divs = parent.querySelectorAll('li')
    liArray = Array.from(divs)
    const tags = liArray.map((value, index, array) => {return value.innerText } )
    if(tags.some(tag => tag === text))
        return showError('Po co dodawać dwa takie same tagi?', 'Błąd 😒')

    const tag = createElement('li', ['tag'])
    tag.innerText = text
    parent.appendChild(tag)
}