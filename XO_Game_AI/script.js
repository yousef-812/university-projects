/**
 * ============================================================================
 * X-O Game Engine & AI Minimax Real-Time Visualizer
 * PEAS & ODESDA Frameworks Implementation
 * ============================================================================
 */

class TicTacToeApp {
    constructor() {
        // Board State: 0: Empty, 1: X (Human), 2: O (AI)
        self = this;
        this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.currentPlayer = 1; // 1: Human (X), 2: AI (O)
        this.gameActive = true;
        this.difficulty = "Impossible"; // Easy, Medium, Impossible
        this.soundEnabled = true;

        this.scores = { human: 0, ai: 0, draws: 0 };
        this.evaluationsCount = 0;

        // Initialize Audio Context for Synthesized Sound Effects
        this.initAudio();

        // Cache DOM Elements
        this.cells = document.querySelectorAll('.cell');
        this.statusText = document.getElementById('status-text');
        this.consoleBody = document.getElementById('console-body');
        this.thinkBar = document.getElementById('think-bar');
        this.aiIndicator = document.getElementById('ai-indicator');
        this.aiIndicatorText = document.getElementById('ai-indicator-text');
        this.evalCountEl = document.getElementById('eval-count');

        this.winningLineSvg = document.getElementById('winning-line-svg');
        this.winningLine = document.getElementById('winning-line');

        // Confetti Context
        this.confettiCanvas = document.getElementById('confetti-canvas');
        this.confettiCtx = this.confettiCanvas.getContext('2d');
        this.resizeConfetti();

        // Bind Events
        this.bindEvents();
    }

    initAudio() {
        try {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            this.audioCtx = null;
        }
    }

