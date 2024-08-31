// BhaiOperators Object
const BhaiOperators = {
    // Arithmetic Operators
    bhaiAdd: function(a, b) {
      return a + b;
    },
  
    bhaiSubtract: function(a, b) {
      return a - b;
    },
  
    bhaiMultiply: function(a, b) {
      return a * b;
    },
  
    bhaiDivide: function(a, b) {
      if (b === 0) {
        throw new Error('Division by zero is not allowed');
      }
      return a / b;
    },
  
    bhaiModulus: function(a, b) {
      return a % b;
    },
  
    bhaiExponent: function(a, b) {
      return Math.pow(a, b);
    },
  
    // Comparison Operators
    bhaiEqual: function(a, b) {
      return a == b;
    },
  
    bhaiStrictEqual: function(a, b) {
      return a === b;
    },
  
    bhaiNotEqual: function(a, b) {
      return a != b;
    },
  
    bhaiStrictNotEqual: function(a, b) {
      return a !== b;
    },
  
    bhaiGreaterThan: function(a, b) {
      return a > b;
    },
  
    bhaiGreaterThanOrEqual: function(a, b) {
      return a >= b;
    },
  
    bhaiLessThan: function(a, b) {
      return a < b;
    },
  
    bhaiLessThanOrEqual: function(a, b) {
      return a <= b;
    },
  
    // Logical Operators
    bhaiAnd: function(a, b) {
      return a && b;
    },
  
    bhaiOr: function(a, b) {
      return a || b;
    },
  
    bhaiNot: function(a) {
      return !a;
    },
  
    // Bitwise Operators
    bhaiBitwiseAnd: function(a, b) {
      return a & b;
    },
  
    bhaiBitwiseOr: function(a, b) {
      return a | b;
    },
  
    bhaiBitwiseXor: function(a, b) {
      return a ^ b;
    },
  
    bhaiBitwiseNot: function(a) {
      return ~a;
    },
  
    bhaiLeftShift: function(a, b) {
      return a << b;
    },
  
    bhaiRightShift: function(a, b) {
      return a >> b;
    },
  
    bhaiUnsignedRightShift: function(a, b) {
      return a >>> b;
    },
  
    // Ternary Operator (Conditional)
    bhaiTernary: function(condition, trueResult, falseResult) {
      return condition ? trueResult : falseResult;
    },
  
    // Assignment Operators (can be used with variables)
    bhaiAssign: function(variable, value) {
      return variable = value;
    },
  
    bhaiAddAssign: function(variable, value) {
      return variable += value;
    },
  
    bhaiSubtractAssign: function(variable, value) {
      return variable -= value;
    },
  
    bhaiMultiplyAssign: function(variable, value) {
      return variable *= value;
    },
  
    bhaiDivideAssign: function(variable, value) {
      return variable /= value;
    },
  
    bhaiModulusAssign: function(variable, value) {
      return variable %= value;
    },
  
    bhaiExponentAssign: function(variable, value) {
      return variable **= value;
    }
  };
  
  // Example usage:
  
  // Arithmetic
  console.log(BhaiOperators.bhaiAdd(5, 3)); // Output: 8
  console.log(BhaiOperators.bhaiDivide(10, 2)); // Output: 5
  
  // Comparison
  console.log(BhaiOperators.bhaiGreaterThan(5, 3)); // Output: true
  console.log(BhaiOperators.bhaiEqual(5, '5')); // Output: true
  
  // Logical
  console.log(BhaiOperators.bhaiAnd(true, false)); // Output: false
  console.log(BhaiOperators.bhaiOr(true, false)); // Output: true
  
  // Bitwise
  console.log(BhaiOperators.bhaiBitwiseAnd(5, 3)); // Output: 1
  
  // Ternary
  console.log(BhaiOperators.bhaiTernary(5 > 3, 'Yes', 'No')); // Output: 'Yes'
  
  // Assignment
  let x = 5;
  x = BhaiOperators.bhaiAddAssign(x, 10);
  console.log(x); // Output: 15
  