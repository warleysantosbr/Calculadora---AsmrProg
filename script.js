let runningTotal = 0;
let buffer = "0";
let previousOperator = null;


const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if(previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length ===1){
                buffer = '0';
            }else{
               buffer = buffer.slice(0,-1);
            }
            break
        case '+':
        case '-':
        case 'x':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal !== 0 && previousOperator !== null) {
        flushOperation(intBuffer);
    } else {
        runningTotal = intBuffer;
    }

    previousOperator = symbol;
    buffer = '0';
}


function flushOperation(intBuffer){
    if(previousOperator === '+' || previousOperator === '+'){
        runningTotal += intBuffer;
    }else if(previousOperator === '-' || previousOperator === '-'){
        runningTotal -= intBuffer;
    }else if(previousOperator === 'x' || previousOperator === '*' || previousOperator === 'x'){
        runningTotal *= intBuffer;
    }else if(previousOperator === '÷' || previousOperator === '/' || previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}



function handleNumber(numberString){
    if(buffer ==="0"){
        buffer = numberString
    }else{
        buffer += numberString;
    }
}

function init(){
    const buttonsContainer = document.querySelector('.calc-buttons');
    
    if(buttonsContainer) {
        buttonsContainer.addEventListener('click', function(event){
            console.log( event.target.innerText); // TESTE: Ver o que está sendo capturado
            buttonClick(event.target.innerText);
        });
    } else {
        console.error();
    }
}


init();