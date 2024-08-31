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
        const jsForLoop = `for (${jsDeclaration} = ${startValue}; ${variable} < ${endValue}; ${variable}++) {`;

        // Append valid JavaScript for loop
        jsCode += code.substring(lastIndex, match.index) + jsForLoop;
        lastIndex = forLoopRegex.lastIndex;
    }

    // Append remaining code after the last match
    jsCode += code.substring(lastIndex);

    return jsCode;
}



//The parseVariables function converts custom variable declarations like dec, cdec, and gdec into standard JavaScript let, const, and var statements, respectively, to make the code executable in the browser.

// Parses and replaces 'blo', 'fix', 'glo' variable declarations with 'let', 'const', 'var', respectively, and throws an error for unknown declarations.




function parseVariables(code) {
    const variableRegex = /(blo|fix|glo)\s+(\w+)\s*(=\s*(.+))?;/g;
    let match;
    let jsCode = '';
    let lastIndex = 0;

    while ((match = variableRegex.exec(code)) !== null) {
        const type = match[1];
        const name = match[2];
        const value = match[4] !== undefined ? match[4] : 'undefined';

        // Ensure the value is cast to Number when dealing with numbers
        let jsDeclaration = '';
        if (!isNaN(value)) {
            if (type === 'blo') {
                jsDeclaration = `let ${name} = Number(${value});`;
            } else if (type === 'fix') {
                jsDeclaration = `const ${name} = Number(${value});`;
            } else if (type === 'glo') {
                jsDeclaration = `var ${name} = Number(${value});`;
            }
        } else {
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




// Modify the 'run' function to include the custom 'for' loop parser
function run() {
    let htmlCode = document.getElementById("html-code").value;
    let cssCode = document.getElementById("css-code").value;
    let jsCode = document.getElementById("js-code").value;
    let output = document.getElementById("output");
    let consoleDiv = document.getElementById("console");

    consoleDiv.innerHTML = ''; // Clear previous console output

    try {
        jsCode = parseVariables(jsCode); // Process custom variable declarations
        jsCode = parseForLoops(jsCode); // Process custom 'for' loop syntax

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
