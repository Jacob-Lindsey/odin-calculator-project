const currentDisplay = document.querySelector('#cdisplay'); // Displays the values input by the user prior to operator selection
const mainDisplay = document.querySelector('#display'); // Display for completed calculations
const buttons = document.querySelectorAll('.btn');

// ArrowRight ArrowLeft ArrowDown ArrowUp Enter Backspace 

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'Enter':
            console.log('Enter Pressed');
            break;
        case 'Backspace':
            console.log('Backspace Pressed');
            break;
        case 'ArrowRight':
            console.log('Right Pressed');
            break;
        case 'ArrowLeft':
            console.log('Left Pressed');
            break;
        case 'ArrowDown':
            console.log('Down Pressed');
            break;
        case 'ArrowUp':
            console.log('Up Pressed');
            break;
        case '.':
            console.log('Decimal Pressed');
            break;
        case '/':
            console.log('Divide Pressed');
            break;
        case '*':
            console.log('Multiply Pressed');
            break;
        case '+':
            console.log('Plus Pressed');
            break;
        case '-':
            console.log('Minus Pressed');
            break;
        case '1':
            console.log('1 Pressed');
            break;
        case '2':
            console.log('2 Pressed');
            break;
        case '3':
            console.log('3 Pressed');
            break;
        case '4':
            console.log('4 Pressed');
            break;
        case '5':
            console.log('5 Pressed');
            break;
        case '6':
            console.log('6 Pressed');
            break;
        case '7':
            console.log('7 Pressed');
            break;
        case '8':
            console.log('8 Pressed');
            break;
        case '9':
            console.log('9 Pressed');
            break;
        case '0':
            console.log('0 Pressed');
            break;
    }
})

buttons.forEach(function(currentBtn){
  currentBtn.addEventListener('click', event => {
      if (event.target.className == 'btn operator'){

          if (operator == '' && firstOperand == null){
            operator = event.target.outerText;
            firstOperand = currentDisplay.textContent;
            moveValueToMainDisplay(currentDisplay.textContent);
            resetDecimal();

          } else if (operator != '' && firstOperand != null && currentDisplay.textContent != '' && currentDisplay.textContent != '.' && mainDisplay.textContent != ''){
              secondOperand = currentDisplay.textContent;
              secondOperandBackup = currentDisplay.textContent;
              operator = event.target.outerText;
              let calculation = operate(operator,firstOperand,secondOperand);
              moveValueToMainDisplay(calculation);
              firstOperand = calculation;
              secondOperand = null;
              
              resetDecimal();
          } else if (operator == '' && firstOperand != null && currentDisplay.textContent == '' && mainDisplay.textContent != ''){
              operator = event.target.outerText;

          } else if (mainDisplay.textContent == ''){
              operator = event.target.outerText;
              firstOperand = currentDisplay.textContent
              moveValueToMainDisplay(currentDisplay.textContent);

          } else if (operator != '' && firstOperand != null && currentDisplay.textContent == '' && mainDisplay.textContent != '' && secondOperandBackup != null){
              operator = event.target.outerText;
              let calculation = operate(operator,firstOperand,secondOperandBackup);
              moveValueToMainDisplay(calculation);
              firstOperand = calculation; 
          }

      } else if (event.target.id == 'clear'){
            clearAll();

      } else if (event.target.id == 'equal'){
          if (firstOperand != null && operator != ''){
            secondOperand = currentDisplay.textContent;
            let calculation = operate(operator,firstOperand,secondOperand);
            moveValueToMainDisplay(calculation);
            firstOperand = calculation;
            secondOperand = null;
            operator = '';
            resetDecimal();
          }
      } else if (event.target.className == 'btn decimal'){
          if (!decimalWasUsed){
            decimalWasUsed = true;
            currentDisplay.textContent += event.target.outerText;
          }
        
      } else if (event.target.className == 'btn backspace'){
          if (currentDisplay.textContent != ''){
            let displaySubstring = currentDisplay.textContent.slice(0, -1);
            currentDisplay.textContent = displaySubstring;
        }
      } else if (event.target.className == 'btn sqrt') {
          if (mainDisplay.textContent != '' && currentDisplay.textContent == ''){
              let sqrtCalc = Number(mainDisplay.textContent) ** 0.5;
              mainDisplay.textContent = sqrtCalc;
              firstOperand = sqrtCalc;
          } else if (mainDisplay.textContent == '' && currentDisplay.textContent != ''){
              let sqrtCalc = Number(currentDisplay.textContent) ** 0.5;
              firstOperand = sqrtCalc;
              moveValueToMainDisplay(sqrtCalc);
          }
      } else if (event.target.className == 'btn exp'){
          if (mainDisplay.textContent != '' && currentDisplay.textContent == ''){
              let expCalc = Number(mainDisplay.textContent) ** 2;
              mainDisplay.textContent = expCalc;
              firstOperand = expCalc;
          } else if (mainDisplay.textContent == '' && currentDisplay.textContent != ''){
              let expCalc = Number(currentDisplay.textContent) ** 2;
              firstOperand = expCalc;
              moveValueToMainDisplay(expCalc);
          }
      } else if (event.target.className == 'btn fact'){
          if (mainDisplay.textContent != '' && currentDisplay.textContent == ''){
            let factCalc = factorial(mainDisplay.textContent);
            mainDisplay.textContent = factCalc;
            firstOperand = factCalc;
          } else if (mainDisplay.textContent == '' && currentDisplay.textContent != ''){
              let factCalc = factorial(currentDisplay.textContent);
              firstOperand = factCalc;
              moveValueToMainDisplay(factCalc);
          }
      }  else if (event.target.className == 'btn'){
           currentDisplay.textContent += event.target.outerText;
      }
      
      
      
      
  });
})

let decimalWasUsed = false;
let firstOperand = null;
let secondOperand = null;
let secondOperandBackup = null;
let operator = '';


function clearCurrentDisplay(){
    currentDisplay.textContent = '';
}

function moveValueToMainDisplay(val){
    mainDisplay.textContent = val;
    currentDisplay.textContent = '';
}

function clearAll(){
    firstOperand = null;
    secondOperand = null;
    operator = '';
    decimalWasUsed = false;
    mainDisplay.textContent = '';
    currentDisplay.textContent = '';
}

function resetDecimal(){
    decimalWasUsed = false;
}

function factorial(a){
    a = Number(a);
    let b = a-1;
    if (a < 0){
        return;
    } else if (a == 0){
        return (1);
    } else {
        for (b; b>1; b--){
            a *= b;
    } return(a);
    }
}

function operate(fn,a,b){
    if (fn == '/' && (a == '0' || b == '0')){
        alert("You can't divide by zero, you know this...")
        return clearAll();
        
    }
    switch (fn) {
        case '+':
            return (Number(a)+Number(b));
        case '-':
            return (Number(a)-Number(b));
        case '*':
            return (Number(a)*Number(b));
        case '/':
            return (Number(a)/Number(b));
    }
}

