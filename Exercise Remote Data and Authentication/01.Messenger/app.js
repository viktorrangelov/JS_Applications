function attachEvents() {
    let submitBtn = document.getElementById('submit').addEventListener('click', addComment);
    let refreshBtn = document.getElementById('refresh').addEventListener('click', displayComments);
    
}
let url = 'http://localhost:3030/jsonstore/messenger';
function addComment() {
   let name = document.querySelector('[name = "author"]')
   let smsContent = document.querySelector('[name = "content"]')
   
   let objectData = {
     author: name.value, 
     content: smsContent.value
   }

   fetch(url , {
    method: 'POST',
    headers: { 'Content-type' : 'application/json' },
    body: JSON.stringify(objectData),
   }).then(response => {
    if (!response.ok) {
        throw new Error('Error')
    }
    return response.json
   }).catch(e => alert(e.message))


}

function displayComments() {
    let textArea = document.getElementById('messages');

    fetch(url)
        .then(res =>{
            if (!res.ok) {
                throw new Error('Error')
            }
            return res.json()
        }).then(returnedData => {
            let allSms = [];
            Object.values(returnedData).forEach(el => allSms.push(`${el.author}: ${el.content}`));
            textArea.value = allSms.join('\n');
        }).catch(e => alert(e.message))
}



attachEvents();