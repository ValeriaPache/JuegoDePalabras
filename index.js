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
    
    let maxWords = 0;
    let winner = "";

    for (let i = 1; i <= players; i++) {
        let list = `<h3>Jugador ${i}</h3>`;
        list += `<p>${words[i].join(", ")}</p>`;
        list += `<p>Total: ${words[i].length} palabras</p>`;
        resultDiv.innerHTML += list;

        if (words[i].length > maxWords) {
            maxWords = words[i].length;
            winner = `Jugador ${i}`;
        }
    }
    
    resultDiv.innerHTML += `<h2>GANADOR: ${winner}</h2>`;
}

function restartGame() {
    document.getElementById("resultScreen").style.display = "none";
    document.getElementById("homeScreen").style.display = "block";
}
