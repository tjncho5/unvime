var totalResp = 0;
var cantidad = 0;

function evaluar(resp, name, id){
    cantidad++;
    console.log(cantidad);
    document.getElementsByName(`${name}`).forEach(e => {
        e.disabled = true;
    });
    let respuesta = document.getElementById(`${id}`);
    if(cantidad < 10){
        if(resp){
            totalResp++;
            respuesta.innerHTML = `<label class="correcto">CORRECTO</label>`
        } else {
            respuesta.innerHTML = `<label class="incorrecto">INCORRECTO</label>`
        }
    } else {
        let total = document.getElementById('total');
        if(resp){
            totalResp++;
            respuesta.innerHTML = `<label class="correcto">CORRECTO</label>`
            total.innerHTML = `Resultado: ${totalResp} sobre 10`
        } else {
            respuesta.innerHTML = `<label class="incorrecto">INCORRECTO</label>`
            total.innerHTML = `Resultado: ${totalResp} sobre 10`
        }
    }
};