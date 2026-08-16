"""
================================================================================
  لعبة X-O (Tic-Tac-Toe) | التصميم الاحترافي باللونين الأخضر والأصفر
  تطبيق عملي لمفاهيم الذكاء الاصطناعي: PEAS & ODESDA Frameworks
================================================================================
"""

import sys
import math
import random
import tkinter as tk
from tkinter import messagebox

# ==============================================================================
# 1. بيئة اللعبة (Game State)
# ==============================================================================
class TicTacToeBoard:
    def __init__(self):
        self.board = [0] * 9
        self.current_player = 1

    def reset(self):
        self.board = [0] * 9
        self.current_player = 1

    def is_valid_move(self, index):
        return 0 <= index < 9 and self.board[index] == 0

    def get_available_moves(self):
        return [i for i, cell in enumerate(self.board) if cell == 0]

    def make_move(self, index, player):
        if self.is_valid_move(index):
            self.board[index] = player
            return True
        return False

    def undo_move(self, index):
        self.board[index] = 0

    def check_winner(self):
        win_patterns = [
            (0, 1, 2), (3, 4, 5), (6, 7, 8),
            (0, 3, 6), (1, 4, 7), (2, 5, 8),
            (0, 4, 8), (2, 4, 6)
        ]

        for a, b, c in win_patterns:
            if self.board[a] != 0 and self.board[a] == self.board[b] == self.board[c]:
                return {"winner": self.board[a], "pattern": (a, b, c)}

        if 0 not in self.board:
            return {"winner": 0}  # Draw

        return None


# ==============================================================================
# 2. العميل الذكي (AI PEAS Agent)
# ==============================================================================
class PEASAgent:
    def __init__(self, ai_player=2, difficulty="Impossible"):
        self.ai_player = ai_player
        self.human_player = 1 if ai_player == 2 else 2
        self.difficulty = difficulty

    def get_best_move(self, board_obj):
        available_moves = board_obj.get_available_moves()
        if not available_moves:
            return None, ["لا توجد حركات متاحة."]

        thinking_logs = []
        thinking_logs.append("🔍 [Sensors]: رصد الخلايا المتاحة في الرقعة...")
        thinking_logs.append(f"📌 قائمة الخانات الفاضية: {available_moves}")
        thinking_logs.append(f"⚙️ مستوى الصعوبة: {self.difficulty}")

        if self.difficulty == "Easy":
            move = random.choice(available_moves)
            thinking_logs.append(f"🎲 [Decision]: عشوائي (مستوى سهل) ⬅️ الخلية {move}")
            return move, thinking_logs

        if self.difficulty == "Medium" and random.random() < 0.5:
            move = random.choice(available_moves)
            thinking_logs.append(f"⚖️ [Decision]: حرة متوسطة ⬅️ الخلية {move}")
            return move, thinking_logs

        thinking_logs.append("🧠 [Minimax]: بدء حساب شجرة التقييم للخيارات...")
        best_score = -math.inf
        best_move = None

        for move in available_moves:
            row, col = move // 3 + 1, move % 3 + 1
            board_obj.make_move(move, self.ai_player)
            score = self._minimax(board_obj, depth=0, is_maximizing=False)
            board_obj.undo_move(move)

            desc = "فوز مؤكد 🏆" if score > 0 else "خسارة ⚠️" if score < 0 else "تعادل مضمون 🛡️"
            thinking_logs.append(f"  ├─ الخلية {move} (صف {row}, عمود {col}) ⬅️ التقييم: {score} ({desc})")

            if score > best_score:
                best_score = score
                best_move = move

        row, col = best_move // 3 + 1, best_move % 3 + 1
        thinking_logs.append("--------------------------------------------------")
        thinking_logs.append(f"💡 [Final Decision]: اختيار الخلية {best_move} (صف {row}, عمود {col}) أعلى درجة = {best_score}")

        return best_move, thinking_logs

    def _minimax(self, board_obj, depth, is_maximizing):
        res = board_obj.check_winner()
        if res:
            if res["winner"] == self.ai_player:
                return 10 - depth
            elif res["winner"] == self.human_player:
                return depth - 10
            elif res["winner"] == 0:
                return 0

        if is_maximizing:
            best_score = -math.inf
            for move in board_obj.get_available_moves():
                board_obj.make_move(move, self.ai_player)
                score = self._minimax(board_obj, depth + 1, False)
                board_obj.undo_move(move)
                best_score = max(score, best_score)
            return best_score
        else:
            best_score = math.inf
            for move in board_obj.get_available_moves():
                board_obj.make_move(move, self.human_player)
                score = self._minimax(board_obj, depth + 1, True)
                board_obj.undo_move(move)
                best_score = min(score, best_score)
            return best_score


