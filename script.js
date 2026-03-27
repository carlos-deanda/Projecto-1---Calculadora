let fullOp = '';
let res = 0;
let checker = false;
let historyData = []; 

function handleClick(number) {
    if (fullOp === "" && isNaN(number) && number !== "-" && number !== ".") {        return;
    
    }
    
    if (fullOp.length >= 20) {
        return; 
    }
    
    if(checker && ["+", "-", "x", "/", "^"].includes(number)){
        return;
    }   

    if (number === ".") {
        const segmentos = fullOp.split(/[\+\-x\/\^]/);
        
        const ultimoNumero = segmentos[segmentos.length - 1];

        if (ultimoNumero.includes(".")) {
            return;
        }
    }
    
    if(["+", "-", "x", "/", "^"].includes(number)){
        checker = true;

    } else {
        checker = false;
    }

    fullOp = fullOp + number;
    showNumber(fullOp);
}

function erase(){
    fullOp = '';
    document.getElementById("op-text").innerHTML = ''; 
    document.getElementById("res-text").innerHTML = '0'; 
    checker = false;
}

function calculate() {
    const match = fullOp.match(/^(-?\d*\.?\d*)([\+\-x\/\^])(-?\d*\.?\d*)$/);
    
    if (!match) return;

    const a = match[1];  
    const op = match[2];
    const b = match[3]; 

    let currentRes = 0;
   
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    switch(op){
        case "+": currentRes = numA + numB; break;
        case "-": currentRes = numA - numB; break;
        case "x": currentRes = numA * numB; break;
        case "/": currentRes = numA / numB; break;
        case "^": currentRes = numA ** numB; break;
        default: return;
    }

    historyData.push({ op: fullOp, result: currentRes });
    renderHistory();

    document.getElementById("op-text").innerHTML = fullOp;
    showNumber(currentRes);
    
    fullOp = currentRes.toString();
    res = currentRes;
    checker = false;
}

function showNumber(number) {
    const resDisplay = document.getElementById("res-text");
    const text = number.toString();
    const length = text.length;

    if (length <= 7) {
        resDisplay.style.fontSize = "70px";
    } else if (length > 7 && length <= 10) {
        resDisplay.style.fontSize = "50px"; 
    } else if (length > 10 && length <= 14) {
        resDisplay.style.fontSize = "35px"; 
    } else {
        resDisplay.style.fontSize = "24px"; 
    }

    resDisplay.innerHTML = text;
}

function toggleHistory() {
    const screen = document.getElementById("history-screen");
    screen.style.display = (screen.style.display === "none") ? "flex" : "none";
}

function renderHistory() {
    const list = document.getElementById("history-list");
    list.innerHTML = ""; 
    
    historyData.forEach((item, index) => {
        const div = document.createElement("div");
        
        const isLatest = (index === historyData.length - 1);
        div.className = `history-item ${isLatest ? 'is-latest' : ''}`;
        
        div.innerHTML = `
            <p>${item.op}</p>
            <h2>${item.result}</h2>
        `;
        list.prepend(div); 
    });
}