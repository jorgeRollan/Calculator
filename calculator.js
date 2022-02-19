/*
manipulacion del DOM
*/

//creo los 9 botones del cuadrado en bucle
const divButtons = document.getElementById("divNumbers");
divButtons.style.display = "grid";
let number = 0
let prevValueIsNumber = false;
let secondOperand = false;
let postResult = false;
let multipleOp = false;

let pulsedNumbers = "";
let pulsedNumbersSecond = "";
let operator = "";
let operations = []
let operation = {}
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
                if (!operation.firstOp) {
                    operation.firstOp = divButton.textContent;
                }
                else
                    operation.firstOp = operation.firstOp + divButton.textContent;
            }
            else {
                if (!operation.secondOp) {
                    operation.secondOp = divButton.textContent;
                }
                else {
                    operation.secondOp = operation.secondOp + divButton.textContent;
                }
            }
            prevValueIsNumber = true;
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
        if (!operation.firstOp) {
            operation.firstOp = divButton.textContent;
        }
        else
            operation.firstOp = operation.firstOp + divButton.textContent;
    }
    else {
        if (!operation.secondOp) {
            operation.secondOp = divButton.textContent;
        }
        else {
            operation.secondOp = operation.secondOp + divButton.textContent;
        }
    }

})
divButtons.appendChild(divButton);



//boton de la , ""
const divButton2 = document.createElement("button");
divButton2.textContent = ".";
divButton2.style.gridArea = 4, 5, 2, 3;
divButton2.style.margin = "5px";
function clickFun(event) {
    if (operation.firstOp && !secondOperand) {
        operation.firstOp = operation.firstOp + divButton2.textContent;
        displayButton(divButton2);
    }

    if(operation.secondOp && secondOperand){
        operation.secondOp = operation.secondOp + divButton2.textContent;
        displayButton(divButton2);
    }
    enableDotButton(true);
}
divButton2.addEventListener("click", clickFun, true);
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
divButton4.style.margin = "5px";
divButton4.style.background = "green";
divButton4.addEventListener("click", function () {
    operations.push(operation);
    operate(operations[operations.length - 1]);
    if (operations[operations.length - 1].result != null) {
        displayResult(Math.round((operations[operations.length - 1].result + Number.EPSILON) * 100) / 100);
    }

    cleanParameters();
    postResult = true;
})
document.getElementById("divMain").appendChild(divButton4);


//boton de igual quee lo anado fuera del div grid para que ocupe todo el ancho
const divButton5 = document.createElement("button");
divButton5.textContent = "<-";
divButton5.style.gridArea = 5, 6, 1, 4;
divButton5.style.margin = "5px";
divButton5.style.background = "red";
divButton5.addEventListener("click", function () {
    let actualOp = operation;
    if (actualOp.secondOp && actualOp.secondOp != "") {
        actualOp.secondOp = actualOp.secondOp.slice(0, -1);
        const textDisplay = document.getElementById("textDisplay");
        let a = textDisplay.textContent.slice(0, -1);
        textDisplay.textContent = a;
        if(actualOp.secondOp==""){
            prevValueIsNumber=false;
        }
    }
    else if (actualOp.operator &&actualOp.operator != "") {
        actualOp.operator = "";
        const textDisplay = document.getElementById("textDisplay");
        let a = textDisplay.textContent.slice(0, -1);
        textDisplay.textContent = a;
        prevValueIsNumber = true;
    }
    else {
        if (operations.length > 0) {
            operation=operations.pop();
            operation.secondOp = actualOp.secondOp.slice(0, -1);
            operation.result=null;
            const textDisplay = document.getElementById("textDisplay");
            let a = textDisplay.textContent.slice(0, -1);
            textDisplay.textContent = a;
        }

        else if (actualOp.firstOp != "") {
            actualOp.firstOp = actualOp.firstOp.slice(0, -1);
            const textDisplay = document.getElementById("textDisplay");
            let a = textDisplay.textContent.slice(0, -1);
            textDisplay.textContent = a;
            secondOperand = false;
            if (actualOp.firstOp == "") {
                textDisplay.textContent = "0";
                prevValueIsNumber=false;
            }
        }
    }
})
document.getElementById("divMain").appendChild(divButton5);

//listeners de botones del html
document.getElementById("plusButton").addEventListener("click", function () {
    if (prevValueIsNumber) {
        displayButton(document.getElementById("plusButton"));
        if (!secondOperand) {
            operation.operator = "+";
            secondOperand = true;
            prevValueIsNumber = false;
        }
        else {
            prevValueIsNumber = false;;
            operate(operation);
            let a = Object.assign({}, operation);
            operations.push(a);
            let result = operation.result;
            operation.secondOp = "";
            operation.firstOp = result;
            operation.operator = "+";
            secondOperand = true;
        }
        enableDotButton(true);
    }
})

document.getElementById("subButton").addEventListener("click", function () {
    if (prevValueIsNumber) {
        displayButton(document.getElementById("subButton"));
        if (!secondOperand) {
            operation.operator = "-";
            secondOperand = true;
            prevValueIsNumber = false;
        }
        else {
            prevValueIsNumber = false;;
            operate(operation);
            operations.push(operation);
            let result = operation.result;
            operation.secondOp = "";
            operation.firstOp = result;
            operation.operator = "-";
            secondOperand = true;
        }
        enableDotButton(true);
    }
})

document.getElementById("mulButton").addEventListener("click", function () {
    if (prevValueIsNumber) {
        displayButton(document.getElementById("mulButton"));
        if (!secondOperand) {
            operation.operator = "*";
            secondOperand = true;
            prevValueIsNumber = false;
        }
        else {
            prevValueIsNumber = false;;
            operate(operation);
            operations.push(operation);
            let result = operation.result;
            operation.secondOp = "";
            operation.firstOp = result;
            operation.operator = "*";
            secondOperand = true;
        }
        enableDotButton(true);
    }
})

document.getElementById("divButton").addEventListener("click", function () {
    enableDotButton(true);
    if (prevValueIsNumber) {
        displayButton(document.getElementById("divButton"));
        if (!secondOperand) {
            operation.operator = "/";
            secondOperand = true;
            prevValueIsNumber = false;
        }
        else {
            prevValueIsNumber = false;;
            operate(operation);
            operations.push(operation);
            let result = operation.result;
            operation.secondOp = "";
            operation.firstOp = result;
            operation.operator = "/";
            secondOperand = true;
        }
        enableDotButton(true);
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
    prevValueIsNumber = false;
    secondOperand = false;
    operations = [];
    operation = {};
}

//objeto de la operacion
function createOperation(op1, operator, op2) {
    return {
        firstOp: parseFloat(op1),
        operator: operator,
        secondOp: parseFloat(op2),
    }
}

function enableDotButton(on) {
    if (on) {
        divButton2.addEventListener("click", clickFun, true)
    }
    else {
        divButton2.removeEventListener("click", clickFun, true)
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
    operation.result = Number(operation.firstOp) + Number(operation.secondOp);
}

//funcion resta
function sub(operation) {
    operation.result = Number(operation.firstOp) - Number(operation.secondOp);
}

//funcion multiplicacion
function mul(operation) {
    operation.result = Number(operation.firstOp) * Number(operation.secondOp);
}

//funcion division
function div(operation) {
    if (operation.secondOp == 0) {
        displayResult(div0);
        operation.result = null;
    }
    else
        operation.result = Number(operation.firstOp) / Number(operation.secondOp);;
}

//Strings de errores
let div0 = "error division entre 0";
let moreThanOneDot = "Mas de 1 . en operando";