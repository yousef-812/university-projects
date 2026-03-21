namespace CalculatorApp;

public partial class Form1 : Form
{
    private double _currentValue = 0;
    private double _lastValue = 0;
    private string _operator = "";
    private bool _isOperatorClicked = false;

    public Form1()
    {
        InitializeComponent();
    }

    private void Button_Click(object sender, EventArgs e)
    {
        if (txtDisplay.Text == "0" || _isOperatorClicked)
        {
            txtDisplay.Clear();
        }

        _isOperatorClicked = false;
        Button button = (Button)sender;
        txtDisplay.Text += button.Text;
    }

    private void Operator_Click(object sender, EventArgs e)
    {
        Button button = (Button)sender;
        _operator = button.Text;
        _lastValue = double.Parse(txtDisplay.Text);
        _isOperatorClicked = true;
    }

    private void Clear_Click(object sender, EventArgs e)
    {
        txtDisplay.Text = "0";
        _lastValue = 0;
        _currentValue = 0;
        _operator = "";
        _isOperatorClicked = false;
    }

    private void Equal_Click(object sender, EventArgs e)
    {
        _currentValue = double.Parse(txtDisplay.Text);

        switch (_operator)
        {
            case "+":
                txtDisplay.Text = (_lastValue + _currentValue).ToString();
                break;
            case "-":
                txtDisplay.Text = (_lastValue - _currentValue).ToString();
                break;
            case "*":
                txtDisplay.Text = (_lastValue * _currentValue).ToString();
                break;
            case "/":
                if (_currentValue != 0)
                    txtDisplay.Text = (_lastValue / _currentValue).ToString();
                else
                    txtDisplay.Text = "Error";
                break;
            default:
                break;
        }
        _isOperatorClicked = true;
    }
}
