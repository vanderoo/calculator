const calculateUrl = 'https://calculate-pmxtgiyy7a-uc.a.run.app';
const display = document.getElementById('display');

let currentOperator = '';

function appendChar(character) {
    if (isOperator(character)) {
        if (currentOperator) {
            display.value = display.value.slice(0, -1);
        }
        currentOperator = character;
    } else {
        currentOperator = '';
    }
    display.value += character;
}

function isOperator(character) {
    return ['+', '-', '*', '/'].includes(character);
}

function clearDisplay() {
    display.value = '';
    currentOperator = '';
}

function deleteChar() {
    const lastChar = display.value.slice(-1);
    if (isOperator(lastChar)) {
        currentOperator = '';
    }
    display.value = display.value.slice(0, -1);
}

function calculate() {
    const data = {
        expression: display.value
    };
    fetch(calculateUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.error || `response status: ${response.status}`);
            });
        }
        return response.json();
    })
    .then(data => {
        display.value = data.result;
        currentOperator = '';
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        alert(`Error: ${error.message}`);
        display.value = '';
        currentOperator = '';
    });
}
