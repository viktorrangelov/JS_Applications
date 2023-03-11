
const loginForm = document.querySelector("form");
loginForm.addEventListener('submit',loginizer);
document.getElementById("user").style.display = "none";


async function loginizer(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    let res = await fetch('http://localhost:3030/users/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({
            email,
            password
        }
    )});

    try {
        if (!res.ok) {
            const error = await res.json();
            alert(error.message);
        }
        const data = await res.json()
        const user = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        };

        localStorage.setItem('userData',JSON.stringify(user));
        window.location = './index.html';
        
        
    } catch (error) {
        alert(error.message);
    }


}