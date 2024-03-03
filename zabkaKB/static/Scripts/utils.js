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





