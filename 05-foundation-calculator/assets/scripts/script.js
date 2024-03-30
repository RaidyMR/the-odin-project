const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, a, b) => {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

const display = document.querySelector('.display-input');
const buttons = document.querySelectorAll('.button');
let DISPLAY = '0';
let OPERATOR = '';
let FIRST_NUMBER = '';
let RESULT = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === 'C') {
            DISPLAY = '0';
            display.textContent = DISPLAY;
        } else if (button.textContent === 'AC') {
            if (DISPLAY.length === 1) {
                DISPLAY = '0';
            } else {
                DISPLAY = DISPLAY.slice(0, -1);
            }   
            display.textContent = DISPLAY;
        } else if (button.textContent === '=') {
            if (OPERATOR !== '' && FIRST_NUMBER !== '') {
                RESULT = operate(OPERATOR, parseFloat(FIRST_NUMBER), parseFloat(DISPLAY));
                OPERATOR = '';
                FIRST_NUMBER = '';
                DISPLAY = RESULT.toString();
                display.textContent = DISPLAY;
            }
        }
        else if (
            button.textContent === '+' || 
            button.textContent === '-' || 
            button.textContent === '*' || 
            button.textContent === '/' 
        ) {
            if (OPERATOR === '') {
                OPERATOR = button.textContent;
                FIRST_NUMBER = DISPLAY;
                DISPLAY = '0';
            } else {
                RESULT = operate(OPERATOR, parseFloat(FIRST_NUMBER), parseFloat(DISPLAY));
                OPERATOR = button.textContent;
                FIRST_NUMBER = RESULT;
                DISPLAY = '0';
                display.textContent = RESULT;
            }
        } else if (button.textContent === '.') {
            if (!DISPLAY.includes('.')) {
                DISPLAY += button.textContent;
                display.textContent = DISPLAY;
            }
        } else if (button.textContent === '+/-') {
            DISPLAY = (parseFloat(DISPLAY) * -1).toString();
            display.textContent = DISPLAY;
        } else {
            if (DISPLAY === '0') {
                DISPLAY = '';
            }
            DISPLAY += button.textContent;
            display.textContent = DISPLAY;
        }
    });
});
