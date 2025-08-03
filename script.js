let display = document.getElementById("display");

function clearDisplay() {
    display.value = "";
}

function insert(val) {
    display.value += val;
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function square() {
    display.value += "**2";
}

function cube() {
    display.value += "**3";
}

function factorial() {
    let number = parseInt(display.value);
    display.value = fact(number);
}

function fact(n) {
    return (n === 0 || n === 1) ? 1 : n * fact(n - 1);
}

function calculate() {
    let expression = display.value;
    
    // Replace trigonometric and logarithmic functions with Math methods and convert degrees to radians
    expression = expression.replace(/sin\(([^)]+)\)/g, "Math.sin(($1) * Math.PI / 180)");
    expression = expression.replace(/cos\(([^)]+)\)/g, "Math.cos(($1) * Math.PI / 180)");
    expression = expression.replace(/tan\(([^)]+)\)/g, "Math.tan(($1) * Math.PI / 180)");
    //log
    expression = expression.replace(/log\(/g, "Math.log10(");
    expression = expression.replace(/ln\(/g, "Math.log(");
    expression = expression.replace(/\^/g, "**");

    // Handle factorial
    if (expression.includes("!")) {
        expression = expression.replace(/([0-9]+)!/g, function(match, number) {
            return fact(parseInt(number));
        });
    }

    try {
        display.value = eval(expression);
    } catch (error) {
        display.value = "Error";
    }
}
