const mainContainer = document.querySelector(".main-container")

const textArea = document.querySelector("#default")

const addNoteButton = document.querySelector(".navBar-addButton")
const newNoteContainer = document.querySelector(".blackBg")

const searchInput = document.querySelector('#navBar-searchInput')

// https://sweetalert2.github.io/#configuration

window.onload = async ()=>{

    const data = await getNotes()
    displayData(data?.notes, reversed=true)

}

addNoteButton.addEventListener('click', async () => {
    await showAddNewNoteAsync()
    await initTextAreaAsync()
})


searchInput.addEventListener('input', handleSearch)

async function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();

    const data = await getNotes(searchPhrase = searchTerm)
    // console.log(data.notes)
    displayData(data.notes, reversed = true)
}


function displayData(data, reversed = false) {
    mainContainer.innerHTML = '';

    const displayArray = reversed ? data?.toReversed() : data;

    displayArray?.forEach(element => {
        const card = createNoteCard(element);
        mainContainer.appendChild(card);
    });
}








