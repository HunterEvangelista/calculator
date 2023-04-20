// calcy boy lets goooo last project for the foundations course
// write evaluate function that takes two numbers and performs what ever operation
const args = {
  x: 10,
  operator: "+",
  y: 15,
};

function evaluate(args) {
  switch (args.operator) {
    case "+":
      return args.x + args.y;
    case "-":
      return args.x - args.y;
    case "*":
      return args.x * args.y;
    case "/":
      return args.x / args.y;
    // no default
  }
}

console.log(evaluate(args));