# ==============================================================================
# 3. الواجهة الرسومية المحترفة (Green & Yellow Theme)
# ==============================================================================
class TicTacToeGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("لعبة X-O الاحترافية | الأخضر والأسود والأصفر")
        self.root.geometry("960x660")
        self.root.resizable(False, False)
        self.root.configure(bg="#0A0E14")

        self.board_obj = TicTacToeBoard()
        self.ai_agent = PEASAgent(ai_player=2, difficulty="Impossible")
        self.scores = {"Human": 0, "AI": 0, "Draws": 0}

        self.create_widgets()

    def create_widgets(self):
        # 1. Header
        header = tk.Frame(self.root, bg="#0A0E14")
        header.pack(fill=tk.X, pady=(15, 5))

        title = tk.Label(
            header,
            text="❌ X & O | الذكاء الاصطناعي الاحترافي ⭕",
            font=("Segoe UI", 18, "bold"),
            bg="#0A0E14", fg="#00FF87"
        )
        title.pack()

        subtitle = tk.Label(
            header,
            text="تصميم متألق باللونين الأخضر والأصفر مع شاشة محاكاة التفكير المباشرة",
            font=("Segoe UI", 10, "italic"),
            bg="#0A0E14", fg="#FFE600"
        )
        subtitle.pack()

        # 2. Main Layout
        container = tk.Frame(self.root, bg="#0A0E14")
        container.pack(fill=tk.BOTH, expand=True, padx=15, pady=10)

        # Left Panel (Game)
        left_panel = tk.Frame(container, bg="#121A16", bd=1, relief="solid")
        left_panel.pack(side=tk.LEFT, fill=tk.BOTH, expand=False, padx=(0, 10), pady=5)

        # Difficulty Bar
        diff_frame = tk.Frame(left_panel, bg="#1B2822", padx=8, pady=4)
        diff_frame.pack(fill=tk.X, padx=10, pady=10)

        tk.Label(diff_frame, text="المستوى:", font=("Segoe UI", 9, "bold"), bg="#1B2822", fg="#FFE600").pack(side=tk.LEFT, padx=3)

        self.diff_var = tk.StringVar(value="Impossible")
        options = [("سهل 🎲", "Easy"), ("متوسط ⚖️", "Medium"), ("مستحيل 🧠", "Impossible")]

        for text, val in options:
            rb = tk.Radiobutton(
                diff_frame, text=text, value=val, variable=self.diff_var,
                command=self.change_difficulty, font=("Segoe UI", 8, "bold"),
                bg="#1B2822", fg="#00FF87", selectcolor="#054A29", activebackground="#1B2822"
            )
            rb.pack(side=tk.LEFT, padx=2)

        # Score Label
        self.score_label = tk.Label(
            left_panel,
            text="الإنسان: 0   |   الذكاء الاصطناعي: 0   |   التعادل: 0",
            font=("Segoe UI", 10, "bold"),
            bg="#08100C", fg="#00FF87", pady=6
        )
        self.score_label.pack(fill=tk.X, padx=10, pady=5)

        # Board Grid (3x3)
        grid_frame = tk.Frame(left_panel, bg="#121A16")
        grid_frame.pack(pady=10, padx=15)

        self.buttons = []
        for i in range(9):
            row = i // 3
            col = i % 3
            btn = tk.Button(
                grid_frame,
                text="",
                font=("Segoe UI", 26, "bold"),
                width=4,
                height=1,
                bg="#1B2822",
                fg="#00FF87",
                activebackground="#253830",
                relief="flat",
                bd=0,
                command=lambda idx=i: self.on_button_click(idx)
            )
            btn.grid(row=row, column=col, padx=5, pady=5)
            self.buttons.append(btn)

        # Status
        self.status_label = tk.Label(
            left_panel,
            text="دورك الآن! اختر خلية (X)",
            font=("Segoe UI", 10, "bold"),
            bg="#121A16", fg="#00FF87"
        )
        self.status_label.pack(pady=5)

        # Reset Button
        reset_btn = tk.Button(
            left_panel,
            text="🔄 جولة جديدة",
            font=("Segoe UI", 10, "bold"),
            bg="#FFE600", fg="#05140C",
            activebackground="#E6D000",
            relief="flat", padx=15, pady=5,
            command=self.reset_game
        )
        reset_btn.pack(pady=(0, 10))

        # Right Panel (Console)
        right_panel = tk.Frame(container, bg="#08100C", bd=1, relief="solid")
        right_panel.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, pady=5)

        console_title_frame = tk.Frame(right_panel, bg="#121A16", pady=6, padx=10)
        console_title_frame.pack(fill=tk.X)

        tk.Label(
            console_title_frame,
            text="💻 سجل تفكير الذكاء الاصطناعي (AI Thought Console)",
            font=("Consolas", 10, "bold"),
            bg="#121A16", fg="#FFE600"
        ).pack(side=tk.LEFT)

        text_frame = tk.Frame(right_panel, bg="#08100C")
        text_frame.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)

        self.console_text = tk.Text(
            text_frame,
            font=("Consolas", 9),
            bg="#08100C",
            fg="#00FF87",
            insertbackground="white",
            wrap=tk.WORD,
            relief="flat",
            bd=0
        )
        self.console_text.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

        scrollbar = tk.Scrollbar(text_frame, command=self.console_text.yview)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.console_text.config(yscrollcommand=scrollbar.set)

        self.log_to_console("=== مرحباً بك في واجهة تفكير الذكاء الاصطناعي الخضراء والشاطرة ===")
        self.log_to_console("جميع العمليات وحسابات شجرة Minimax ومستشعرات PEAS تعرض هنا بشكل مباشر.\n")

    def change_difficulty(self):
        self.ai_agent.difficulty = self.diff_var.get()
        self.log_to_console(f"⚙️ تم تغيير مستوى الصعوبة إلى: {self.diff_var.get()}")

    def log_to_console(self, msg):
        self.console_text.insert(tk.END, msg + "\n")
        self.console_text.see(tk.END)

    def on_button_click(self, index):
        if self.board_obj.current_player == 1 and self.board_obj.is_valid_move(index):
            row, col = index // 3 + 1, index % 3 + 1
            self.log_to_console(f"👤 [Human]: لعب الإنسان (X) في الخلية {index} (صف {row}, عمود {col})")
            
            self.make_move(index, player=1)
            
            res = self.board_obj.check_winner()
            if res:
                self.end_game(res)
                return

            self.board_obj.current_player = 2
            self.status_label.config(text="الذكاء الاصطناعي يفكر... 🧠", fg="#FFE600")
            self.root.update_idletasks()

            self.root.after(350, self.ai_turn)

    def ai_turn(self):
        self.log_to_console("\n--------------------------------------------------")
        self.log_to_console("🤖 [AI Turn]: تحليل النقلة عبر شجرة القرارات...")
        
        best_move, thinking_logs = self.ai_agent.get_best_move(self.board_obj)

        for log in thinking_logs:
            self.log_to_console(log)

        if best_move is not None:
            self.make_move(best_move, player=2)
            
            res = self.board_obj.check_winner()
            if res:
                self.end_game(res)
                return

            self.board_obj.current_player = 1
            self.status_label.config(text="دورك الآن! اختر خلية (X)", fg="#00FF87")

    def make_move(self, index, player):
        self.board_obj.make_move(index, player)
        symbol = "X" if player == 1 else "O"
        color = "#00FF87" if player == 1 else "#FFE600"
        
        self.buttons[index].config(text=symbol, fg=color, state=tk.DISABLED, bg="#121A16")

    def end_game(self, res):
        for btn in self.buttons:
            btn.config(state=tk.DISABLED)

        winner = res["winner"]
        if "pattern" in res:
            for idx in res["pattern"]:
                self.buttons[idx].config(bg="#054A29")

        self.log_to_console("\n==================================================")
        if winner == 1:
            self.scores["Human"] += 1
            msg = "مبارك! لقد فزت على الذكاء الاصطناعي! 🎉"
            color = "#00FF87"
            self.log_to_console("🏆 فوز الإنسان!")
        elif winner == 2:
            self.scores["AI"] += 1
            msg = "فاز الذكاء الاصطناعي! 🧠🤖"
            color = "#FFE600"
            self.log_to_console("🤖 فوز الذكاء الاصطناعي!")
        else:
            self.scores["Draws"] += 1
            msg = "تعادل ممتاز! لا يوجد فائز 🤝"
            color = "#FFE600"
            self.log_to_console("🤝 تعادل!")
        self.log_to_console("==================================================\n")

        self.status_label.config(text=msg, fg=color)
        self.score_label.config(
            text=f"الإنسان: {self.scores['Human']}   |   الذكاء الاصطناعي: {self.scores['AI']}   |   التعادل: {self.scores['Draws']}"
        )

    def reset_game(self):
        self.board_obj.reset()
        for btn in self.buttons:
            btn.config(text="", state=tk.NORMAL, bg="#1B2822", fg="#00FF87")
        self.status_label.config(text="دورك الآن! اختر خلية (X)", fg="#00FF87")
        self.log_to_console("🔄 تم بدء جولة جديدة!")


if __name__ == "__main__":
    root = tk.Tk()
    app = TicTacToeGUI(root)
    root.mainloop()
