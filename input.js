// Variable handling
let variables = {};
function executeVariableDeclaration(statement) {
    const [_, varName, , value] = statement.split(" ");
    variables[varName] = evaluateExpression(value);
}

function executeConditional(statement) {
    // Remove extra spaces and match the pattern strictly
    const regex = /^bhaiif\s+(.*?)\s+then\s+(.*?)\s+else\s+(.*?)$/;
    const match = statement.match(regex);

    if (!match) {
        throw new Error('Invalid conditional statement format.');
    }

    const [_, condition, ifTrue, ifFalse] = match;

    if (evaluateCondition(condition)) {
        console.log(evaluateExpression(ifTrue));
    } else {
        console.log(evaluateExpression(ifFalse));
    }
}
executeConditional('bhaiif x == 10 then "True" else "False"');
function evaluateCondition(condition) {
    const regex = /^(.*?)\s*(==|!=)\s*(.*?)$/;
    const match = condition.match(regex);

    if (!match) {
        throw new Error('Invalid condition format.');
    }

    const [_, left, operator, right] = match;

    switch (operator) {
        case "==":
            return evaluateExpression(left) == evaluateExpression(right);
        case "!=":
            return evaluateExpression(left) != evaluateExpression(right);
        default:
            throw new Error(`Unsupported operator: ${operator}`);
    }
}

function evaluateExpression(expr) {
    // A very basic expression evaluator for demo purposes
    if (!isNaN(expr)) return Number(expr); // Handle numbers
    if (expr.startsWith('"') && expr.endsWith('"')) return expr.slice(1, -1); // Handle strings
    if (expr === "x") return 10; // Assume variable x equals 10
    // Add more handling as necessary
    return expr; // Return as is for unhandled cases
}

// Loop handling
function executeLoop(statement) {
    const [_, varName, , start, , end] = statement.split(" ");
    for (let i = Number(start); i < Number(end); i++) {
        variables[varName] = i;
        console.log(`Loop iteration ${i}:`, variables[varName]);
    }
}

// Function handling
let functions = {};
function defineFunction(statement, body) {
    const [_, functionName, params] = statement.split(" ");
    functions[functionName] = { params: params.split(","), body };
}

function callFunction(statement) {
    const [functionName, args] = statement.split(" ");
    const func = functions[functionName];
    if (func) {
        const argValues = args.split(",");
        func.params.forEach((param, index) => {
            variables[param] = evaluateExpression(argValues[index]);
        });
        executeFunctionBody(func.body);
    } else {
        throw new Error(`Undefined function: ${functionName}`);
    }
}

function executeFunctionBody(body) {
    body.forEach(statement => {
        if (statement.startsWith("let")) {
            executeVariableDeclaration(statement);
        } else {
            console.log(evaluateExpression(statement));
        }
    });
}

// Example usage
// executeVariableDeclaration("bhai x = 10");
// executeConditional('bhaiif x == 10 then "True" else "False"');
// executeLoop('for (i = 0 to 3){

// }');
// defineFunction("func add a,b", ["let sum = a + b", "sum"]);
// callFunction("add 3,4");