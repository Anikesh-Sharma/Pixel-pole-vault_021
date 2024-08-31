function debounce(fn, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}


// JavaScript for resizer functionality
const resizer = document.getElementById('resizer');
const leftSide = resizer.previousElementSibling;
const rightSide = resizer.nextElementSibling;

let isResizing = false;

// Initialize the widths to be 50% each
leftSide.style.width = '50%';
rightSide.style.width = '50%';

resizer.addEventListener('mousedown', (e) => {
isResizing = true;
document.body.style.cursor = 'ew-resize';
document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', (e) => {
if (!isResizing) return;

const containerRect = document.querySelector('.container').getBoundingClientRect();
const pointerRelativeXpos = e.clientX - containerRect.left;
const newLeftWidth = (pointerRelativeXpos / containerRect.width) * 100;
const newRightWidth = 100 - newLeftWidth;

// Ensure the width is within reasonable bounds
if (newLeftWidth >= 20 && newLeftWidth <= 80) {
leftSide.style.width = `${newLeftWidth}%`;
rightSide.style.width = `${newRightWidth}%`;
}
});

document.addEventListener('mouseup', () => {
isResizing = false;
document.body.style.cursor = '';
document.body.style.userSelect = '';
});



// This function parses custom 'for' loop syntax and converts it to JavaScript 'for' loop syntax

// * parseForLoops function
//  * 
//  * This function parses and converts a custom for-loop syntax used in our language into 
//  * standard JavaScript for-loops. Specifically, it handles loops defined using the format:
//  * 
//  *      for(blo i = 0 to 5) { ... }




function parseForLoops(code) {
// Regular expression to match the custom 'for' loop
const forLoopRegex = /for\s*\(\s*(blo|fix|glo)\s+(\w+)\s*=\s*(\d+)\s*to\s*(\d+)\s*\)\s*\{/g;
let match;
let jsCode = '';
let lastIndex = 0;

// Process each match
while ((match = forLoopRegex.exec(code)) !== null) {
const type = match[1]; // 'blo', 'fix', 'glo'
const variable = match[2]; // Loop variable name
const startValue = match[3]; // Start value
const endValue = match[4]; // End value

let jsDeclaration;
if (type === 'blo') {
    jsDeclaration = `let ${variable}`;
} else if (type === 'fix') {
    jsDeclaration = `const ${variable}`;
} else if (type === 'glo') {
    jsDeclaration = `var ${variable}`; // Global variable using 'var'
}

// Convert custom for loop to JavaScript for loop
const jsForLoop = `for (${jsDeclaration} = ${startValue}; ${variable} <= ${endValue}; ${variable}++) {`;

// Append valid JavaScript for loop
jsCode += code.substring(lastIndex, match.index) + jsForLoop;
lastIndex = forLoopRegex.lastIndex;
}

// Append remaining code after the last match
jsCode += code.substring(lastIndex);

return jsCode;
}

function parseVariables(code) {
// Regular expression to match the custom declarations: 'blo', 'fix', 'glo'
const variableRegex = /(blo|fix|glo)\s+(\w+)\s*(=\s*(.+))?;/g;
let match;
let jsCode = '';
let lastIndex = 0;

// Check for any non-custom variable declarations and throw an error
const invalidDeclarations = code.match(/\b(let|var|const)\b\s+\w+/);
if (invalidDeclarations) {
throw new SyntaxError("Unknown declaration type found: " + invalidDeclarations[0]);
}

while ((match = variableRegex.exec(code)) !== null) {
const type = match[1];
const name = match[2];
const value = match[4] !== undefined ? match[4] : 'undefined';

// Generate the corresponding JS declaration
let jsDeclaration = '';
if (!isNaN(value)) {
    // Number value
    if (type === 'blo') {
        jsDeclaration = `let ${name} = Number(${value});`;
    } else if (type === 'fix') {
        jsDeclaration = `const ${name} = Number(${value});`;
    } else if (type === 'glo') {
        jsDeclaration = `var ${name} = Number(${value});`;
    }
} else {
    // Non-number value
    if (type === 'blo') {
        jsDeclaration = `let ${name} = ${value};`;
    } else if (type === 'fix') {
        jsDeclaration = `const ${name} = ${value};`;
    } else if (type === 'glo') {
        jsDeclaration = `var ${name} = ${value};`;
    }
}

jsCode += code.substring(lastIndex, match.index) + jsDeclaration;
lastIndex = variableRegex.lastIndex;
}

jsCode += code.substring(lastIndex);

return jsCode;
}

function parseCustomSyntax(code) {
// Example regular expression to match the custom matrix syntax
const customSyntaxRegex = /matrix\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)/g; // Adjust regex as needed
let match;
let jsCode = '';
let lastIndex = 0;

// Process each match for the custom matrix syntax
while ((match = customSyntaxRegex.exec(code)) !== null) {
const rows = match[1]; // Number of rows
const cols = match[2]; // Number of columns

// Generate JavaScript code for matrix creation
const jsMatrixCode = `let matrix = new Array(${rows}).fill(null).map(() => new Array(${cols}).fill(0));`;

// Append valid JavaScript matrix creation
jsCode += code.substring(lastIndex, match.index) + jsMatrixCode;
lastIndex = customSyntaxRegex.lastIndex;
}

// Append remaining code after the last match
jsCode += code.substring(lastIndex);

return jsCode;
}

