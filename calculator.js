/*
manipulacion del DOM
*/

//creo los 9 botones del cuadrado en bucle
const divButtons = document.getElementById("divNumbers");
divButtons.style.display = "grid";
let number = 0
let secondOperand = false;
let postResult = false;
let multipleOp = false;
let pulsedNumbers = "";
let pulsedNumbersSecond = "";
let operator = "";
for (let a = 3; a > 0; a--) {
    for (let b = 1; b < 4; b++) {
        number = number + 1;
        const divButton = document.createElement("button");
        divButton.textContent = number;
        divButton.style.gridArea = a, a + 1, b, b + 1;
        divButton.style.margin = "5px"
        divButton.addEventListener("click", function () {
            if (postResult) {
                displayClean();
                postResult = false;
            }
            displayButton(divButton);
            //si se pulsa antes de un simbolo de operacion
            if (!secondOperand) {
                pulsedNumbers = pulsedNumbers + divButton.textContent;
            }
            else {
                pulsedNumbersSecond = pulsedNumbersSecond + divButton.textContent;
            }

        })
        divButtons.appendChild(divButton);
    }
}

//boton del 0 que no se puede en el bucle
const divButton = document.createElement("button");
divButton.textContent = 0;
divButton.style.gridArea = 4, 5, 1, 2;
divButton.style.margin = "5px"
divButton.addEventListener("click", function () {
    if (postResult) {
        displayClean();
        postResult = false;
    }
    displayButton(divButton);
    //si se pulsa antes de un simbolo de operacion
    if (!secondOperand) {
        pulsedNumbers = pulsedNumbers + divButton.textContent;
    }
    else {
        pulsedNumbersSecond = pulsedNumbersSecond + divButton.textContent;
    }

})
divButtons.appendChild(divButton);


//boton de la , ""
const divButton2 = document.createElement("button");
divButton2.textContent = ".";
divButton2.style.gridArea = 4, 5, 2, 3;
divButton2.style.margin = "5px"
divButton2.addEventListener("click", function () {
    displayButton(divButton2);
    //si se pulsa antes de un simbolo de operacion
    if (!secondOperand) {
        pulsedNumbers = pulsedNumbers + divButton2.textContent;
    }
    else {
        pulsedNumbersSecond = pulsedNumbersSecond + divButton2.textContent;
    }
})
divButtons.appendChild(divButton2);



//boton de clear ""
const divButton3 = document.createElement("button");
divButton3.textContent = "C";
divButton3.style.gridArea = 4, 5, 3, 4;
divButton3.style.margin = "5px"
divButton3.addEventListener("click", function () {
    displayClean();
    cleanParameters();
})
divButtons.appendChild(divButton3);


//boton de igual quee lo anado fuera del div grid para que ocupe todo el ancho
const divButton4 = document.createElement("button");
divButton4.textContent = "=";
divButton4.style.gridArea = 5, 6, 1, 4;
divButton4.style.margin = "5px"
divButton4.addEventListener("click", function () {
    let operation = createOperation(pulsedNumbers, operator, pulsedNumbersSecond);
    let result = operate(operation);
    if(result){
        displayResult(result);
    }
    cleanParameters();
    postResult = true;
})
document.getElementById("divMain").appendChild(divButton4);

//listeners de botones del html
document.getElementById("plusButton").addEventListener("click", function () {
    displayButton(document.getElementById("plusButton"));
    if (!secondOperand) {
        operator = "+";
        secondOperand = true;
    }
    else {
        let operation = createOperation(pulsedNumbers, operator, pulsedNumbersSecond);
        cleanParameters();
        pulsedNumbers = operate(operation);
        operator = operator = "+";
        secondOperand = true;
    }
})

document.getElementById("subButton").addEventListener("click", function () {
    displayButton(document.getElementById("subButton"));
    if (!secondOperand) {
        operator = "-";
        secondOperand = true;
    }
    else {
        let operation = createOperation(pulsedNumbers, operator, pulsedNumbersSecond);
        cleanParameters();
        pulsedNumbers = operate(operation);
        operator = operator = "-";
        secondOperand = true;
    }
})

document.getElementById("mulButton").addEventListener("click", function () {
    displayButton(document.getElementById("mulButton"));
    if (!secondOperand) {
        operator = "*";
        secondOperand = true;
    }
    else {
        let operation = createOperation(pulsedNumbers, operator, pulsedNumbersSecond);
        cleanParameters();
        pulsedNumbers = operate(operation);
        operator = operator = "*";
        secondOperand = true;
    }
})

document.getElementById("divButton").addEventListener("click", function () {
    displayButton(document.getElementById("divButton"));
    if (!secondOperand) {
        operator = "/";
        secondOperand = true;
    }
    else {
        let operation = createOperation(pulsedNumbers, operator, pulsedNumbersSecond);
        cleanParameters();
        pulsedNumbers = operate(operation);
        operator = operator = "/";
        secondOperand = true;
    }
})

/*

*/

//funcion que actualiza el resultado de la calculadora
function displayButton(buttonValue) {
    const textDisplay = document.getElementById("textDisplay");
    if (textDisplay.textContent == "0") {
        textDisplay.textContent = buttonValue.textContent;
    }
    else {
        textDisplay.textContent = textDisplay.textContent + buttonValue.textContent;
    }
}

//funcion para mostrar unn string como resultado
function displayResult(value) {
    const textDisplay = document.getElementById("textDisplay");
    textDisplay.textContent = value;
}


//funcion para limpiar la pantalla
function displayClean() {
    const textDisplay = document.getElementById("textDisplay");
    textDisplay.textContent = "0";
}

//limpieza de parametros de anterior consulta
function cleanParameters() {
    secondOperand = false;
    pulsedNumbers = "";
    pulsedNumbersSecond = "";
    operator = "";
}

//objeto de la operacion
function createOperation(op1, operator, op2) {
    return {
        firstOp: parseFloat(op1),
        operator: operator,
        secondOp: parseFloat(op2),
    }
}

function operate(operation) {
    switch (operation.operator) {
        case ("+"): {
            return plus(operation);
            break;
        }
        case ("-"): {
            return sub(operation);
            break;
        }
        case ("*"): {
            return mul(operation);
            break;
        }
        case ("/"): {
            return div(operation);
            break;
        }
    }
}


//funcion suma
function plus(operation) {
    return operation.firstOp + operation.secondOp;
}

//funcion resta
function sub(operation) {
    return operation.firstOp - operation.secondOp;
}

//funcion multiplicacion
function mul(operation) {
    return operation.firstOp * operation.secondOp;
}

//funcion division
function div(operation) {
    if (operation.secondOp == 0) {
        displayResult(div0);
    }
    else
        return operation.firstOp / operation.secondOp;
}

//Strings de errores
let div0 = "error division entre 0";