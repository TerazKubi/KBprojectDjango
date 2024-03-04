const mainContainer = document.querySelector(".main-container")

const addNoteButton = document.querySelector(".navBar-addButton")

const searchInput = document.querySelector('#navBar-searchInput')

// https://sweetalert2.github.io/#configuration

window.onload = async ()=>{
    const data = await getNotes()
    displayData(data?.notes, reversed=true)
}

addNoteButton.addEventListener('click', async () => {
    await displayNoteEditor()
    await initTextAreaAsync()
})

searchInput.addEventListener('input', handleSearchEvent)













