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


function displayData(data, reversed = false) {
    mainContainer.innerHTML = '';

    const displayArray = reversed ? data?.toReversed() : data;

    displayArray?.forEach(element => {
        const card = createNoteCard(element);
        mainContainer.appendChild(card);
    });
}

async function imageURLtoBlobAsync(url){
    return new Promise(async (resolve, reject) => {
        const response = await fetch(url)
        const blob = await response.blob()

        resolve(blob)
    })
}

function blobToBase64Async(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
  
        reader.onload = function(event) {
            const base64String = event.target.result;
            resolve(base64String)
        }
  
        reader.onerror = function(error) {
            reject(error)
        }
  
        reader.readAsDataURL(blob)
    })
}

function createElement(tagName, classNames) {
    const element = document.createElement(tagName)
    element.classList.add(...classNames)
    return element
}

function createButton(text, classNames, clickHandler) {
    const button = createElement('button', classNames)
    button.innerText = text
    button.addEventListener('click', clickHandler)
    return button
}





