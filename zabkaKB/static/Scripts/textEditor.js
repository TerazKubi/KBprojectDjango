/**
 * Asynchronously initializes the TinyMCE editor for the specified textarea with custom configurations.
 *
 * @async
 * @function
 * @returns {Promise<void>} A Promise that resolves once the TinyMCE editor is initialized.
 *
 * @throws {Error} If there is an issue during the initialization process.
 */
function initTextAreaAsync(noteBody = null){
    return new Promise((res, rej) => {
        tinymce.init({
            selector: 'textarea#textArea',
            width: '100%',
            height: '100%',
            resize: false,
            plugins:[
                'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
                'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 
                'table', 'emoticons', 'template', 'codesample'
            ],
            toolbar: 'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify |' + 
            'bullist numlist outdent indent | link image codesample myButton | forecolor backcolor emoticons | fullscreen |',
            menu: {
                favs: {title: 'Menu', items: 'code visualaid | searchreplace | emoticons'}
            },
            menubar: 'favs file edit view insert format tools table',
            content_style: 'body{font-family:Helvetica,Arial,sans-serif; font-size:16px}',
            branding: false,
            setup: function (editor) {
                editor.on('init', function () {       
                    console.log('initialized texteditor')
                    if(noteBody) editor.setContent(noteBody)  
                    const toDelete = document.querySelector(".tox-promotion")
                    toDelete.remove()
                    
                })
            }
        })
        
        res()
    })
}

/**
 * Retrieves the content from the active TinyMCE editor, processes its images asynchronously,
 * and returns the modified HTML content with images converted to base64 format.
 *
 * @async
 * @function
 * @returns {Promise<string>} A Promise that resolves with the modified HTML content.
 *
 * @throws {Error} If an error occurs during image processing.
 */
async function getTextAreaContent() {
    const content = tinymce.activeEditor.getBody()
    const tmpDiv = document.createElement('div')
    tmpDiv.innerHTML = content.innerHTML
    
    const images = tmpDiv.getElementsByTagName('img')

    for(const image of images){
        const imageAsBlob = await imageURLtoBlobAsync(image.src)   
        const imageBase64 = await blobToBase64Async(imageAsBlob)

        image.src = imageBase64
    }

    return tmpDiv.innerHTML

}

function destroyTextArea(){
    tinymce.activeEditor?.destroy()
}