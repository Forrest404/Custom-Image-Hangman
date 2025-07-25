class HangmanGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.image = null;
        this.word = '';
        this.guessedLetters = new Set();
        this.wrongGuesses = 0;
        this.maxWrongGuesses = 6;
        this.gameActive = false;
        this.currentDifficulty = 'easy';
        this.imageX = 0;
        this.imageY = 0;
        this.imageScale = 1;
        
        this.wordLists = {
            easy: ['CAT', 'DOG', 'SUN', 'MOON', 'STAR', 'TREE', 'BOOK', 'CAKE', 'BALL', 'FISH'],
            medium: ['PROGRAM', 'COMPUTER', 'NETWORK', 'SOFTWARE', 'HARDWARE', 'DATABASE'],
            hard: ['JAVASCRIPT', 'PROGRAMMING', 'DEVELOPMENT', 'ARCHITECTURE', 'IMPLEMENTATION']
        };

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('imageInput').addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });

        document.getElementById('uploadBtn').addEventListener('click', () => {
            this.showDifficultySelection();
        });

        document.querySelectorAll('.difficulty-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectDifficulty(e.currentTarget.dataset.difficulty);
            });
        });

        document.getElementById('startGameBtn').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('letterInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.makeGuess();
            }
        });

        document.getElementById('guessBtn').addEventListener('click', () => {
            this.makeGuess();
        });

        document.getElementById('newGameBtn').addEventListener('click', () => {
            this.newGame();
        });

        document.getElementById('changeImageBtn').addEventListener('click', () => {
            this.resetToUpload();
        });

        document.getElementById('positionBtn').addEventListener('click', () => {
            this.togglePositionControls();
        });

        document.getElementById('xSlider').addEventListener('input', (e) => {
            this.imageX = parseInt(e.target.value);
            document.getElementById('xPos').textContent = this.imageX;
            this.drawCanvas();
        });

        document.getElementById('ySlider').addEventListener('input', (e) => {
            this.imageY = parseInt(e.target.value);
            document.getElementById('yPos').textContent = this.imageY;
            this.drawCanvas();
        });

        document.getElementById('sizeSlider').addEventListener('input', (e) => {
            this.imageScale = parseInt(e.target.value) / 100;
            document.getElementById('sizePos').textContent = Math.round(this.imageScale * 100);
            this.drawCanvas();
        });

        document.getElementById('resetPosBtn').addEventListener('click', () => {
            this.resetImagePosition();
        });

        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.hideModal();
            this.newGame();
        });

        document.getElementById('backToMenuBtn').addEventListener('click', () => {
            this.hideModal();
            this.resetToUpload();
        });
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.image = new Image();
                this.image.onload = () => {
                    document.getElementById('uploadBtn').disabled = false;
                    this.drawCanvas();
                };
                this.image.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    showDifficultySelection() {
        document.getElementById('uploadScreen').style.display = 'none';
        document.getElementById('difficultyScreen').style.display = 'flex';
    }

    selectDifficulty(difficulty) {
        this.currentDifficulty = difficulty;
        document.querySelectorAll('.difficulty-option').forEach(option => {
            option.classList.remove('active');
        });
        document.querySelector(`[data-difficulty="${difficulty}"]`).classList.add('active');
        document.getElementById('difficultyDisplay').textContent = 
            difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    }

    startGame() {
        if (!this.image) return;

        this.gameActive = true;
        this.word = this.getRandomWord();
        this.guessedLetters.clear();
        this.wrongGuesses = 0;

        document.getElementById('difficultyScreen').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'flex';
        document.getElementById('letterInput').focus();

        this.updateDisplay();
        this.drawCanvas();
    }

    getRandomWord() {
        const words = this.wordLists[this.currentDifficulty];
        return words[Math.floor(Math.random() * words.length)];
    }

    makeGuess() {
        if (!this.gameActive) return;

        const input = document.getElementById('letterInput');
        const letter = input.value.toUpperCase();

        if (!letter || !/^[A-Z]$/.test(letter)) {
            alert('Please enter a valid letter (A-Z)');
            return;
        }

        if (this.guessedLetters.has(letter)) {
            alert('You already guessed that letter!');
            return;
        }

        this.guessedLetters.add(letter);
        this.addUsedLetter(letter);

        if (!this.word.includes(letter)) {
            this.wrongGuesses++;
            this.drawNoose();
        }

        input.value = '';
        this.updateDisplay();

        if (this.checkGameEnd()) {
            this.endGame();
        }
    }

    addUsedLetter(letter) {
        const usedLettersDiv = document.getElementById('usedLetters');
        const letterSpan = document.createElement('span');
        letterSpan.className = 'used-letter';
        letterSpan.textContent = letter;
        usedLettersDiv.appendChild(letterSpan);
    }

    updateDisplay() {
        document.getElementById('lives').textContent = this.maxWrongGuesses - this.wrongGuesses;
        
        const wordDisplay = this.word
            .split('')
            .map(letter => this.guessedLetters.has(letter) ? letter : '_')
            .join(' ');
        document.getElementById('wordDisplay').textContent = wordDisplay;
    }

    drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.image) {
            const maxWidth = this.canvas.width - 40;
            const maxHeight = this.canvas.height - 100;
            
            let imgWidth = this.image.width;
            let imgHeight = this.image.height;
            
            const baseScale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
            imgWidth *= baseScale * this.imageScale;
            imgHeight *= baseScale * this.imageScale;
            
            const baseX = (this.canvas.width - imgWidth) / 2;
            const baseY = 50;
            const x = baseX + (this.imageX * 2);
            const y = baseY + (this.imageY * 2);
            
            this.ctx.drawImage(this.image, x, y, imgWidth, imgHeight);
        }

        this.drawNoose();
    }

    drawNoose() {
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;

        // Base platform
        this.ctx.strokeStyle = '#654321';
        this.ctx.lineWidth = 8;
        this.ctx.beginPath();
        this.ctx.moveTo(30, canvasHeight - 30);
        this.ctx.lineTo(470, canvasHeight - 30);
        this.ctx.stroke();

        // Vertical pole
        if (this.wrongGuesses >= 1) {
            this.ctx.strokeStyle = '#8B4513';
            this.ctx.lineWidth = 12;
            this.ctx.beginPath();
            this.ctx.moveTo(120, canvasHeight - 30);
            this.ctx.lineTo(120, 80);
            this.ctx.stroke();
        }

        // Top horizontal beam
        if (this.wrongGuesses >= 2) {
            this.ctx.strokeStyle = '#8B4513';
            this.ctx.lineWidth = 12;
            this.ctx.beginPath();
            this.ctx.moveTo(120, 80);
            this.ctx.lineTo(420, 80);
            this.ctx.stroke();
        }

        // Rope from beam
        if (this.wrongGuesses >= 3) {
            this.ctx.strokeStyle = '#654321';
            this.ctx.lineWidth = 6;
            this.ctx.beginPath();
            this.ctx.moveTo(420, 80);
            this.ctx.lineTo(420, 120);
            this.ctx.stroke();
        }

        // Noose loop
        if (this.wrongGuesses >= 4) {
            this.ctx.strokeStyle = '#654321';
            this.ctx.lineWidth = 6;
            this.ctx.beginPath();
            this.ctx.arc(420, 140, 25, 0, 2 * Math.PI);
            this.ctx.stroke();
        }

        // Rope to neck area
        if (this.wrongGuesses >= 5) {
            this.ctx.strokeStyle = '#654321';
            this.ctx.lineWidth = 6;
            this.ctx.beginPath();
            this.ctx.moveTo(420, 115);
            this.ctx.lineTo(420, 165);
            this.ctx.stroke();
        }

        // Final tightening (red rope)
        if (this.wrongGuesses >= 6) {
            this.ctx.strokeStyle = '#FF0000';
            this.ctx.lineWidth = 8;
            this.ctx.beginPath();
            this.ctx.moveTo(420, 115);
            this.ctx.lineTo(420, 165);
            this.ctx.stroke();
        }
    }

    checkGameEnd() {
        const wordComplete = this.word
            .split('')
            .every(letter => this.guessedLetters.has(letter));

        if (wordComplete) {
            return 'win';
        }

        if (this.wrongGuesses >= this.maxWrongGuesses) {
            return 'lose';
        }

        return false;
    }

    endGame() {
        this.gameActive = false;
        const result = this.checkGameEnd();
        
        const modal = document.getElementById('gameOverModal');
        const resultText = document.getElementById('gameResult');
        const messageText = document.getElementById('gameMessage');

        if (result === 'win') {
            resultText.textContent = '🎉 Congratulations! You Won!';
            resultText.style.color = '#4CAF50';
            messageText.textContent = `You correctly guessed: ${this.word}`;
        } else {
            resultText.textContent = '💀 Game Over! You Lost!';
            resultText.style.color = '#f44336';
            messageText.textContent = `The word was: ${this.word}`;
        }

        modal.style.display = 'flex';
    }

    hideModal() {
        document.getElementById('gameOverModal').style.display = 'none';
    }

    newGame() {
        this.word = this.getRandomWord();
        this.guessedLetters.clear();
        this.wrongGuesses = 0;
        this.gameActive = true;

        document.getElementById('usedLetters').innerHTML = '';
        document.getElementById('letterInput').value = '';
        document.getElementById('letterInput').focus();

        this.updateDisplay();
        this.drawCanvas();
    }

    resetToUpload() {
        this.gameActive = false;
        this.image = null;
        document.getElementById('imageInput').value = '';
        document.getElementById('uploadBtn').disabled = true;
        document.getElementById('uploadScreen').style.display = 'flex';
        document.getElementById('difficultyScreen').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'none';
        document.getElementById('usedLetters').innerHTML = '';
        document.getElementById('difficultyDisplay').textContent = 'Easy';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    togglePositionControls() {
        const controls = document.getElementById('positionControls');
        controls.style.display = controls.style.display === 'none' ? 'block' : 'none';
    }

    resetImagePosition() {
        this.imageX = 0;
        this.imageY = 0;
        this.imageScale = 1;
        
        document.getElementById('xSlider').value = 0;
        document.getElementById('ySlider').value = 0;
        document.getElementById('sizeSlider').value = 100;
        document.getElementById('xPos').textContent = '0';
        document.getElementById('yPos').textContent = '0';
        document.getElementById('sizePos').textContent = '100';
        
        this.drawCanvas();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HangmanGame();
}); 