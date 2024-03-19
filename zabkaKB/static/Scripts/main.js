const mainContainer = document.querySelector(".main-container")

const addNoteButton = document.querySelector(".navBar-addButton")

const searchInput = document.querySelector('#navBar-searchInput')

const title = document.querySelector(".titleContainer")

// https://sweetalert2.github.io/#configuration

window.onload = async ()=>{
    const data = await getNotes()
    displayData(data?.notes, reversed=true)
}

title.addEventListener('click', () => {
    searchInput.focus()
    searchInput.value = ''
    const inputEvent = new Event('input')
    searchInput.dispatchEvent(inputEvent)
})

addNoteButton.addEventListener('click', async () => {
    await displayNoteEditor()
    await initTextAreaAsync()
})

searchInput.addEventListener('input', handleSearchEvent)













