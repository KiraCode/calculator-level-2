let screen = document.querySelector("#screen");
let btn = document.querySelectorAll(".btn");
let input = document.getElementById("input");

const returnEval = (arg) => {
  return eval(`"use strict"; (${arg})`);
};

for (const item of btn) {
  item.addEventListener("click", (e) => {
    let btnText = e.target.innerText;
    console.log(btnText);

    // erase calculated value on new input
    if (input.value) {
      input.value = "";
      screen.value = "";
    }

    if (btnText === "AC") {
      input.value = "";
      screen.value = "";
      btnText = "";
    }

    if (btnText === "÷") {
      btnText = "/";
    }
    if (btnText === "x") {
      btnText = "*";
    }
    if (btnText === "+/-") {
      btnText = "";
      screen.value = -returEval(screen.value);
    }

    // if (btnText === "√") {
    //   input.value = `√${screen.value}`;
    //   screen.value = Math.sqrt(parseFloat(screen.value));
    //   btnText = "";
    // }

    screen.value = screen.value + btnText;
  });
}

const backspc = () => {
  screen.value = screen.value.slice(0, screen.value.length - 1);
};

function convertToEvalString(input) {
  // replace ^ symbol to **
  //   console.log(`before mod1: ${input}`);
  input = input.replace(/\^/g, "**");

  //   replace √ with Math.sqrt
  input = input.replace(/√/g, "Math.sqrt");
  //   console.log(`after mod1: ${input}`);

  //   wrap the expression around parenthesis
  input = input.replace(/Math.sqrt(\d+)/g, "math.sqrt($1)");

  return input;
}

const calculatePercentage = () => {
  let result = returnEval(screen.value) / 100;
  input.value = `${screen.value}%`;
  screen.value = result;
};

const inverse = () => {
  let result = 1 / returnEval(screen.value);
  input.value = `1/${screen.value}`;
  screen.value = result;
};
const getResult = () => {
  input.value = screen.value;
  screen.value = returnEval(convertToEvalString(screen.value));
};

// to handle clear expression
const clearExpression = () => {
  const currentExpression = screen.value;
  let lastExpression = "";
  let regex = /(\b\d+(\.\d+)?|\b\.\d+)\s*$/;
  let match = currentExpression.match(regex);
  console.log(match);

  if (match) {
    lastExpression = match[0].trim();
    console.log(lastExpression);
  }

  screen.value = currentExpression.replace(lastExpression, "").trim();
};
