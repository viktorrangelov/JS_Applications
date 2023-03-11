async function getInfo() {

    let idInput =document.getElementById('stopId');
    let stopName = document.getElementById('stopName');
    let busses = document.getElementById('buses');
    
    let id = idInput.value; 
    

    let url = `http://localhost:3030/jsonstore/bus/businfo/${Number(id)}`;
    

    try {
        busses.innerHTML = '';
        idInput.value = '';

       
        let res = await fetch(url);
        if (res.status !== 200) {
            throw new Error('Stop not found')
        }

        let data = await res.json();
      
        stopName.textContent = data.name;
        console.log(data);
        Object.entries(data.buses).forEach(element => {
            let liBusElement = document.createElement('li');
           liBusElement.textContent = `Bus ${element[0]} arrives in ${element[1]} minutes`;
           busses.appendChild(liBusElement);
           
        });
        

       
    } catch (error) {
        stopName.textContent = 'Error'
    }

    
}