let players = 0;
let currentPlayer = 1;
let remainingTime = 60;
let words = {};
let timeInterval;
let currentLetter = '';

const letter = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

function showPlayersScreen() {
    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("playersScreen").style.display = "block";
}

function startGame(numPlayers) {
    players = numPlayers;
    words = {};
    for (let i = 1; i <= players; i++) {
        words[i] = [];
    }
    currentPlayer = 1;
    showGameScreen();
}

function showGameScreen() {
    document.getElementById("playersScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    
    currentLetter = letter.charAt(Math.floor(Math.random() * letter.length));
    document.getElementById("currentLetter").innerText = currentLetter;
    document.getElementById("currentPlayer").innerText = currentPlayer;
    document.getElementById("word").value = "";
    
    remainingTime = 60;
    document.getElementById("remainingTime").innerText = remainingTime;
    
    if (timeInterval) clearInterval(timeInterval);
    
    timeInterval = setInterval(() => {
        remainingTime--;
        document.getElementById("remainingTime").innerText = remainingTime;
        if (remainingTime === 0) {
            clearInterval(timeInterval);
            nextPlayer();
        }
    }, 1000);
}

function registerWord() {
    let word = document.getElementById("word").value.trim().toUpperCase();
    if (word && word.startsWith(currentLetter)) {
        words[currentPlayer].push(word);
        document.getElementById("word").value = "";
    }
}

function nextPlayer() {
    if (currentPlayer < players) {
        currentPlayer++;
        showGameScreen();
    } else {
        ShowResults();
    }
}
function ShowResults() {
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("resultScreen").style.display = "block";
    
    let resultDiv = document.getElementById("results");
    resultDiv.innerHTML = "";

    let tableHTML = `<div class="tableContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th>Jugador</th>
                                    <th>Palabras</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>`;

    let maxWords = 0;
    let winner = "";

    for (let i = 1; i <= players; i++) {
        tableHTML += `<tr>
                        <td>Jugador ${i}</td>
                        <td>${words[i].join(", ")}</td>
                        <td>${words[i].length}</td>
                    </tr>`;

        if (words[i].length > maxWords) {
            maxWords = words[i].length;
            winner = `Jugador ${i}`;
        }
    }

    tableHTML += `  </tbody>
                  </table>
                </div>`;

    resultDiv.innerHTML = tableHTML;
    resultDiv.innerHTML += `<h2>GANADOR: ${winner}</h2>`;
}



function restartGame() {
    document.getElementById("resultScreen").style.display = "none";
    document.getElementById("homeScreen").style.display = "block";
}
