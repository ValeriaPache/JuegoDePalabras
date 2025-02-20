let players = 0;
let currentPlayer = 1;
let remainingTime = 60;
let words = {};
let timeInterval;
let currentLetter = '';

const letter = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

/**
 * Muestra la pantalla de selección de jugadores
 */
function showPlayersScreen() {
  document.getElementById("homeScreen").style.display = "none";
  document.getElementById("playersScreen").style.display = "block";
}

/**
 * Inicia el juego con el número de jugadores seleccionados
 */
function startGame(numPlayers) {
  players = numPlayers;
  words = {};
  for (let i = 1; i <= players; i++) {
    words[i] = [];
  }
  currentPlayer = 1;
  showGameScreen();
}

/**
 * Muestra la pantalla del juego para el jugador actual
 */
function showGameScreen() {
  document.getElementById("playersScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";

  // Selecciona una letra aleatoria
  currentLetter = letter.charAt(Math.floor(Math.random() * letter.length));
  document.getElementById("currentLetter").innerText = currentLetter;
  document.getElementById("currentPlayer").innerText = currentPlayer;
  document.getElementById("word").value = "";

  // Reinicia el tiempo
  remainingTime = 10;
  document.getElementById("remainingTime").innerText = remainingTime;

  // Limpia el intervalo anterior si existe
  if (timeInterval) clearInterval(timeInterval);

  // Inicia la cuenta regresiva
  timeInterval = setInterval(() => {
    remainingTime--;
    document.getElementById("remainingTime").innerText = remainingTime;
    if (remainingTime === 0) {
      clearInterval(timeInterval);
      nextPlayer();
    }
  }, 1000);
}

/**
 * Registra la palabra si coincide con la letra actual
 */
function registerWord() {
  let word = document.getElementById("word").value.trim().toUpperCase();
  if (word && word.startsWith(currentLetter)) {
    words[currentPlayer].push(word);
    document.getElementById("word").value = "";
  }
}

/**
 * Pasa al siguiente jugador o muestra resultados si ya fue el último
 */
function nextPlayer() {
  if (currentPlayer < players) {
    currentPlayer++;
    showGameScreen();
  } else {
    showResults();
  }
}

/**
 * Muestra la pantalla de resultados y determina el ganador
 */
function showResults() {
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("resultScreen").style.display = "block";

  let resultDiv = document.getElementById("results");

  // Estructura de la tabla
  let tableHTML = `
    <div class="tableContainer">
      <table>
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Palabras</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
  `;

  // Variables para calcular el ganador
  let maxWords = 0;
  let winner = "";

  // Rellenar la tabla y calcular quién tiene más palabras
  for (let i = 1; i <= players; i++) {
    tableHTML += `
      <tr>
        <td>Jugador ${i}</td>
        <td>${words[i].join(", ")}</td>
        <td>${words[i].length}</td>
      </tr>
    `;

    if (words[i].length > maxWords) {
      maxWords = words[i].length;
      winner = `Jugador ${i}`;
    }
  }

  tableHTML += `
        </tbody>
      </table>
    </div>
  `;

  // Añade la información del ganador
  tableHTML += `<h3 style="margin-top: 20px;">GANADOR: ${winner}</h3>`;

  // Inyecta todo en el div de resultados
  resultDiv.innerHTML = tableHTML;
}

/**
 * Regresa a la pantalla inicial
 */
function restartGame() {
  document.getElementById("resultScreen").style.display = "none";
  document.getElementById("homeScreen").style.display = "block";
}
