function displayImageGalery(currentIndex, images){

    let image = new Image()
    image.src = images[currentIndex].src
    image.classList.add('imageFullscreen')


    const imageContainer = createElement('div', ['fullscreen-image-galery-container'])

    const zoomInButton = createElement('div', ['fullscreen-navbar-button'])
    zoomInButton.innerHTML = '<img src="/static/Icons/add-circle.svg" alt="expand"/>'
    zoomInButton.addEventListener('click', async () => {
        const currentWidth = image.clientWidth
        image.style.width = (currentWidth * 1.2) + "px"
        
    })

    const zoomOutButton = createElement('div', ['fullscreen-navbar-button'])
    zoomOutButton.innerHTML = '<img src="/static/Icons/sub-circle.svg" alt="expand"/>'
    zoomOutButton.addEventListener('click', () => {
        const currentWidth = image.clientWidth
        image.style.width = (currentWidth * 0.8) + "px"
    })

    const nextImageButton = createElement('div', ['fullscreen-image-galery-button-next', 'fullscreen-image-galery-button'])
    nextImageButton.innerHTML = '<img src="/static/Icons/arrow-right.svg" alt="expand"/>'
    nextImageButton.addEventListener('click', (e) => {
        e.preventDefault();
        const newIndex = currentIndex + 1 > images.length-1 ? 0 : currentIndex + 1
        image.src = images[newIndex].src
        image.style.width = 'auto'
        image.style.left = '50%'
        image.style.top  = '50%'
        currentIndex = newIndex
    })

    const prevImageButton = createElement('div', ['fullscreen-image-galery-button-prev', 'fullscreen-image-galery-button'])
    prevImageButton.innerHTML = '<img src="/static/Icons/arrow-left.svg" alt="expand"/>'
    prevImageButton.addEventListener('click', (e) => {
        e.preventDefault();
        const newIndex = currentIndex - 1 < 0 ? images.length-1 : currentIndex - 1
        image.src = images[newIndex].src
        image.style.width = 'auto'
        image.style.left = '50%'
        image.style.top  = '50%'
        currentIndex = newIndex
    })

    imageContainer.appendChild(image)
    if(images.length > 1){
        imageContainer.appendChild(prevImageButton)
        imageContainer.appendChild(nextImageButton)
    }
    

    const buttons = [zoomInButton, zoomOutButton]
    const navBar = createFullscreenNavbar(buttons)
    const FsContainer = createFullscreenContainer(imageContainer)

    FsContainer.insertBefore(navBar, FsContainer.firstChild)

    document.body.appendChild(FsContainer)

    var isDragging = false
    let offset = [0,0]
    let mousePosition

    image.addEventListener('mousedown', function(e) {
        isDragging = true;
        image.style.cursor = 'grab'
        offset = [
            image.offsetLeft - e.clientX,
            image.offsetTop - e.clientY
        ];
    }, true)

    FsContainer.addEventListener('mouseup', function(event) {
        isDragging = false;
        image.style.cursor = 'pointer'
    }, true)

    FsContainer.addEventListener('mousemove', function(e) {
        e.preventDefault()
        if (isDragging) {
            mousePosition = {
                x : e.clientX,
                y : e.clientY
            }
            image.style.left = (mousePosition.x + offset[0]) + 'px'
            image.style.top  = (mousePosition.y + offset[1]) + 'px'
        }
    })

}