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

function iniciarJuego(numJugadores) {
    jugadores = numJugadores;
    palabras = {};
    for (let i = 1; i <= jugadores; i++) {
        palabras[i] = [];
    }
    jugadorActual = 1;
    mostrarPantallaJuego();
}

function mostrarPantallaJuego() {
    document.getElementById("pantallaJugadores").style.display = "none";
    document.getElementById("pantallaJuego").style.display = "block";
    
    letraActual = letras.charAt(Math.floor(Math.random() * letras.length));
    document.getElementById("letraActual").innerText = letraActual;
    document.getElementById("jugadorActual").innerText = jugadorActual;
    document.getElementById("palabra").value = "";
    
    tiempoRestante = 60;
    document.getElementById("tiempoRestante").innerText = tiempoRestante;
    
    if (intervaloTiempo) clearInterval(intervaloTiempo);
    
    intervaloTiempo = setInterval(() => {
        tiempoRestante--;
        document.getElementById("tiempoRestante").innerText = tiempoRestante;
        if (tiempoRestante === 0) {
            clearInterval(intervaloTiempo);
            siguienteJugador();
        }
    }, 1000);
}

function registrarPalabra() {
    let palabra = document.getElementById("palabra").value.trim().toUpperCase();
    if (palabra && palabra.startsWith(letraActual)) {
        palabras[jugadorActual].push(palabra);
        document.getElementById("palabra").value = "";
    }
}

function siguienteJugador() {
    if (jugadorActual < jugadores) {
        jugadorActual++;
        mostrarPantallaJuego();
    } else {
        mostrarResultados();
    }
}
