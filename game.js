const gameCanvas = document.getElementById('gameCanvas');
const player = document.getElementById('player');
const contador_asteroide = document.getElementById('contador');
let gameWidth = gameCanvas.clientWidth;
let playerWidth = player.offsetWidth;
let playerHeight = player.offsetHeight;
let playerPosition = gameWidth / 2 - playerWidth / 2;
let blockSpeed = 10;
let score = 0;

player.style.left = playerPosition + 'px';
player.style.bottom = '10px';

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    switch (event.key) {
        case "ArrowLeft":
            if (playerPosition > 0) {
                playerPosition -= 20;
                player.style.left = playerPosition + 'px';
            }
            break;
        case "ArrowRight":
            if (playerPosition < gameWidth - playerWidth) {
                playerPosition += 20;
                player.style.left = playerPosition + 'px';
            }
            break;
        case "ArrowUp":
            blockSpeed += 1;
            break;
        case "ArrowDown":
            if (blockSpeed > 10) {
                blockSpeed -= 1;
            }
            break;
    }
}

function spawnBlock() {
    let block = document.createElement('div');
    block.className = 'block';
    let blockPosition = Math.floor(Math.random() * (gameWidth - 30));
    block.style.left = blockPosition + 'px';
    block.style.top = '0px';
    gameCanvas.appendChild(block);

    let blockInterval = setInterval(() => {
        let blockTop = parseInt(block.style.top.replace('px', '')) || 0;
        block.style.top = blockTop + blockSpeed + 'px';

        if (blockTop + 30 >= gameCanvas.clientHeight - 40 && blockTop < gameCanvas.clientHeight) {
            let blockLeft = parseInt(block.style.left.replace('px', ''));
            if (blockLeft < playerPosition + playerWidth && blockLeft + 30 > playerPosition) {
                gameOver();
            }
        }

        if (blockTop > gameCanvas.clientHeight) {
            gameCanvas.removeChild(block);
            score++;
            updateScore();
            clearInterval(blockInterval);
        }
    }, 100);
}

function gameOver() {
    // Adicione aqui a lógica para restartar o jogo
    alert("Game Over!");
    window.location.reload();
}

function updateScore() {
    contador_asteroide.innerText = `Contador: ${score}`;
    // Adicione aqui efeitos visuais ou sons para a pontuação
}

setInterval(spawnBlock, 1500);