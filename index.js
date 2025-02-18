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
function mostrarResultados() {
    document.getElementById("pantallaJuego").style.display = "none";
    document.getElementById("pantallaResultados").style.display = "block";
    
    let resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";
    
    let maxPalabras = 0;
    let ganador = "";

    for (let i = 1; i <= jugadores; i++) {
        let lista = `<h3>Jugador ${i}</h3>`;
        lista += `<p>${palabras[i].join(", ")}</p>`;
        lista += `<p>Total: ${palabras[i].length} palabras</p>`;
        resultadosDiv.innerHTML += lista;

        if (palabras[i].length > maxPalabras) {
            maxPalabras = palabras[i].length;
            ganador = `Jugador ${i}`;
        }
    }
    
    resultadosDiv.innerHTML += `<h2>GANADOR: ${ganador}</h2>`;
}

function reiniciarJuego() {
    document.getElementById("pantallaResultados").style.display = "none";
    document.getElementById("pantallaInicio").style.display = "block";
}
