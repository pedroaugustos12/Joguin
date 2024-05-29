let secretNumber;
let attempts = 0;
let score = 0;

function generateDailyNumber() {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    return (seed % 100) + 1;
}

function restartGame() {
    secretNumber = generateDailyNumber();
    attempts = 0;
    score = 0;
    document.getElementById('guess').disabled = false;
    document.querySelector('button').disabled = false;
    document.getElementById('message').textContent = '';
    document.getElementById('attempts').textContent = 'Tentativas restantes: 10';
    document.getElementById('history').innerHTML = '';
}

function checkGuess() {
    const guess = parseInt(document.getElementById('guess').value);
    const messageElement = document.getElementById('message');
    const attemptsElement = document.getElementById('attempts');
    const historyElement = document.getElementById('history');
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        messageElement.textContent = 'Por favor, insira um número válido entre 1 e 100.';
        return;
    }
    
    attempts++;
    const remainingAttempts = 10 - attempts;
    attemptsElement.textContent = 'Tentativas restantes: ' + remainingAttempts;

    if (guess === secretNumber) {
        messageElement.textContent = 'Parabéns! Você adivinhou o número!';
        score += remainingAttempts * 10;
        messageElement.style.color = 'green';
    } else if (guess < secretNumber) {
        messageElement.textContent = 'O número é maior. Tente novamente!';
        messageElement.style.color = 'blue';
    } else {
        messageElement.textContent = 'O número é menor. Tente novamente!';
        messageElement.style.color = 'red';
    }
    
    const historyItem = document.createElement('div');
    historyItem.textContent = 'Tentativa ' + attempts + ': ' + guess;
    historyElement.appendChild(historyItem);
    
    if (attempts >= 10 && guess !== secretNumber) {
        messageElement.textContent = 'Você atingiu o número máximo de tentativas. O jogo terminou.';
        messageElement.style.color = 'black';
        document.getElementById('guess').disabled = true;
        document.querySelector('button').disabled = true;
    }

    document.getElementById('guess').value = '';
}

restartGame(); 
