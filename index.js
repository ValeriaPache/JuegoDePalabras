let jugadores = 0;
let jugadorActual = 1;
let tiempoRestante = 60;
let palabras = {};
let intervaloTiempo;
let letraActual = '';

const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

function mostrarPantallaJugadores() {
    document.getElementById("pantallaInicio").style.display = "none";
    document.getElementById("pantallaJugadores").style.display = "block";
}