// Debounce the run function to avoid excessive calls
const debouncedRun = debounce(run, 500); // 500ms delay

// Integrate the matrix loop parser into the run function
function parseMatrixLoops(code) {
// Regular expression to match the custom matrix loop
const matrixLoopRegex = /for\s*\(\s*(blo)\s+(\w+)\s*=\s*(\d+)\s*to\s*(\w+)\s*\)\s*\{\s*for\s*\(\s*(blo)\s+(\w+)\s*=\s*(\d+)\s*to\s*(\w+)\s*\)\s*\{/g;
let match;
let jsCode = '';
let lastIndex = 0;

// Process each match
while ((match = matrixLoopRegex.exec(code)) !== null) {
const rowType = match[1]; // Loop type for rows
const rowVariable = match[2]; // Row variable name
const startRowValue = match[3]; // Start row value
const rowEndValue = match[4]; // End row variable (rows)

const colType = match[5]; // Loop type for columns
const colVariable = match[6]; // Column variable name
const startColValue = match[7]; // Start column value
const colEndValue = match[8]; // End column variable (cols)

let jsRowDeclaration = `let ${rowVariable}`;
let jsColDeclaration = `let ${colVariable}`;

// Convert custom matrix loop to JavaScript nested for loops
const jsMatrixLoop = `for (${jsRowDeclaration} = ${startRowValue}; ${rowVariable} < ${rowEndValue}; ${rowVariable}++) {
    for (${jsColDeclaration} = ${startColValue}; ${colVariable} < ${colEndValue}; ${colVariable}++) {
        // Access the matrix element
        let element = matrix[${rowVariable}][${colVariable}];
        console.log(element); // Replace this with your desired operation
    }
}`;

// Append valid JavaScript matrix loop
jsCode += code.substring(lastIndex, match.index) + jsMatrixLoop;
lastIndex = matrixLoopRegex.lastIndex;
}

// Append remaining code after the last match
jsCode += code.substring(lastIndex);

return jsCode;
}

// Integrate the custom parser into the run function
function run() {
let htmlCode = document.getElementById("html-code").value;
let cssCode = document.getElementById("css-code").value;
let jsCode = document.getElementById("js-code").value;
let output = document.getElementById("output");
let consoleDiv = document.getElementById("console");

consoleDiv.innerHTML = ''; // Clear previous console output

try {
// Parse custom variable declarations
jsCode = parseVariables(jsCode);
// Parse custom 'for' loop syntax
jsCode = parseForLoops(jsCode);
// Parse custom matrix iteration syntax
jsCode = parseMatrixLoops(jsCode);
// Parse custom matrix syntax
jsCode = parseCustomSyntax(jsCode); // Parse custom syntax for matrix creation

fetch('function.js')
    .then(response => response.text())
    .then(customPrototypes => {
        output.contentDocument.body.innerHTML = htmlCode + "<style>" + cssCode + "</style>";

        // Custom console.log to handle arrays and objects
        output.contentWindow.console.log = function (message) {
            if (Array.isArray(message)) {
                message = 'Array: ' + JSON.stringify(message, null, 2);
            } else if (typeof message === 'object') {
                message = 'Object: ' + JSON.stringify(message, null, 2);
            }
            consoleDiv.innerHTML += message + '<br>';
        };

        output.contentWindow.eval(`
            ${customPrototypes}
            ${jsCode}
        `);
    })
    .catch(error => {
        consoleDiv.innerHTML = '<span style="color:red;">Error loading custom prototypes: ' + error + '</span>';
    });
} catch (e) {
consoleDiv.innerHTML = '<span style="color:red;">' + e + '</span>';
}
}

// Modify the 'run' function to include the custom 'for' loop parser
document.querySelectorAll('textarea').forEach(textarea => {
textarea.addEventListener('keyup', () => {
localStorage.setItem(textarea.id, textarea.value);
});
});

// Load code from local storage on page load
window.onload = () => {
document.querySelectorAll('textarea').forEach(textarea => {
textarea.value = localStorage.getItem(textarea.id) || '';
});
};

// Debounce function to limit how often the run function can be called
function debounce(func, delay) {
let timeout;
return function (...args) {
clearTimeout(timeout);
timeout = setTimeout(() => func.apply(this, args), delay);
};
}