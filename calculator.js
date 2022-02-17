const divButtons = document.getElementById("divNumbers");
divButtons.style.display = "grid";

let number = 0
for (let a = 3; a > 0; a--) {
    for (let b = 1; b < 4; b++) {
        number=number+1;
        const divButton = document.createElement("button");
        divButton.textContent=number;
        divButton.style.gridArea=a,a+1,b,b+1;
        divButton.style.margin="5px"
        divButtons.appendChild(divButton); 
    }
}
    let divButton = document.createElement("button");
    divButton.textContent=0;
    divButton.style.gridArea=4,5,1,2;
    divButton.style.margin="5px"
    divButtons.appendChild(divButton);

    divButton = document.createElement("button");
    divButton.textContent=",";
    divButton.style.gridArea=4,5,2,3;
    divButton.style.margin="5px"
    divButtons.appendChild(divButton);

    divButton = document.createElement("button");
    divButton.textContent="=";
    divButton.style.gridArea=4,5,3,4;
    divButton.style.margin="5px"
    divButtons.appendChild(divButton);