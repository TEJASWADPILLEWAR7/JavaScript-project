function appendValue(value) {
  const display = document.getElementById("display");
  display.innerText += value;
}

function clearDisplay() {
  const display = document.getElementById("display");
  display.innerText = "";
}

function deleteLast() {
  const display = document.getElementById("display");
  display.innerText = display.innerText.slice(0, -1);
}

function calculate() {
  const display = document.getElementById("display");
  try {
    display.innerText = eval(display.innerText);
  } catch (e) {
    display.innerText = "Error";
  }
}
