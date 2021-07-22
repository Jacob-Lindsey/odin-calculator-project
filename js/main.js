const currentDisplay = document.querySelector('#cdisplay'); // Displays the values input by the user prior to operator selection
const mainDisplay = document.querySelector('#display'); // Display for completed calculations
const buttons = document.querySelectorAll('.btn');

document.querySelector('.focus').focus();

document.addEventListener('keydown', function(event) {
    switch (event.key){
        case 'Escape':
            document.getElementById('clear').click();
            break;
        case 'Enter':
            document.getElementById('equal').click();
            break;
        case 'Backspace':
            document.getElementById('backspace').click();
            break;
        case '.':
            document.getElementById('decimal').click();
            break;
        case '/':
            document.getElementById('divide').click();
            break;
        case '*':
            document.getElementById('multiply').click();
            break;
        case '+':
            document.getElementById('plus').click();
            break;
        case '-':
            document.getElementById('minus').click();
            break;
        case '1':
            document.getElementById('one').click();
            break;
        case '2':
            document.getElementById('two').click();
            break;
        case '3':
            document.getElementById('three').click();
            break;
        case '4':
            document.getElementById('four').click();
            break;
        case '5':
            document.getElementById('five').click();
            break;
        case '6':
            document.getElementById('six').click();
            break;
        case '7':
            document.getElementById('seven').click();
            break;
        case '8':
            document.getElementById('eight').click();
            break;
        case '9':
            document.getElementById('nine').click();
            break;
        case '0':
            document.getElementById('zero').click();
            break;
    }
})

function keyboardClick(el, etype){
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        const evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}







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

