const divButtons = document.getElementById("divNumbers");
divButtons.style.display = "grid";

let number = 0
for (let a = 3; a > 0; a--) {
    for (let b = 1; b < 4; b++) {
        number = number + 1;
        const divButton = document.createElement("button");
        divButton.textContent = number;
        divButton.style.gridArea = a, a + 1, b, b + 1;
        divButton.style.margin = "5px"
        divButton.addEventListener("click", function () {
            displayButton(divButton);
        })
        divButtons.appendChild(divButton);
    }
}
const divButton = document.createElement("button");
divButton.textContent = 0;
divButton.style.gridArea = 4, 5, 1, 2;
divButton.style.margin = "5px"
divButton.addEventListener("click", function () {
    displayButton(divButton);
})
divButtons.appendChild(divButton);

const divButton2 = document.createElement("button");
divButton2.textContent = ",";
divButton2.style.gridArea = 4, 5, 2, 3;
divButton2.style.margin = "5px"
divButton2.addEventListener("click", function () {
    displayButton(divButton2);
})
divButtons.appendChild(divButton2);


const divButton3 = document.createElement("button");
divButton3.textContent = "C";
divButton3.style.gridArea = 4, 5, 3, 4;
divButton3.style.margin = "5px"
divButton3.addEventListener("click", function () {
    document.getElementById("textDisplay").textContent="0";
})
divButtons.appendChild(divButton3);

const divButton4 = document.createElement("button");
divButton4.textContent = "=";
divButton4.style.gridArea = 5, 6, 1, 4;
divButton4.style.margin = "5px"
divButton.addEventListener("click", function () {
})
document.getElementById("divMain").appendChild(divButton4);



function displayButton(buttonValue) {
    const textDisplay = document.getElementById("textDisplay");
    if (textDisplay.textContent == "0") {
        textDisplay.textContent = buttonValue.textContent;
    }
    else {
        textDisplay.textContent = textDisplay.textContent + buttonValue.textContent;
    }
}