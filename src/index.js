function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const operators = {
        '+': (x, y) => (stack[stack.length - 1] === '-') ? x - y : x + y,
        '-': (x, y) => (stack[stack.length - 1] === '-') ? x + y : x - y,
        '*': (x, y) => x * y,
        '/': (x, y) => {
            if (y === 0) {
                throw 'TypeError: Division by zero.';
            } else {
                return x / y;
            }
        }
    };

    const priority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    }

    let bracketsCount = 0;
    let arr = [];
    let stack = [];
    let result = [];

    expr = expr.split(')').join(' ) ').split('(').join(' ( ');

    if (expr.indexOf(' ') != -1) {
        arr = expr.trim().split(' ');
    } else {
        arr = expr.trim().split('');
    }
    arr = arr.filter((item) => {
        return item != '';
    });

    arr.forEach((item) => {
        if (item === '(') {
            bracketsCount++;
        }
        if (item === ')') {
            bracketsCount--;
        }
    });

    if (bracketsCount != 0) {
        throw 'ExpressionError: Brackets must be paired';
    }

    for (let i = 0; i < arr.length; i++) {
        if (!isNaN(arr[i])) {
            result.push(+arr[i]);
        } else {
            if (arr[i] in operators) {
                if (priority[arr[i]] <= priority[stack[stack.length - 1]]) {
                    calculate();
                }
            }
            if (arr[i] === ')') {
                while (stack[stack.length - 1] != '(') {
                    calculate();
                }
                stack.pop();
                continue;
            }
            stack.push(arr[i]);
        }
    }

    while (stack.length != 0) {
        calculate();
    }

    return result.pop();

    function calculate() {
        let [y, x] = [result.pop(), result.pop()];
        result.push(operators[stack.pop()](x, y));
    }

}

module.exports = {
    expressionCalculator
}