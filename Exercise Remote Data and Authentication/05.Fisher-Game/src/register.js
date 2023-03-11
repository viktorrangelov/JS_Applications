const regForm = document.querySelector('form');
regForm.addEventListener('submit', registration);

async function registration(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    if (email == '' || password == '' || rePass == '') {
        alert('fill all fields please');
        regForm.reset();
        return;
    }

    if (password != rePass) {
        alert('Passwords don\'t match');
        regForm.reset();
        return;
        

    }

    let urerRegInfo = {
        email,
        password,
        rePass
    }

    let res = await fetch('http://localhost:3030/users/register', {
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(urerRegInfo)
    })

    try {
        if (!res.ok) {
            let error = await res.json();
            throw new Error(error.message)
        }
        let userData = await res.json();
        let user = {
            email: userData.email,
            id: userData._id,
            token: userData.accessToken
        }
        localStorage.setItem('userData',JSON.stringify(user));
        //window.location = './index.html'
        
    } catch (error) {
       alert(error.message);
    }
    
}