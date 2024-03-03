




function showNoteCardFS(noteData){
    const noteCard = createNoteCard(noteData, fullscreen=true)

    const editButton = createElement('div', ['fullscreen-navbar-close-button'])
    editButton.innerHTML = '<img src="/static/Icons/edit.svg" alt="expand"/>'
    editButton.addEventListener('click', async () => {
        FsContainer.remove()
        await showAddNewNoteAsync(noteData)
        await initTextAreaAsync(noteData.text)
        
    })
    const removeButton = createElement('div', ['fullscreen-navbar-delete-button'])
    removeButton.innerHTML = '<img src="/static/Icons/deleteB.svg" alt="expand"/>'
    removeButton.addEventListener('click', async ()=> {
        Swal.fire({
            title: "Serio chcesz usunąć? 😯",
            showDenyButton: true,
            confirmButtonColor: 'red',
            confirmButtonText: "Usuń",
            denyButtonText: `Wróć`,
            denyButtonColor: 'gray'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteNote(noteData.id)
                document.getElementById(noteData.id).remove()
                FsContainer.remove()
                Swal.fire("Usunięto 😒", "", "success")
            } else if (result.isDenied) {             
                return
            }
        });
        
    })

    const buttons = ['close']
    const navBar = createFullscreenNavbar(buttons)
    const FsContainer = createFullscreenContainer(navBar, noteCard)

    

    

    document.body.appendChild(FsContainer)
}