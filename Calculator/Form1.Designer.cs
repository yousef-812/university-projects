namespace CalculatorApp;

partial class Form1
{
    /// <summary>
    ///  Required designer variable.
    /// </summary>
    private System.ComponentModel.IContainer components = null;

    /// <summary>
    ///  Clean up any resources being used.
    /// </summary>
    /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
    protected override void Dispose(bool disposing)
    {
        if (disposing && (components != null))
        {
            components.Dispose();
        }
        base.Dispose(disposing);
    }

    #region Windows Form Designer generated code

    /// <summary>
    ///  Required method for Designer support - do not modify
    ///  the contents of this method with the code editor.
    /// </summary>
    private void InitializeComponent()
    {
        lblUserInfo = new Label();
        txtDisplay = new TextBox();
        btnOne = new Button();
        btnTwo = new Button();
        btnThree = new Button();
        btnFour = new Button();
        btnFive = new Button();
        btnSix = new Button();
        btnSeven = new Button();
        btnEight = new Button();
        btnNine = new Button();
        btnZero = new Button();
        btnAdd = new Button();
        btnSub = new Button();
        btnMul = new Button();
        btnDiv = new Button();
        btnEqual = new Button();
        btnClear = new Button();
        SuspendLayout();
        // 
        // lblUserInfo
        // 
        lblUserInfo.AutoSize = true;
        lblUserInfo.Font = new Font("Segoe UI", 9F, FontStyle.Italic, GraphicsUnit.Point);
        lblUserInfo.ForeColor = Color.Gray;
        lblUserInfo.Location = new Point(12, 9);
        lblUserInfo.Name = "lblUserInfo";
        lblUserInfo.Size = new Size(250, 30);
        lblUserInfo.TabIndex = 17;
        lblUserInfo.Text = "Yousef Yousry Salama Taalip\nID: 42520008";
        lblUserInfo.TextAlign = ContentAlignment.MiddleCenter;
        // 
        // txtDisplay
        // 
        txtDisplay.BackColor = Color.FromArgb(45, 45, 48);
        txtDisplay.BorderStyle = BorderStyle.None;
        txtDisplay.Font = new Font("Segoe UI", 24F, FontStyle.Bold, GraphicsUnit.Point);
        txtDisplay.ForeColor = Color.White;
        txtDisplay.Location = new Point(12, 50);
        txtDisplay.Name = "txtDisplay";
        txtDisplay.ReadOnly = true;
        txtDisplay.Size = new Size(260, 43);
        txtDisplay.TabIndex = 0;
        txtDisplay.Text = "0";
        txtDisplay.TextAlign = HorizontalAlignment.Right;
        // 
        // btnOne
        // 
        btnOne.BackColor = Color.FromArgb(63, 63, 70);
        btnOne.FlatStyle = FlatStyle.Flat;
        btnOne.Font = new Font("Segoe UI", 14F, FontStyle.Regular, GraphicsUnit.Point);
        btnOne.ForeColor = Color.White;
        btnOne.Location = new Point(12, 110);
        btnOne.Name = "btnOne";
        btnOne.Size = new Size(60, 60);
        btnOne.TabIndex = 1;
        btnOne.Text = "1";
        btnOne.UseVisualStyleBackColor = false;
        btnOne.Click += Button_Click;
        // 
        // btnTwo
        // 
        btnTwo.BackColor = Color.FromArgb(63, 63, 70);
        btnTwo.FlatStyle = FlatStyle.Flat;
        btnTwo.Font = new Font("Segoe UI", 14F, FontStyle.Regular, GraphicsUnit.Point);
        btnTwo.ForeColor = Color.White;
        btnTwo.Location = new Point(78, 110);
        btnTwo.Name = "btnTwo";
        btnTwo.Size = new Size(60, 60);
        btnTwo.TabIndex = 2;
        btnTwo.Text = "2";
        btnTwo.UseVisualStyleBackColor = false;
        btnTwo.Click += Button_Click;
        // 
        // btnThree
        // 
        btnThree.BackColor = Color.FromArgb(63, 63, 70);
        btnThree.FlatStyle = FlatStyle.Flat;
        btnThree.Font = new Font("Segoe UI", 14F, FontStyle.Regular, GraphicsUnit.Point);
        btnThree.ForeColor = Color.White;
        btnThree.Location = new Point(144, 110);
        btnThree.Name = "btnThree";
        btnThree.Size = new Size(60, 60);
        btnThree.TabIndex = 3;
        btnThree.Text = "3";
        btnThree.UseVisualStyleBackColor = false;
        btnThree.Click += Button_Click;
        // 
        // btnAdd
        // 
        btnAdd.BackColor = Color.FromArgb(255, 128, 0);
        btnAdd.FlatStyle = FlatStyle.Flat;
        btnAdd.Font = new Font("Segoe UI", 14F, FontStyle.Bold, GraphicsUnit.Point);
        btnAdd.ForeColor = Color.White;
        btnAdd.Location = new Point(212, 110);
        btnAdd.Name = "btnAdd";
        btnAdd.Size = new Size(60, 60);
        btnAdd.TabIndex = 4;
        btnAdd.Text = "+";
        btnAdd.UseVisualStyleBackColor = false;
        btnAdd.Click += Operator_Click;
        // 
        // btnFour
        // 
        btnFour.BackColor = Color.FromArgb(63, 63, 70);
        btnFour.FlatStyle = FlatStyle.Flat;
        btnFour.Font = new Font("Segoe UI", 14F, FontStyle.Regular, GraphicsUnit.Point);
        btnFour.ForeColor = Color.White;
        btnFour.Location = new Point(12, 176);
        btnFour.Name = "btnFour";
        btnFour.Size = new Size(60, 60);
        btnFour.TabIndex = 5;
        btnFour.Text = "4";
        btnFour.UseVisualStyleBackColor = false;
        btnFour.Click += Button_Click;
        // 
        // btnFive
        // 
        btnFive.BackColor = Color.FromArgb(63, 63, 70);
        btnFive.FlatStyle = FlatStyle.Flat;
        btnFive.Font = new Font("Segoe UI", 14F, FontStyle.Regular, GraphicsUnit.Point);
        btnFive.ForeColor = Color.White;
        btnFive.Location = new Point(78, 176);
        btnFive.Name = "btnFive";
        btnFive.Size = new Size(60, 60);
        btnFive.TabIndex = 6;
        btnFive.Text = "5";
        btnFive.UseVisualStyleBackColor = false;
        btnFive.Click += Button_Click;
        // 
        // btnSix
        // 
        btnSix.BackColor = Color.FromArgb(63, 63, 70);
        btnSix.FlatStyle = FlatStyle.Flat;
        btnSix.Font = new Font("Segoe UI", 14F, FontStyle.Regular, GraphicsUnit.Point);
        btnSix.ForeColor = Color.White;
        btnSix.Location = new Point(144, 176);
        btnSix.Name = "btnSix";
        btnSix.Size = new Size(60, 60);
        btnSix.TabIndex = 7;
        btnSix.Text = "6";
        btnSix.UseVisualStyleBackColor = false;
        btnSix.Click += Button_Click;
        // 
        // btnSub
        // 
        btnSub.BackColor = Color.FromArgb(255, 128, 0);
        btnSub.FlatStyle = FlatStyle.Flat;
        btnSub.Font = new Font("Segoe UI", 14F, FontStyle.Bold, GraphicsUnit.Point);
        btnSub.ForeColor = Color.White;
        btnSub.Location = new Point(212, 176);
        btnSub.Name = "btnSub";
        btnSub.Size = new Size(60, 60);
        btnSub.TabIndex = 8;
        btnSub.Text = "-";
        btnSub.UseVisualStyleBackColor = false;
        btnSub.Click += Operator_Click;
        // 
        // btnSeven
        // 
        btnSeven.BackColor = Color.FromArgb(63, 63, 70);
        btnSeven.FlatStyle = FlatStyle.Flat;
        btnSeven.Font = new Font("Segoe UI", 14F, FontStyle.Regular, GraphicsUnit.Point);
        btnSeven.ForeColor = Color.White;
        btnSeven.Location = new Point(12, 242);
        btnSeven.Name = "btnSeven";
        btnSeven.Size = new Size(60, 60);
        btnSeven.TabIndex = 9;
        btnSeven.Text = "7";
        btnSeven.UseVisualStyleBackColor = false;
        btnSeven.Click += Button_Click;
        // 
        // btnEight
        // 
        btnEight.BackColor = Color.FromArgb(63, 63, 70);
        btnEight.FlatStyle = FlatStyle.Flat;
        btnEight.Font = new Font("Segoe UI", 14F, FontStyle.Regular, GraphicsUnit.Point);
        btnEight.ForeColor = Color.White;
        btnEight.Location = new Point(78, 242);
        btnEight.Name = "btnEight";
        btnEight.Size = new Size(60, 60);
        btnEight.TabIndex = 10;
        btnEight.Text = "8";
        btnEight.UseVisualStyleBackColor = false;
        btnEight.Click += Button_Click;
        // 
        // btnNine
        // 
        btnNine.BackColor = Color.FromArgb(63, 63, 70);
        btnNine.FlatStyle = FlatStyle.Flat;
        btnNine.Font = new Font("Segoe UI", 14F, FontStyle.Regular, GraphicsUnit.Point);
        btnNine.ForeColor = Color.White;
        btnNine.Location = new Point(144, 242);
        btnNine.Name = "btnNine";
        btnNine.Size = new Size(60, 60);
        btnNine.TabIndex = 11;
        btnNine.Text = "9";
        btnNine.UseVisualStyleBackColor = false;
        btnNine.Click += Button_Click;
        // 
        // btnMul
        // 
        btnMul.BackColor = Color.FromArgb(255, 128, 0);
        btnMul.FlatStyle = FlatStyle.Flat;
        btnMul.Font = new Font("Segoe UI", 14F, FontStyle.Bold, GraphicsUnit.Point);
        btnMul.ForeColor = Color.White;
        btnMul.Location = new Point(212, 242);
        btnMul.Name = "btnMul";
        btnMul.Size = new Size(60, 60);
        btnMul.TabIndex = 12;
        btnMul.Text = "*";
        btnMul.UseVisualStyleBackColor = false;
        btnMul.Click += Operator_Click;
        // 
        // btnClear
        // 
        btnClear.BackColor = Color.FromArgb(231, 76, 60);
        btnClear.FlatStyle = FlatStyle.Flat;
        btnClear.Font = new Font("Segoe UI", 14F, FontStyle.Bold, GraphicsUnit.Point);
        btnClear.ForeColor = Color.White;
        btnClear.Location = new Point(12, 308);
        btnClear.Name = "btnClear";
        btnClear.Size = new Size(60, 60);
        btnClear.TabIndex = 13;
        btnClear.Text = "C";
        btnClear.UseVisualStyleBackColor = false;
        btnClear.Click += Clear_Click;
        // 
        // btnZero
        // 
        btnZero.BackColor = Color.FromArgb(63, 63, 70);
        btnZero.FlatStyle = FlatStyle.Flat;
        btnZero.Font = new Font("Segoe UI", 14F, FontStyle.Regular, GraphicsUnit.Point);
        btnZero.ForeColor = Color.White;
        btnZero.Location = new Point(78, 308);
        btnZero.Name = "btnZero";
        btnZero.Size = new Size(60, 60);
        btnZero.TabIndex = 14;
        btnZero.Text = "0";
        btnZero.UseVisualStyleBackColor = false;
        btnZero.Click += Button_Click;
        // 
        // btnEqual
        // 
        btnEqual.BackColor = Color.FromArgb(39, 174, 96);
        btnEqual.FlatStyle = FlatStyle.Flat;
        btnEqual.Font = new Font("Segoe UI", 14F, FontStyle.Bold, GraphicsUnit.Point);
        btnEqual.ForeColor = Color.White;
        btnEqual.Location = new Point(144, 308);
        btnEqual.Name = "btnEqual";
        btnEqual.Size = new Size(60, 60);
        btnEqual.TabIndex = 15;
        btnEqual.Text = "=";
        btnEqual.UseVisualStyleBackColor = false;
        btnEqual.Click += Equal_Click;
        // 
        // btnDiv
        // 
        btnDiv.BackColor = Color.FromArgb(255, 128, 0);
        btnDiv.FlatStyle = FlatStyle.Flat;
        btnDiv.Font = new Font("Segoe UI", 14F, FontStyle.Bold, GraphicsUnit.Point);
        btnDiv.ForeColor = Color.White;
        btnDiv.Location = new Point(212, 308);
        btnDiv.Name = "btnDiv";
        btnDiv.Size = new Size(60, 60);
        btnDiv.TabIndex = 16;
        btnDiv.Text = "/";
        btnDiv.UseVisualStyleBackColor = false;
        btnDiv.Click += Operator_Click;
        // 
        // Form1
        // 
        AutoScaleDimensions = new SizeF(7F, 15F);
        AutoScaleMode = AutoScaleMode.Font;
        BackColor = Color.FromArgb(28, 28, 28);
        ClientSize = new Size(284, 381);
        Controls.Add(lblUserInfo);
        Controls.Add(btnDiv);
        Controls.Add(btnEqual);
        Controls.Add(btnZero);
        Controls.Add(btnClear);
        Controls.Add(btnMul);
        Controls.Add(btnNine);
        Controls.Add(btnEight);
        Controls.Add(btnSeven);
        Controls.Add(btnSub);
        Controls.Add(btnSix);
        Controls.Add(btnFive);
        Controls.Add(btnFour);
        Controls.Add(btnAdd);
        Controls.Add(btnThree);
        Controls.Add(btnTwo);
        Controls.Add(btnOne);
        Controls.Add(txtDisplay);
        FormBorderStyle = FormBorderStyle.FixedSingle;
        MaximizeBox = false;
        Name = "Form1";
        StartPosition = FormStartPosition.CenterScreen;
        Text = "Calculator";
        ResumeLayout(false);
        PerformLayout();
    }

    private Label lblUserInfo;
    private TextBox txtDisplay;
    private Button btnOne;
    private Button btnTwo;
    private Button btnThree;
    private Button btnFour;
    private Button btnFive;
    private Button btnSix;
    private Button btnSeven;
    private Button btnEight;
    private Button btnNine;
    private Button btnZero;
    private Button btnAdd;
    private Button btnSub;
    private Button btnMul;
    private Button btnDiv;
    private Button btnEqual;
    private Button btnClear;

    #endregion
}
