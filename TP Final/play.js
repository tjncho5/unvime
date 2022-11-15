// TRAER DEL DOM TODOS LOS ELEMENTOS HTML NECESARIOS

const tablero = document.getElementById('tablero');
const marcador = document.getElementById('marcador');
const btnJugar = document.getElementById('jugar');
const gameOver = document.getElementById('gameOver');

// AJUSTES INICIALES

const tamTablero = 10;
const velovidadSnake = 300;
const tipoCuadrados = {
    cuadradoVacio: 0,
    cuadradoSnake: 1,
    cuadradoComida: 2
};
const direcciones = {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1
};

// VARIABLES DEL JUEGO

let snake;
let puntos;
let direccion;
let arrayTablero;
let arrayVacios;
let intervaloMov;
let nombrePlayer;


const gameOverfunction = () => {
    gameOver.style.display = 'inline-block';
    clearInterval(intervaloMov);
    btnJugar.disabled = false;
    btnJugar.style.opacity = '1'
}

const moverSnake = () => {
    const nuevoCuadrado = String(
        Number(snake[snake.length - 1]) + direcciones[direccion])
        .padStart(2, '0');

    const [fila, col] = nuevoCuadrado.split('');

    if (nuevoCuadrado < 0 || nuevoCuadrado > tamTablero * tamTablero || (direccion === 'ArrowRight' && col == 0)
        || (direccion === 'ArrowLeft' && col == 9) || arrayTablero[fila][col] === tipoCuadrados.cuadradoSnake) {
        gameOverfunction();
    } else {
        snake.push(nuevoCuadrado);
        if (arrayTablero[fila][col] === tipoCuadrados.cuadradoComida) {
            addFood();
        } else {
            const cuadradoVacio = snake.shift();
            dibujaUnCuadrado(cuadradoVacio, 'cuadradoVacio');
        }
        dibujaSnake();
    }
}

const addFood = () => {
    puntos++;
    actualizaMarcador();
    crearComidaRandom();
}



const setDirection = newDire => {
    direccion = newDire;
}

const eventoDireccion = key => {
    switch (key.code) {
        case 'ArrowUp':
            direccion != 'ArrowDown' && setDirection(key.code);
            break;
        case 'ArrowDown':
            direccion != 'ArrowUp' && setDirection(key.code);
            break;
        case 'ArrowLeft':
            direccion != 'ArrowRight' && setDirection(key.code);
            break;
        case 'ArrowRight':
            direccion != 'ArrowLeft' && setDirection(key.code);
            break;

    }
}


const crearComidaRandom = () => {
    const vacioRandom = arrayVacios[Math.floor(Math.random() * arrayVacios.length)];
    dibujaUnCuadrado(vacioRandom, 'cuadradoComida');
}

const actualizaMarcador = () => {
    marcador.innerHTML = puntos;
}

const dibujaSnake = () => {
    snake.forEach(cuad => dibujaUnCuadrado(cuad, 'cuadradoSnake'));
}

const dibujaUnCuadrado = (cuadrado, tipoCuadrado) => {
    const [row, col] = cuadrado.split('');
    arrayTablero[row][col] = tipoCuadrados[tipoCuadrado];
    const divCuadrado = document.getElementById(cuadrado);
    divCuadrado.setAttribute('class', `cuadrado ${tipoCuadrado}`);

    if (tipoCuadrado === 'cuadradoVacio') {
        arrayVacios.push(cuadrado);
    } else {
        const indice = arrayVacios.indexOf(cuadrado);
        if (indice !== -1) {
            arrayVacios.splice(indice, 1);
        }
    }
}

const crearTablero = () => {
    arrayTablero.forEach((row, rowIndex) => {
        row.forEach((column, colIndex) => {
            const idCuadrado = `${rowIndex}${colIndex}`;
            const cuadrado = document.createElement('div');
            cuadrado.setAttribute('class', 'cuadrado cuadradoVacio');
            cuadrado.setAttribute('id', idCuadrado);
            tablero.appendChild(cuadrado);
            arrayVacios.push(idCuadrado);
        });
    });
}

const setGame = () => {
    snake = ['00', '01', '02', '03'];
    puntos = snake.length;
    direccion = 'ArrowRight';
    arrayTablero = Array.from(Array(tamTablero), () => new Array(tamTablero).fill(tipoCuadrados.cuadradoVacio));
    tablero.innerHTML = '';
    arrayVacios = [];
    crearTablero();
}

const startGame = () => {
    setGame();
    gameOver.style.display = 'none';
    btnJugar.disabled = true;
    btnJugar.style.opacity = '.5'
    dibujaSnake();
    actualizaMarcador();
    crearComidaRandom();
    document.addEventListener('keydown', eventoDireccion);
    intervaloMov = setInterval(() => moverSnake(), velovidadSnake);
}

btnJugar.addEventListener('click', startGame);

window.addEventListener('DOMContentLoaded', setGame);