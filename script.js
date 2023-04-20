const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const initialEntry = true;

const inputs = {
  x: "",
  operator: "",
  y: "",
};

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
  return answer;
}

function updateDisplay() {
  // max characters in the display is 21
  display.innerHTML = inputs.x.concat(inputs.operator).concat(inputs.y);
}

function handleNumberClick(e) {
  // update inputs object with the corresponding number
  // if input.x is empty add the number to that object
  // otherwise add it to input.y
  // make sure to check that if the number is too big for the display it converts to
  // scientific notation
  if (initialEntry) {
    inputs.x = inputs.x.concat(e.target.id);
    updateDisplay();
  }
}

numberButtons.forEach((i) => {
  i.addEventListener("click", handleNumberClick);
});
