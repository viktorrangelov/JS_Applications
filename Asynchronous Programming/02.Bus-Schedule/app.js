function solve() {
    let label = document.querySelector('#info span');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    
   

    let stop = {
        next: 'depot'
    }

    async function depart() {
        departBtn.disabled = true;
        let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        let res = await fetch(url);
        stop = await res.json();
        label.textContent = `Next stop: ${stop.name}`;
        arriveBtn.disabled = false;
    }

    function arrive() {
        label.textContent = `Arriving at ${stop.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();