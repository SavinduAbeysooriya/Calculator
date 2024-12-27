const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && output !== "") {
    try {
      output = eval(output.replace("%", "/100"));
    } catch {
      output = "Error";
    }
  } else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    output = output.toString().slice(0, -1);
  } else {
    if (specialChars.includes(btnValue) && specialChars.includes(output[output.length - 1])) {
      return;
    }
    if (output === "" && specialChars.includes(btnValue)) return;
    output += btnValue;
  }
  display.value = output;
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  const allowedKeys = [...Array(10).keys(), ".", "Enter", "Backspace", "%", "*", "/", "-", "+"];
  
  if (allowedKeys.includes(key) || key === "Backspace") {
    let value = key === "Enter" ? "=" : key;
    value = key === "Backspace" ? "DEL" : value;
    calculate(value);
  }
});
            