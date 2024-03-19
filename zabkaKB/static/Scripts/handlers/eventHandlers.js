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

    showSuccess(note? "Udało sie edytować 👌" : "Super! Notatka dodana 👍")
    
    return true
}


async function tagEventHandler(tag){
    searchInput.focus()
    searchInput.value = tag
    const inputEvent = new Event('input')
    searchInput.dispatchEvent(inputEvent)
}


async function handleSearchEvent() {
    const searchTerm = searchInput.value.toLowerCase();

    const data = await getNotes(searchPhrase = searchTerm)
    // console.log(data.notes)
    displayData(data.notes, reversed = true)
}


