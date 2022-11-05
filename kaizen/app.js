let formulario = document.querySelector('#formulario');

function agregarItem(item){
    let tbody= document.querySelector('#tbody');
    let fila = document.createElement('tr');
    fila.innerHTML =
                    `<td>${item.nombre}</td>
                     <td>${item.apellido}</td>
                     <td>${item.email}</td>
                     <td>${item.fecha}</td>
                     <td style="background-color: ${item.color};"></td>
                     <td><button id="eliminar" type="button" class="btn btn-danger">Eliminar</button></td>
                     <td><button id="editar" type="button" class="btn btn-warning">Editar</button></td>
                    `
                    
                    tbody.appendChild(fila);
                    limpiarFormulario();
                    fila.addEventListener("click", (e) => {
                        let element = e.target;
                        let f = element.parentNode.parentNode; 
                        if(element.id === 'eliminar'){
                            let resp = confirm("Estas seguro de eliminar esta fila?");
                            if(resp){   
                                f.parentNode.removeChild(f);
                            }
                        } else if(element.id === 'editar'){
                            console.log(f);
                        }
                    });

}

formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    let nombre = document.querySelector('#nombre').value;
    let apellido = document.querySelector('#apellido').value;
    let fecha = document.querySelector('#fecha').value;
    let color = document.querySelector('#color').value;
    let email = document.querySelector('#email').value;
    
    var persona = {
        id: Date.now(),
        nombre: nombre,
        apellido: apellido,
        fecha: fecha,
        color: color,
        email: email,
        };

        agregarItem(persona)
});

function limpiarFormulario(){
    document.getElementById('formulario').reset();
}