    playSound(type) {
        if (!this.soundEnabled || !this.audioCtx) return;
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        const now = this.audioCtx.currentTime;

        if (type === 'click') {
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
        } else if (type === 'ai-move') {
            osc.frequency.setValueAtTime(330, now);
            osc.frequency.exponentialRampToValueAtTime(660, now + 0.1);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'win') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
            osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
            osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            osc.start(now);
            osc.stop(now + 0.5);
        } else if (type === 'draw') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.linearRampToValueAtTime(150, now + 0.3);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        }
    }

    bindEvents() {
        // Cell Clicks
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.handleCellClick(index);
            });
        });

        // Difficulty Pills
        document.querySelectorAll('.pill-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
                const target = e.currentTarget;
                target.classList.add('active');
                this.difficulty = target.dataset.level;
                this.logConsole(`⚙️ [Config]: تم تغيير مستوى الذكاء الاصطناعي إلى: ${this.difficulty}`, 'system');
            });
        });

        // Controls
        document.getElementById('reset-btn').addEventListener('click', () => this.resetGame());
        document.getElementById('clear-score-btn').addEventListener('click', () => this.clearScores());
        document.getElementById('clear-console-btn').addEventListener('click', () => {
            this.consoleBody.innerHTML = '';
            this.logConsole("=== تم تفريغ سجل الشاشة ===", "system");
        });

        // Sound Toggle
        document.getElementById('sound-toggle-btn').addEventListener('click', (e) => {
            this.soundEnabled = !this.soundEnabled;
            e.currentTarget.innerHTML = this.soundEnabled ? 
                '<i class="fa-solid fa-volume-high"></i>' : 
                '<i class="fa-solid fa-volume-xmark"></i>';
        });

        // Modal Handlers
        const modal = document.getElementById('peas-modal');
        document.getElementById('peas-modal-btn').addEventListener('click', () => modal.classList.add('active'));
        document.getElementById('close-modal').addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });

        // Modal Tabs
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                const targetTab = e.currentTarget;
                targetTab.classList.add('active');
                document.getElementById(targetTab.dataset.tab).classList.add('active');
            });
        });

        window.addEventListener('resize', () => this.resizeConfetti());
    }

    handleCellClick(index) {
        if (!this.gameActive || this.board[index] !== 0 || this.currentPlayer !== 1) return;

        this.playSound('click');
        this.makeMove(index, 1);
        
        const row = Math.floor(index / 3) + 1;
        const col = (index % 3) + 1;
        this.logConsole(`👤 [Human Move]: اختيار الخلية ${index} (صف ${row}, عمود ${col})`, 'sensor');

        const winResult = this.checkWinner(this.board);
        if (winResult) {
            this.endGame(winResult);
            return;
        }

        // Switch to AI Turn
        this.currentPlayer = 2;
        this.statusText.innerText = "الذكاء الاصطناعي يفكر... 🧠";
        this.setAiStatus(true);

        setTimeout(() => this.aiTurn(), 450);
    }

    aiTurn() {
        this.logConsole(`\n🤖 [AI Decision Phase]: تحليل الخيارات المتاحة...`, 'eval');
        
        this.evaluationsCount = 0;
        const startTime = performance.now();

        const { bestMove, logs } = this.getBestMove();

        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(1);

        logs.forEach(log => this.logConsole(log.text, log.type));
        this.logConsole(`⏱️ زمن المعالجة: ${duration} ms | عدد التقييمات: ${this.evaluationsCount}`, 'system');

        this.evalCountEl.innerHTML = `<i class="fa-solid fa-microchip text-yellow"></i> تقييمات الشجرة: ${this.evaluationsCount}`;

        if (bestMove !== null) {
            this.playSound('ai-move');
            this.makeMove(bestMove, 2);

            const winResult = this.checkWinner(this.board);
            if (winResult) {
                this.endGame(winResult);
                return;
            }

            this.currentPlayer = 1;
            this.statusText.innerText = "دورك الآن! اختر خلية للعب (X)";
        }

        this.setAiStatus(false);
    }

    makeMove(index, player) {
        this.board[index] = player;
        const cell = this.cells[index];
        cell.innerText = player === 1 ? 'X' : 'O';
        cell.classList.add(player === 1 ? 'x' : 'o');
    }

    getBestMove() {
        const availableMoves = this.getAvailableMoves(this.board);
        const logs = [];

        logs.push({ text: `🔍 [Sensors]: رصد الخانات الشاغرة: [${availableMoves.join(', ')}]`, type: 'sensor' });

        if (availableMoves.length === 0) return { bestMove: null, logs };

        // Easy Mode
        if (this.difficulty === "Easy") {
            const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            logs.push({ text: `🎲 [Random Decision]: حرك عشوائية في الخلية ${move}`, type: 'decision' });
            return { bestMove: move, logs };
        }

        // Medium Mode
        if (this.difficulty === "Medium" && Math.random() < 0.5) {
            const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            logs.push({ text: `⚖️ [Medium AI]: حركة عشوائية تكتيكية في الخلية ${move}`, type: 'decision' });
            return { bestMove: move, logs };
        }

        // Impossible Mode (Minimax Engine)
        let bestScore = -Infinity;
        let bestMove = null;

        logs.push({ text: `🧠 [Minimax]: محاكاة شجرة القرارات لـ ${availableMoves.length} خيارات:`, type: 'eval' });

        for (let move of availableMoves) {
            this.board[move] = 2; // AI move
            this.evaluationsCount++;
            const score = this.minimax(this.board, 0, false);
            this.board[move] = 0; // Undo

            const row = Math.floor(move / 3) + 1;
            const col = (move % 3) + 1;
            
            let evalNote = score > 0 ? "🏆 فوز مؤكد" : score < 0 ? "⚠️ خسارة محتملة" : "🛡️ تعادل مضمون";
            logs.push({ text: `  ├─ الخلية ${move} (صف ${row}, عمود ${col}) ⬅️ النقاط: ${score} (${evalNote})`, type: 'eval' });

            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }

        const bestRow = Math.floor(bestMove / 3) + 1;
        const bestCol = (bestMove % 3) + 1;
        logs.push({ text: `💡 [Final Action]: اختيار الخلية ${bestMove} (صف ${bestRow}, عمود ${bestCol}) أعلى درجة = ${bestScore}`, type: 'decision' });

        return { bestMove, logs };
    }

    minimax(board, depth, isMaximizing) {
        const winnerObj = this.checkWinner(board);
        if (winnerObj) {
            if (winnerObj.winner === 2) return 10 - depth;
            if (winnerObj.winner === 1) return depth - 10;
            if (winnerObj.winner === 'draw') return 0;
        }

        this.evaluationsCount++;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let move of this.getAvailableMoves(board)) {
                board[move] = 2;
                let score = this.minimax(board, depth + 1, false);
                board[move] = 0;
                bestScore = Math.max(score, bestScore);
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let move of this.getAvailableMoves(board)) {
                board[move] = 1;
                let score = this.minimax(board, depth + 1, true);
                board[move] = 0;
                bestScore = Math.min(score, bestScore);
            }
            return bestScore;
        }
    }

    getAvailableMoves(board) {
        const moves = [];
        for (let i = 0; i < 9; i++) {
            if (board[i] === 0) moves.push(i);
        }
        return moves;
    }

    checkWinner(board) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] !== 0 && board[a] === board[b] && board[a] === board[c]) {
                return { winner: board[a], pattern };
            }
        }

        if (!board.includes(0)) {
            return { winner: 'draw' };
        }

        return null;
    }

    endGame(result) {
        this.gameActive = false;
        this.setAiStatus(false);

        if (result.winner === 1) {
            this.scores.human++;
            document.getElementById('score-human').innerText = this.scores.human;
            this.statusText.innerText = "🎉 مبارك! لقد فزت على الذكاء الاصطناعي!";
            this.logConsole("\n🏆 [Game End]: فوز الإنسان على الذكاء الاصطناعي!", "win");
            this.playSound('win');
            this.triggerConfetti();
        } else if (result.winner === 2) {
            this.scores.ai++;
            document.getElementById('score-ai').innerText = this.scores.ai;
            this.statusText.innerText = "🤖 فاز الذكاء الاصطناعي! حظاً أوفر في الجولة القادمة";
            this.logConsole("\n🤖 [Game End]: تفوق الذكاء الاصطناعي (Minimax Victory)", "decision");
            this.playSound('win');
        } else {
            this.scores.draws++;
            document.getElementById('score-draws').innerText = this.scores.draws;
            this.statusText.innerText = "🤝 تعادل ممتاز مع الذكاء الاصطناعي!";
            this.logConsole("\n🤝 [Game End]: انتهاء المباراة بالتعادل المفروض", "eval");
            this.playSound('draw');
        }

        if (result.pattern) {
            this.drawWinningLine(result.pattern);
        }
    }

    drawWinningLine(pattern) {
        const [a, , c] = pattern;
        const cellA = this.cells[a].getBoundingClientRect();
        const cellC = this.cells[c].getBoundingClientRect();
        const boardRect = document.getElementById('board').getBoundingClientRect();

        const x1 = (cellA.left + cellA.width / 2) - boardRect.left;
        const y1 = (cellA.top + cellA.height / 2) - boardRect.top;
        const x2 = (cellC.left + cellC.width / 2) - boardRect.left;
        const y2 = (cellC.top + cellC.height / 2) - boardRect.top;

        this.winningLine.setAttribute('x1', x1);
        this.winningLine.setAttribute('y1', y1);
        this.winningLine.setAttribute('x2', x2);
        this.winningLine.setAttribute('y2', y2);
        this.winningLine.classList.add('drawn');

        pattern.forEach(idx => this.cells[idx].classList.add('winning-cell'));
    }

    resetGame() {
        this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.currentPlayer = 1;
        this.gameActive = true;

        this.cells.forEach(cell => {
            cell.innerText = '';
            cell.className = 'cell';
        });

        this.winningLine.classList.remove('drawn');
        this.statusText.innerText = "دورك الآن! اختر خلية للعب (X)";
        this.logConsole("\n🔄 --- بداية جولة جديدة ---", "system");
        this.setAiStatus(false);
    }

    clearScores() {
        this.scores = { human: 0, ai: 0, draws: 0 };
        document.getElementById('score-human').innerText = 0;
        document.getElementById('score-ai').innerText = 0;
        document.getElementById('score-draws').innerText = 0;
        this.logConsole("🧹 تم تصفير سجل النقاط.", "system");
    }

    setAiStatus(isThinking) {
        if (isThinking) {
            this.aiIndicatorText.innerText = "جاري التفكير...";
            this.aiIndicator.style.borderColor = "var(--accent-yellow)";
            this.aiIndicator.style.color = "var(--accent-yellow)";
            this.thinkBar.classList.add('thinking');
        } else {
            this.aiIndicatorText.innerText = "جاهز";
            this.aiIndicator.style.borderColor = "rgba(0, 255, 135, 0.2)";
            this.aiIndicator.style.color = "var(--primary-green)";
            this.thinkBar.classList.remove('thinking');
            this.thinkBar.style.width = '0%';
        }
    }

    logConsole(text, type = 'system') {
        const entry = document.createElement('div');
        entry.className = `log-entry log-${type}`;

        const time = new Date().toLocaleTimeString('ar-EG', { hour12: false });
        entry.innerHTML = `<span class="log-time">[${time}]</span> ${text}`;

        this.consoleBody.appendChild(entry);
        this.consoleBody.scrollTop = this.consoleBody.scrollHeight;
    }

    // Confetti Effect Generator for Win Celebration
    resizeConfetti() {
        this.confettiCanvas.width = window.innerWidth;
        this.confettiCanvas.height = window.innerHeight;
    }

    triggerConfetti() {
        const particles = [];
        const colors = ['#00FF87', '#FFE600', '#FFFFFF', '#00C865'];

        for (let i = 0; i < 90; i++) {
            particles.push({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                vx: (Math.random() - 0.5) * 16,
                vy: (Math.random() - 0.7) * 16,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 4,
                life: 1
            });
        }

        const render = () => {
            this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
            let alive = false;

            particles.forEach(p => {
                if (p.life > 0) {
                    alive = true;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.3; // Gravity
                    p.life -= 0.015;

                    this.confettiCtx.fillStyle = p.color;
                    this.confettiCtx.globalAlpha = Math.max(0, p.life);
                    this.confettiCtx.beginPath();
                    this.confettiCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    this.confettiCtx.fill();
                }
            });

            if (alive) {
                requestAnimationFrame(render);
            } else {
                this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
            }
        };

        render();
    }
}

// Initialize Application when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TicTacToeApp();
});
