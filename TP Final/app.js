window.addEventListener('DOMContentLoaded', () =>{
    const header = document.getElementById('xml');
    const cliente = new XMLHttpRequest();
    cliente.addEventListener('readystatechange', () => {
        if(cliente.readyState == XMLHttpRequest.DONE && cliente.status == 200){
            header.innerHTML = cliente.responseText;
        }
    });

    cliente.open("GET", "./nav/navbar.html");
    cliente.send();
});