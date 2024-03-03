function addNoteToDB(noteData){
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('/notes/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(noteData)
            })
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const responseJSON = await response.json()
            resolve(responseJSON)
        } catch (error) {
            reject(error)
        }
    })
}


async function getNotes(searchPhrase = null){
    return new Promise(async (resolve, reject) => {
        let url = '/notes'

        if(searchPhrase) url+= '?search=' + searchPhrase

        try {
            const response = await fetch(url, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
        
            const responseJSON = await response.json()
            resolve(responseJSON)
        } catch (error) {
            reject(error)
        }
    })
}


async function deleteNote(id){
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`/notes/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any additional headers if needed
                },
            })
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const responseData = await response.json()
            
            resolve(responseData)    
        } catch (error) {
            reject(error)
        }
    })
    
}


async function editNote(noteId, updatedNoteData) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`/notes/edit/${noteId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedNoteData),
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
    
            const responseData = await response.json()
            resolve(responseData)

        } catch (error) {
            reject(error)
        }
    })
}