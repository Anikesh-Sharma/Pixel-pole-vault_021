
const resizer = document.getElementById('resizer');
const leftSide = resizer.previousElementSibling;
const rightSide = resizer.nextElementSibling;

let isResizing = false;

resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;

    const containerOffsetLeft = document.querySelector('.container').offsetLeft;
    const pointerRelativeXpos = e.clientX - containerOffsetLeft;
    const newLeftWidth = (pointerRelativeXpos / window.innerWidth) * 100;
    const newRightWidth = 100 - newLeftWidth;

    leftSide.style.width = `${newLeftWidth}%`;
    rightSide.style.width = `${newRightWidth}%`;
});

document.addEventListener('mouseup', () => {
    isResizing = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
});

//The parseVariables function converts custom variable declarations like dec, cdec, and gdec into standard JavaScript let, const, and var statements, respectively, to make the code executable in the browser.

// Parses and replaces 'dec', 'cdec', 'gdec' variable declarations with 'let', 'const', 'var', respectively, and throws an error for unknown declarations.


function parseVariables(code) {
// Regular expression to match allowed declarations
const variableRegex = /(dec|cdec|gdec)\s+(\w+)\s*(=\s*(.+))?;/g;
let match;
let jsCode = '';
let lastIndex = 0;

// Process each match
while ((match = variableRegex.exec(code)) !== null) {
const type = match[1]; // 'dec', 'cdec', or 'gdec'
const name = match[2]; // Variable name
const value = match[4] !== undefined ? match[4] : 'undefined'; // Assigned value or 'undefined'

let jsDeclaration;
if (type === 'dec') {
    jsDeclaration = `let ${name} = ${value};`;
} else if (type === 'cdec') {
    jsDeclaration = `const ${name} = ${value};`;
} else if (type === 'gdec') {
    jsDeclaration = `var ${name} = ${value};`; // Global variables using 'var'
}

// Append valid declaration
jsCode += code.substring(lastIndex, match.index) + jsDeclaration;
lastIndex = variableRegex.lastIndex;
}

// Append remaining code after the last match
jsCode += code.substring(lastIndex);

// Check for any unknown declarations
const unknownDeclarations = code.match(/(let|var|const)\s+\w+\s*(=\s*(.+))?;/g);
if (unknownDeclarations && unknownDeclarations.length > 0) {
throw new SyntaxError("Unknown declaration type found.");
}

return jsCode;
}


function run() {
let htmlCode = document.getElementById("html-code").value;
let cssCode = document.getElementById("css-code").value;
let jsCode = document.getElementById("js-code").value;
let output = document.getElementById("output");
let consoleDiv = document.getElementById("console");

consoleDiv.innerHTML = ''; // Clear previous console output

try {
jsCode = parseVariables(jsCode); // Process code with custom variable declarations

fetch('functions.js')
    .then(response => response.text())
    .then(customPrototypes => {
        output.contentDocument.body.innerHTML = htmlCode + "<style>" + cssCode + "</style>";
        output.contentWindow.console.log = function (message) {
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

Prism.highlightAll(); // Apply syntax highlighting if Prism.js is used
}



// Save code to local storage on keyup
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('keyup', () => {
        localStorage.setItem(textarea.id, textarea.value);
    });
});

// Load code from local storage on page load
window.onload = () => {
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.value = localStorage.getItem(textarea.id) || '';
        run(); // Run the code to display output
    });
};
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('keyup', () => {
        localStorage.setItem(textarea.id, textarea.value);
    });
});

// Load code from local storage on page load
window.onload = () => {
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.value = localStorage.getItem(textarea.id) || '';
        run(); // Run the code to display output
    });
};
// filter function




