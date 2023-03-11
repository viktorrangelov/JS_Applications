function attachEvents() {
    let loadBtn = document.getElementById('btnLoad');
    let createBtn = document.getElementById('btnCreate');
    let personNameInput = document.getElementById('person');
    let phoneInput = document.getElementById('phone');
    let phoneBookUl = document.getElementById('phonebook');
    let url = 'http://localhost:3030/jsonstore/phonebook';

    loadBtn.addEventListener('click', loadPhoneBook);
    createBtn.addEventListener('click', addNewContact);

    async function addNewContact() {
        let personName = personNameInput.value;
        let personPhone = phoneInput.value;

        if (personName == '' || personPhone == '') {
            alert('please fill all fields');
        }
        let sendData = {
            person: personName,
            phone: personPhone
        }
        await fetch(url, {
            method: 'POST',
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(sendData)
        })
        
    }

    async function loadPhoneBook() {
        let res = await fetch(url);
        let data123 = await res.json();
        Object.values(data123).forEach(element => {
            console.log(element);
            let elementId = element['_id'];
            let name = element['person'];
            let phone = element['phone'];

            let liElement = document.createElement('li');
            liElement.textContent = `${name}: ${phone}`;
            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            liElement.appendChild(deleteBtn);
            phoneBookUl.appendChild(liElement);
            deleteBtn.addEventListener('click', async (ev) => {
                let targetUrl = url + elementId;
                await fetch(targetUrl, {
                    method: 'DELETE'
                    
                })
               
               ev.target.parentNode.remove();
            })
            

        });
        
        
    }
}

attachEvents();