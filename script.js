/* eslint-disable no-useless-return */
const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector("#decimal");
let displayString = "0";
let initialEntry = true;
let decimalSetting = false;

let inputs = {
  x: "",
  operator: "",
  y: "",
};

function restoreDefaults() {
  display.innerHTML = "0";
  initialEntry = true;
  decimalSetting = false;
  inputs = {
    x: "",
    operator: "",
    y: "",
  };
}

function handleError() {
  restoreDefaults();
  display.innerHTML = "ERR";
}

function updateDisplay() {
  // max characters in the display is 21
  displayString = `${inputs.x}${inputs.operator}${inputs.y}`;
  if (displayString.length > 18) {
    handleError();
  } else {
    display.innerHTML = displayString;
  }
}

function handleDecimal() {
  // add decimal to display but only let it happen once
  // add logic to check if the button has been clicked once
  if (decimalSetting) return;
  if (initialEntry) {
    if (inputs.x === "") inputs.x += "0";
    inputs.x += ".";
    decimalSetting = true;
  } else {
    if (inputs.y === "") inputs.y += "0";
    inputs.y += ".";
    decimalSetting = true;
  }
}

function operate(args) {
  let answer = "";
  switch (args.operator) {
    case "+":
      answer = parseInt(args.x, 10) + parseInt(args.y, 10);
      break;
    case "-":
      answer = args.x - args.y;
      break;
    case "*":
      answer = args.x * args.y;
      break;
    case "÷":
      if (args.y === "0") {
        handleError();
        return;
      }
      answer = args.x / args.y;
      break;
    // no default
  }
  if (decimalSetting) answer = answer.toFixed(2);
  inputs = {
    x: answer,
    operator: "",
    y: "",
  };
  updateDisplay();
  initialEntry = true;
}

function handleNumberClick(e) {
  if (initialEntry) {
    inputs.x = inputs.x.concat(e.target.id);
    updateDisplay();
  } else {
    inputs.y = inputs.y.concat(e.target.id);
    updateDisplay();
  }
}

function handleOperatorClick(e) {
  const operation = e.target.classList[1];
  if (!initialEntry && operation === "-") {
    inputs.y *= -1;
    return;
  }
  // handle equals sign
  if (operation === "=") {
    try {
      operate(inputs);
    } catch (err) {
      restoreDefaults();
      displayString = "ERR";
      display.innerHTML = displayString;
    }
    return;
  }
  // handle any other operation
  inputs.operator = operation;
  initialEntry = false;
  decimalSetting = false;
  updateDisplay();
}

function handleClear() {
  restoreDefaults();
}
// functions go above this line

numberButtons.forEach((i) => {
  i.addEventListener("click", handleNumberClick);
});

operatorButtons.forEach((i) => {
  i.addEventListener("click", handleOperatorClick);
});

clearButton.addEventListener("click", handleClear);

decimalButton.addEventListener("click", handleDecimal);
