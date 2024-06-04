const screenSmall = document.getElementById('small-screen');
const screenMain = document.getElementById('main-screen');
const resetButton = document.getElementById('reset-btn');
const backButton = document.getElementById('back-btn');
const dotButton = document.getElementById('dot-btn');
const equalButton = document.getElementById('equal-btn');
const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');

//Declare Variables
const MAX_DISPLAY_LENGTH = 11;
let currentOperand = '';
let previousOperand = '';
let operator = '';
let resultDisplayed = false;

//Declare Basic Operations
const add = (a,b) => a+b;
const subtract = (a,b) => a-b;
const multiply = (a,b) => a*b;
const divide = (a,b) => (b !==0 ? a/b : NaN);

//Function to perform the calculation
function operate(a, b, operator){
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+': return add(a,b);
        case '-': return subtract(a,b);
        case 'x': return multiply(a,b);
        case '/': return divide(a,b);
        default: return NaN;
    }
};

//Format th number for display 
function formatNumber(num){
    const numStr = num.toString();
    if(numStr.length > MAX_DISPLAY_LENGTH){
        const scientificNotation = parseFloat(num).toExponential(5);
        return scientificNotation;
    };
    return numStr;
};
//Update the display
function updateDisplay(){
    screenMain.textContent = formatNumber(currentOperand);
    screenSmall.textContent = `${previousOperand} ${operator}`;

};

function handleResetClick(){
    currentOperand='';
    previousOperand = '';
    operator = '';
    resultDisplayed = false;
    updateDisplay();
};
function handleBackClick(){
    currentOperand = currentOperand.slice(0,-1);
    updateDisplay();

};

function manageVariablesIfResultDisplayed(){
    if(resultDisplayed){
        if(operator){
            previousOperand = currentOperand;
            currentOperand = '';

        }else{
            previousOperand = '';
            currentOperand = '';

        };
    resultDisplayed = false;
        };
    }
    
    function handleNumberClick(val){
        manageVariablesIfResultDisplayed()
        currentOperand += val;
        updateDisplay();
    };
   //Handle dot click, by adding ',' if it does not exist already.

   function handleDotClick(){
    manageVariablesIfResultDisplayed();
    if(currentOperand.includes('.')) return;
    currentOperand += currentOperand ? '.' : '0.';
    updateDisplay();
   };

    function handleOperatorClick(val){
        if(!currentOperand && !previousOperand) return;
    
    
    // If we have a previous operand and we press a operator, update the operator variables
    if(!currentOperand && previousOperand){
        operator = val;
        updateDisplay()
        return;
    };

    //If we have current operand but not a previous one
    if(!previousOperand){
        previousOperand = currentOperand;
        currentOperand = '';
        operator = val;
        updateDisplay();
        resultDisplayed = false;
    }else{
        currentOperand = operate(previousOperand, currentOperand, operator).toString();
        previousOperand = '';
        //Temporarily empty the operator to not include it in the small display
        operator = '';
        updateDisplay();

        operator = val;
        //Update the flag as the main display, displays a result now
        resultDisplayed = true;
    };
};

function handleEqualClick(){
    // If something is missing return
    if(!currentOperand || !previousOperand || !operator) return;
    currentOperand = operate(previousOperand, currentOperand, operator).toString();
    previousOperand = '';
    operator = '';
    updateDisplay();
    resultDisplayed = true;
};

//Add the Event Listeners
dotButton.addEventListener('click', handleDotClick);
backButton.addEventListener('click', handleBackClick);
resetButton.addEventListener('click', handleResetClick);
equalButton.addEventListener('click', handleEqualClick);

numberButtons.forEach(btn => {
    btn.addEventListener('click', (e) => handleNumberClick(e.target.textContent))
})
operatorButtons.forEach(btn => {
btn.addEventListener('click', (e) => handleOperatorClick(e.target.textContent));
})

