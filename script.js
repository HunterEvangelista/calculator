/* eslint-disable no-useless-return */
const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector("#decimal");
let displayString = "0";
let initialEntry = true;

let inputs = {
  x: "",
  operator: "",
  y: "",
};

function updateDisplay() {
  // max characters in the display is 21
  displayString = `${inputs.x}${inputs.operator}${inputs.y}`;
  display.innerHTML = displayString;
}

function operate(args) {
  let answer = "";
  switch (args.operator) {
    case "+":
      answer = args.x + args.y;
      break;
    case "-":
      answer = args.x - args.y;
      break;
    case "*":
      answer = args.x * args.y;
      break;
    case "/":
      answer = args.x / args.y;
      break;
    // no default
  }
  inputs = {
    x: answer,
    operator: "",
    y: "",
  };
  updateDisplay();
  initialEntry = true;
}

function handleNumberClick(e) {
  // update inputs object with the corresponding number
  // if input.x is empty add the number to that object
  // otherwise add it to input.y
  // make sure to check that if the number is too big for the display it converts to
  // scientific notation
  console.log(e);
  if (initialEntry) {
    inputs.x = inputs.x.concat(e.target.id);
    updateDisplay();
  } else {
    inputs.y = inputs.y.concat(e.target.id);
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
      return;
    } catch (err) {
      displayString = "ERR";
      display.innerHTML = displayString;
    }
  }
  // handle any other operation
  inputs.operator = operation;
  initialEntry = false;
  updateDisplay();
}

function restoreDefaults(){
  display.innerHTML = "0";
  initialEntry = true;
  inputs = {
    x: "",
    operator: "",
    y: "",
  };
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
