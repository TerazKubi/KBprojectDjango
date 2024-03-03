function showAddNewNoteAsync(note = null){
    return new Promise((resolve, reject) => {
        const FScontainer = createElement('div', ['fullscreen-container'])
    
        const navBar = createElement('div', ['fullscreen-navbar'])

        const closeFullscreen = createElement('div', ['fullscreen-navbar-close-button'])
        closeFullscreen.innerHTML = '<img src="/static/Icons/close.svg" alt="expand"/>'
        closeFullscreen.addEventListener('click', () => {
            destroyTextArea()
            FScontainer.remove()
        })

        const saveButton = createElement('div', ['fullscreen-navbar-save-button'])
        saveButton.innerHTML = '<img src="/static/Icons/save.svg" alt="expand"/>'
        saveButton.addEventListener('click', async () => {
            const res = await saveNoteHandler(note)
            console.log(res)
            if(!res) return

            const data = await getNotes()

            displayData(data?.notes, reversed=true)
            

            destroyTextArea()
            FScontainer.remove()
        })
        
        navBar.appendChild(saveButton)
        navBar.appendChild(closeFullscreen)

        const contentContainer = createElement('div', ['fullscreen-content-container'])

        const editorContainer = createElement('div', ['editor-container'])

        const titleContainer = initTitleContainer(note?.title)
        const tagsContainer = initTagsContainer(note?.tags)
        

        const textAreaContainer = document.createElement('div')
        textAreaContainer.classList.add('textAreaContainer')

        const textArea = document.createElement('textarea')
        textArea.setAttribute('id', 'textArea')

        textAreaContainer.appendChild(textArea)
        
        editorContainer.appendChild(titleContainer)
        editorContainer.appendChild(tagsContainer)
        editorContainer.appendChild(textAreaContainer)

        contentContainer.appendChild(editorContainer)
        
        FScontainer.appendChild(navBar)
        FScontainer.appendChild(contentContainer)

        document.body.appendChild(FScontainer)


        resolve()
    })
    
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

async function getNoteObject(){
    const title = document.querySelector('.inputTitle')
    const tagsContainer = document.querySelector('.tagsContainer')
    const divs = tagsContainer.querySelectorAll('li')

    liArray = Array.from(divs)
    
    const tags = liArray.map((value, index, array) => {return value.innerText } )

    const data = await getTextAreaContent()

    return {
        title: title.value,
        tags: tags,
        text: data
    } 
}

async function saveNoteHandler(note){
    const noteData = await getNoteObject()
    
    if (noteData.title.trim() === "") {
        showError("Podaj tytuł 🥱", 'Tragedia')
        return false
    }

    if (noteData.tags.length === 0){
        showError('Po wpisaniu tagu trzeba nadusić Enter c:', 'Dodaj jakieś tagi 😊')
        return false
    }

    if(note){
        editNote(note.id, noteData)
        console.log('edited')
    } else {
        addNoteToDB(noteData)
        console.log('saved')
    } 

    Swal.fire({
        icon: "success",
        title: note? "Udało sie edytować 👌" : "Super! Notatka dodana 👍",
        showConfirmButton: false,
        timer: 1600
    })
    
    return true
}




function showError(errorText, errorTitle){
    Swal.fire({
        title: errorTitle,
        text: errorText,
        icon: 'error',
        confirmButtonColor: 'green',
        confirmButtonText: 'Ok'
    })
}

function showSuccess(text, title){
    Swal.fire({
        title: title,
        text: text,
        icon: "success",
        confirmButtonColor: 'green'
    });
}