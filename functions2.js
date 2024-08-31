
// filter function


if (!Array.prototype.Filter) {
    Array.prototype.Filter = function(callback, thisArg) {
      if (this == null) {
        throw new TypeError('Array.prototype.bhaiFilter called on null or undefined');
      }
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }
  
      const result = [];
      const array = Object(this);
      const len = array.length >>> 0;
  
      for (let i = 0; i < len; i++) {
        if (i in array) {
          const val = array[i];
          if (callback.call(thisArg, val, i, array)) {
            result.push(val);
          }
        }
      }
  
      return result;
    };
  }
  
  
  // const numbers = [1, 2, 3, 4, 5, 6];
  
  // // Use bhaiFilter to filter out even numbers
  // const evenNumbers = numbers.Filter(function(number) {
  //   return number % 2 === 0;
  // });
  
  // console.log(evenNumbers); // Output: [2, 4, 6]
  
  
  
  
  
  // // sort function
  
  if (!Array.prototype.bhaiSort) {
    Array.prototype.bhaiSort = function(compareFunction) {
      if (this == null) {
        throw new TypeError('Array.prototype.bhaiSort called on null or undefined');
      }
  
      const array = Object(this);
      const len = array.length >>> 0;
  
      // Default compare function if none is provided
      compareFunction = compareFunction || function(a, b) {
        const aStr = String(a);
        const bStr = String(b);
        if (aStr < bStr) return -1;
        if (aStr > bStr) return 1;
        return 0;
      };
  
      // Implementing a simple bubble sort for educational purposes
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
          if (compareFunction(array[j], array[j + 1]) > 0) {
            // Swap the elements
            const temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
          }
        }
      }
  
      return array;
    };
  }
  
  
  // // how to use
  
  // const numbers = [5, 3, 8, 1, 2];
  
  // // Use bhaiSort to sort numbers in ascending order
  // numbers.bhaiSort();
  
  // console.log(numbers); // Output: [1, 2, 3, 5, 8]
  
  // // Use bhaiSort with a custom compare function to sort in descending order
  // numbers.bhaiSort(function(a, b) {
  //   return b - a;
  // });
  
  // console.log(numbers); // Output: [8, 5, 3, 2, 1]
  
  
  
  
  //find function
  
  
  // // Polyfill for Array.prototype.bhaiFind
  if (!Array.prototype.bhaiFind) {
    Array.prototype.bhaiFind = function(callback, thisArg) {
      if (this == null) {
        throw new TypeError('Array.prototype.bhaiFind called on null or undefined');
      }
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }
  
      const array = Object(this);
      const len = array.length >>> 0;
  
      for (let i = 0; i < len; i++) {
        if (i in array) {
          const value = array[i];
          if (callback.call(thisArg, value, i, array)) {
            return value; // Return the first element that satisfies the callback
          }
        }
      }
  
      return undefined; // Return undefined if no element satisfies the callback
    };
  }
  
  
  
  
  // const numbers = [5, 12, 8, 130, 44];
  
  // // Use bhaiFind to find the first number greater than 10
  // const found = numbers.bhaiFind(function(number) {
  //   return number > 10;
  // });
  
  // console.log(found); // Output: 12
  
  
  
  
  // reduces funtion
  
  
  // // Polyfill for Array.prototype.bhaiReduce
  if (!Array.prototype.bhaiReduce) {
    Array.prototype.bhaiReduce = function(callback, initialValue) {
      if (this == null) {
        throw new TypeError('Array.prototype.bhaiReduce called on null or undefined');
      }
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }
  
      const array = Object(this);
      const len = array.length >>> 0;
      let accumulator = initialValue;
      let startIndex = 0;
  
      // If initialValue is not provided, use the first element of the array
      if (arguments.length < 2) {
        if (len === 0) {
          throw new TypeError('Reduce of empty array with no initial value');
        }
        accumulator = array[0];
        startIndex = 1;
      }
  
      for (let i = startIndex; i < len; i++) {
        if (i in array) {
          accumulator = callback(accumulator, array[i], i, array);
        }
      }
  
      return accumulator;
    };
  }
  
  
  
  
  // const numbers = [1, 2, 3, 4, 5];
  
  // // Use bhaiReduce to sum all numbers
  // const sum = numbers.bhaiReduce(function(accumulator, currentValue) {
  //   return accumulator + currentValue;
  // }, 0);
  
  // console.log(sum); // Output: 15
  
  // // Use bhaiReduce to find the product of all numbers
  // const product = numbers.bhaiReduce(function(accumulator, currentValue) {
  //   return accumulator * currentValue;
  // }, 1);
  
  // console.log(product); // Output: 120
  
  
  
  
  // every function
  
  
  // // Polyfill for Array.prototype.bhaiEvery
  if (!Array.prototype.bhaiEvery) {
    Array.prototype.bhaiEvery = function(callback, thisArg) {
      if (this == null) {
        throw new TypeError('Array.prototype.bhaiEvery called on null or undefined');
      }
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }
  
      const array = Object(this);
      const len = array.length >>> 0;
  
      for (let i = 0; i < len; i++) {
        if (i in array) {
          if (!callback.call(thisArg, array[i], i, array)) {
            return false; // Return false if any element does not satisfy the callback
          }
        }
      }
  
      return true; // Return true if all elements satisfy the callback
    };
  }
  
  
  
  
  // const numbers = [2, 4, 6, 8, 10];
  
  // // Use bhaiEvery to check if all numbers are even
  // const allEven = numbers.bhaiEvery(function(number) {
  //   return number % 2 === 0;
  // });
  
  // console.log(allEven); // Output: true
  
  // const mixedNumbers = [1, 2, 3, 4, 5];
  
  // // Use bhaiEvery to check if all numbers are greater than 0
  // const allPositive = mixedNumbers.bhaiEvery(function(number) {
  //   return number > 0;
  // });
  
  // console.log(allPositive); // Output: true
  
  
  
  //  some function
  
  // // Polyfill for Array.prototype.bhaiSome
  if (!Array.prototype.bhaiSome) {
    Array.prototype.bhaiSome = function(callback, thisArg) {
      if (this == null) {
        throw new TypeError('Array.prototype.bhaiSome called on null or undefined');
      }
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }
  
      const array = Object(this);
      const len = array.length >>> 0;
  
      for (let i = 0; i < len; i++) {
        if (i in array) {
          if (callback.call(thisArg, array[i], i, array)) {
            return true; // Return true if any element satisfies the callback
          }
        }
      }
  
      return false; // Return false if no elements satisfy the callback
    };
  }
  
  
  
  
  // const numbers = [1, 3, 5, 7, 9];
  
  // // Use bhaiSome to check if there is any even number
  // const hasEvenNumber = numbers.bhaiSome(function(number) {
  //   return number % 2 === 0;
  // });
  
  // console.log(hasEvenNumber); // Output: false
  
  // const mixedNumbers = [1, 2, 3, 4, 5];
  
  // // Use bhaiSome to check if there is any number greater than 4
  // const hasGreaterThanFour = mixedNumbers.bhaiSome(function(number) {
  //   return number > 4;
  // });
  
  // console.log(hasGreaterThanFour); // Output: true
  
  
  
  
  
  
  
  
  
  
  
  
  
  // string methoda
  
  
  //stringLength
  
  
  // // Adding stringLength function to String prototype
  if (!String.prototype.stringLength) {
    String.prototype.stringLength = function() {
      if (this == null) {
        throw new TypeError('String.prototype.stringLength called on null or undefined');
      }
  
      let count = 0;
      while (this[count] !== undefined) {
        count++;
      }
      return count;
    };
  }
  
  
  
  
  // const str = "Hello, World!";
  
  // // Use stringLength to get the length of the string
  // const length = str.stringLength();
  
  // console.log(length); // Output: 13
  
  
  
  
  // charAt
  
  
  // // Polyfill for String.prototype.bhaiCharAt
  if (!String.prototype.bhaiCharAt) {
    String.prototype.bhaiCharAt = function(index) {
      if (this == null) {
        throw new TypeError('String.prototype.bhaiCharAt called on null or undefined');
      }
  
      const str = String(this);
      const len = str.length;
  
      // If index is out of range, return an empty string
      if (index < 0 || index >= len) {
        return '';
      }
  
      return str[index];
    };
  }
  
  
  
  // // how to use
  // const str = "Hello, World!";
  
  // // Use bhaiCharAt to get the character at a specific index
  // const charAt5 = str.bhaiCharAt(5);
  // const charAt11 = str.bhaiCharAt(11);
  
  // console.log(charAt5);  // Output: ","
  // console.log(charAt11); // Output: "d"
  
  // // Index out of range example
  // const charAt20 = str.bhaiCharAt(20);
  
  // console.log(charAt20); // Output: ""
  
  
  
  // lastIndexOf 
  
  
  // // Polyfill for String.prototype.bhaiLastIndexOf
  if (!String.prototype.bhaiLastIndexOf) {
    String.prototype.bhaiLastIndexOf = function(searchString, position) {
      if (this == null) {
        throw new TypeError('String.prototype.bhaiLastIndexOf called on null or undefined');
      }
  
      const str = String(this);
      const searchStr = String(searchString);
      const len = str.length;
      const searchLen = searchStr.length;
  
      // If position is undefined or null, set it to the maximum possible value
      let pos = position === undefined ? len : Number(position);
  
      // Start search from the last character if the position is greater than the string length
      pos = Math.min(pos, len - searchLen);
  
      // Search for the substring from right to left
      for (let i = pos; i >= 0; i--) {
        if (str.substring(i, i + searchLen) === searchStr) {
          return i; // Return the index if the substring is found
        }
      }
  
      return -1; // Return -1 if the substring is not found
    };
  }
  
  
  // how to use
  
  // const str = "Hello, World! Hello!";
  
  // // Use bhaiLastIndexOf to find the last occurrence of a substring
  // const lastIndexOfHello = str.bhaiLastIndexOf("Hello");
  // const lastIndexOfWorld = str.bhaiLastIndexOf("World");
  
  // console.log(lastIndexOfHello); // Output: 14 (the last "Hello" starts at index 14)
  // console.log(lastIndexOfWorld); // Output: 7 (the "World" starts at index 7)
  
  // // Search for a substring that doesn't exist
  // const lastIndexOfTest = str.bhaiLastIndexOf("Test");
  
  // console.log(lastIndexOfTest); // Output: -1
  
  
  
  // touppercase
  
  // // Polyfill for String.prototype.bhaiToUpperCase
  if (!String.prototype.bhaiToUpperCase) {
    String.prototype.bhaiToUpperCase = function() {
      if (this == null) {
        throw new TypeError('String.prototype.bhaiToUpperCase called on null or undefined');
      }
  
      const str = String(this);
      const upperStr = [];
  
      for (let i = 0; i < str.length; i++) {
        const char = str[i];
        // Convert to uppercase using ASCII values
        const code = char.charCodeAt(0);
  
        if (code >= 97 && code <= 122) {
          // Lowercase letter (a-z)
          upperStr.push(String.fromCharCode(code - 32));
        } else {
          // Non-lowercase letter
          upperStr.push(char);
        }
      }
  
      return upperStr.join('');
    };
  }
  
  
  // how to use
  
  
  // const str = "Hello, World!";
  
  // // Use bhaiToUpperCase to convert the string to uppercase
  // const upperStr = str.bhaiToUpperCase();
  
  // console.log(upperStr); // Output: "HELLO, WORLD!"
  
  
  
  
  // to lowercase
  
  
  
  // // Polyfill for String.prototype.bhaiToLowerCase
  if (!String.prototype.bhaiToLowerCase) {
    String.prototype.bhaiToLowerCase = function() {
      if (this == null) {
        throw new TypeError('String.prototype.bhaiToLowerCase called on null or undefined');
      }
  
      const str = String(this);
      const lowerStr = [];
  
      for (let i = 0; i < str.length; i++) {
        const char = str[i];
        // Convert to lowercase using ASCII values
        const code = char.charCodeAt(0);
  
        if (code >= 65 && code <= 90) {
          // Uppercase letter (A-Z)
          lowerStr.push(String.fromCharCode(code + 32));
        } else {
          // Non-uppercase letter
          lowerStr.push(char);
        }
      }
  
      return lowerStr.join('');
    };
  }
  
  
  // // how to use
  
  
  
  // const str = "Hello, World!";
  
  // // Use bhaiToLowerCase to convert the string to lowercase
  // const lowerStr = str.bhaiToLowerCase();
  
  // console.log(lowerStr); // Output: "hello, world!"
  
  
  
  //concat
  
  // // Polyfill for String.prototype.bhaiConcat
  if (!String.prototype.bhaiConcat) {
    String.prototype.bhaiConcat = function(...strings) {
      if (this == null) {
        throw new TypeError('String.prototype.bhaiConcat called on null or undefined');
      }
  
      // Convert the context to a string
      let str = String(this);
  
      // Append each argument string to the original string
      for (let i = 0; i < strings.length; i++) {
        str += String(strings[i]);
      }
  
      return str;
    };
  }
  
  
  
  //how touse
  
  
  // const str1 = "Hello";
  // const str2 = " ";
  // const str3 = "World!";
  // const str4 = " How are you?";
  
  // // // Use bhaiConcat to concatenate multiple strings
  // const result = str1.bhaiConcat(str2, str3, str4);
  
  // console.log(result); // Output: "Hello World! How are you?"
  
  // dec str1 = "Hello";
  // dec str2 = " ";
  // dec str3 = "World!";
  // dec str4 = " How are you?";
  
  // // // Use bhaiConcat to concatenate multiple strings
  // dec result = str1.bhaiConcat(str2, str3, str4);
  
  // console.log(result); // Output: "Hello World! How are you?"
  
  // Polyfill for Array.prototype.bhaiIncludes
  if (!Array.prototype.bhaiIncludes) {
      Array.prototype.bhaiIncludes = function(element, fromIndex = 0) {
        if (this == null) {
          throw new TypeError('Array.prototype.bhaiIncludes called on null or undefined');
        }
    
        const arr = Object(this);
        const len = arr.length >>> 0; // Ensures length is a non-negative integer
    
        // If the array is empty, return false
        if (len === 0) {
          return false;
        }
    
        // Convert fromIndex to an integer
        let start = fromIndex | 0;
    
        // If fromIndex is negative, calculate the start index from the end of the array
        if (start < 0) {
          start = Math.max(len + start, 0);
        }
    
        // Iterate through the array to check if the element is present
        for (let i = start; i < len; i++) {
          // Use SameValueZero comparison (similar to ===, but treats NaN === NaN)
          if (arr[i] === element || (typeof arr[i] === 'number' && typeof element === 'number' && isNaN(arr[i]) && isNaN(element))) {
            return true;
          }
        }
    
        return false; // Element not found
      };
    }
  
  //   const arr = [1, 2, 3, 4, NaN];
  
  // // Use bhaiIncludes to check if the array contains a specific element
  // console.log(arr.bhaiIncludes(3)); // Output: true
  // console.log(arr.bhaiIncludes(5)); // Output: false
  // console.log(arr.bhaiIncludes(NaN)); // Output: true
  
  // // Using fromIndex to specify the starting search position
  // console.log(arr.bhaiIncludes(2, 2)); // Output: false
  // console.log(arr.bhaiIncludes(2, 1)); // Output: true
  
  
  
  // // BhaiInput Object
  // const BhaiInput = {
  //     // Property to store the user input
  //     userInput: null,
  
  //     // Method to get user input from a prompt only once
  //     bhaiPromptInput: function(message) {
  //         if (typeof message !== 'string') {
  //             throw new TypeError('Message must be a string');
  //         }
  
  //         // Check if user input is already set
  //         if (this.userInput === null) {
  //             // Prompt user for input with a custom message
  //             this.userInput = prompt(message);
  //         }
          
  //         return this.userInput;
  //     },
  
  //     // Method to retrieve value from an input field by selector
  //     bhaiGetInputValue: function(selector) {
  //         if (typeof selector !== 'string') {
  //             throw new TypeError('Selector must be a string');
  //         }
  
  //         // Use document.querySelector to find the input element
  //         const inputElement = document.querySelector(selector);
          
  //         if (inputElement && (inputElement.tagName === 'INPUT' || inputElement.tagName === 'TEXTAREA')) {
  //             return inputElement.value;
  //         } else {
  //             throw new Error('Element is not an input or textarea');
  //         }
  //     },
  
  //     // Method to set value to an input field by selector
  //     bhaiSetInputValue: function(selector, value) {
  //         if (typeof selector !== 'string') {
  //             throw new TypeError('Selector must be a string');
  //         }
  
  //         // Use document.querySelector to find the input element
  //         const inputElement = document.querySelector(selector);
  
  //         if (inputElement && (inputElement.tagName === 'INPUT' || inputElement.tagName === 'TEXTAREA')) {
  //             inputElement.value = value;
  //         } else {
  //             throw new Error('Element is not an input or textarea');
  //         }
  //     },
  
  //     // Method to add an event listener to an input field
  //     bhaiAddInputEventListener: function(selector, eventType, callback) {
  //         if (typeof selector !== 'string' || typeof eventType !== 'string' || typeof callback !== 'function') {
  //             throw new TypeError('Invalid arguments');
  //         }
  
  //         const inputElement = document.querySelector(selector);
  
  //         if (inputElement) {
  //             inputElement.addEventListener(eventType, callback);
  //         } else {
  //             throw new Error('Element not found');
  //         }
  //     }
  // };
  
  // Example usage:
  
  // 1. Prompt user for input only once
  // const userInput = BhaiInput.bhaiPromptInput('Enter your name:');
  // console.log('User input:', userInput);
  
  // // 2. Get value from an input field
  // const inputValue = BhaiInput.bhaiGetInputValue('#myInput');
  // console.log('Input field value:', inputValue);
  
  // // 3. Set value to an input field
  // BhaiInput.bhaiSetInputValue('#myInput', 'New Value');
  
  // // 4. Add event listener to an input field
  // BhaiInput.bhaiAddInputEventListener('#myInput', 'input', function(event) {
  //     console.log('Input changed to:', event.target.value);
  // });
  
  
  
  // const BhaiOperators = {
  //     // Arithmetic Operators
  //     bhaiAdd: function(a, b) {
  //         return a + b;
  //     },
  
  //     bhaiSubtract: function(a, b) {
  //         return a - b;
  //     },
  
  //     bhaiMultiply: function(a, b) {
  //         return a * b;
  //     },
  
  //     bhaiDivide: function(a, b) {
  //         if (b === 0) {
  //             throw new Error('Division by zero is not allowed');
  //         }
  //         return a / b;
  //     },
  
  //     bhaiModulus: function(a, b) {
  //         return a % b;
  //     },
  
  //     bhaiExponent: function(a, b) {
  //         return Math.pow(a, b);
  //     },
  
  //     // Comparison Operators
  //     bhaiEqual: function(a, b) {
  //         return a == b;
  //     },
  
  //     bhaiStrictEqual: function(a, b) {
  //         return a === b;
  //     },
  
  //     bhaiNotEqual: function(a, b) {
  //         return a != b;
  //     },
  
  //     bhaiStrictNotEqual: function(a, b) {
  //         return a !== b;
  //     },
  
  //     bhaiGreaterThan: function(a, b) {
  //         return a > b;
  //     },
  
  //     bhaiGreaterThanOrEqual: function(a, b) {
  //         return a >= b;
  //     },
  
  //     bhaiLessThan: function(a, b) {
  //         return a < b;
  //     },
  
  //     bhaiLessThanOrEqual: function(a, b) {
  //         return a <= b;
  //     },
  
  //     // Logical Operators
  //     bhaiAnd: function(a, b) {
  //         return a && b;
  //     },
  
  //     bhaiOr: function(a, b) {
  //         return a || b;
  //     },
  
  //     bhaiNot: function(a) {
  //         return !a;
  //     },
  
  //     // Bitwise Operators
  //     bhaiBitwiseAnd: function(a, b) {
  //         return a & b;
  //     },
  
  //     bhaiBitwiseOr: function(a, b) {
  //         return a | b;
  //     },
  
  //     bhaiBitwiseXor: function(a, b) {
  //         return a ^ b;
  //     },
  
  //     bhaiBitwiseNot: function(a) {
  //         return ~a;
  //     },
  
  //     bhaiLeftShift: function(a, b) {
  //         return a << b;
  //     },
  
  //     bhaiRightShift: function(a, b) {
  //         return a >> b;
  //     },
  
  //     bhaiUnsignedRightShift: function(a, b) {
  //         return a >>> b;
  //     },
  
  //     // Ternary Operator (Conditional)
  //     bhaiTernary: function(condition, trueResult, falseResult) {
  //         return condition ? trueResult : falseResult;
  //     },
  
  //     // Assignment Operators (works with variables)
  //     bhaiAssign: function(variable, value) {
  //         return variable = value;
  //     },
  
  //     bhaiAddAssign: function(variable, value) {
  //         return variable += value;
  //     },
  
  //     bhaiSubtractAssign: function(variable, value) {
  //         return variable -= value;
  //     },
  
  //     bhaiMultiplyAssign: function(variable, value) {
  //         return variable *= value;
  //     },
  
  //     bhaiDivideAssign: function(variable, value) {
  //         return variable /= value;
  //     },
  
  //     bhaiModulusAssign: function(variable, value) {
  //         return variable %= value;
  //     },
  
  //     bhaiExponentAssign: function(variable, value) {
  //         return variable **= value;
  //     }
  // };
  
  // Example usage:
  
  // // Assignment
  // let x = 5;
  // x = BhaiOperators.bhaiAddAssign(x, 10);
  // console.log(x); // Output: 15
  
      // Operators Object
      const Operators = {
          // Arithmetic Operators
          Add: function(a, b) {
            return a + b;
          },
        
          Subtract: function(a, b) {
            return a - b;
          },
        
          Multiply: function(a, b) {
            return a * b;
          },
        
          Divide: function(a, b) {
            if (b === 0) {
              throw new Error('Division by zero is not allowed');
            }
            return a / b;
          },
        
          Modulus: function(a, b) {
            return a % b;
          },
        
          Exponent: function(a, b) {
            return Math.pow(a, b);
          },
        
          // Comparison Operators
          Equal: function(a, b) {
            return a == b;
          },
        
          StrictEqual: function(a, b) {
            return a === b;
          },
        
          NotEqual: function(a, b) {
            return a != b;
          },
        
          StrictNotEqual: function(a, b) {
            return a !== b;
          },
        
          GreaterThan: function(a, b) {
            return a > b;
          },
        
          GreaterThanOrEqual: function(a, b) {
            return a >= b;
          },
        
          LessThan: function(a, b) {
            return a < b;
          },
        
          LessThanOrEqual: function(a, b) {
            return a <= b;
          },
        
          // Logical Operators
          And: function(a, b) {
            return a && b;
          },
        
          Or: function(a, b) {
            return a || b;
          },
        
          Not: function(a) {
            return !a;
          },
        
          // Bitwise Operators
          BitwiseAnd: function(a, b) {
            return a & b;
          },
        
          BitwiseOr: function(a, b) {
            return a | b;
          },
        
          BitwiseXor: function(a, b) {
            return a ^ b;
          },
        
          BitwiseNot: function(a) {
            return ~a;
          },
        
          LeftShift: function(a, b) {
            return a << b;
          },
        
          RightShift: function(a, b) {
            return a >> b;
          },
        
          UnsignedRightShift: function(a, b) {
            return a >>> b;
          },
        
          // Ternary Operator (Conditional)
          Ternary: function(condition, trueResult, falseResult) {
            return condition ? trueResult : falseResult;
          },
        
          // Assignment Operators (can be used with variables)
          Assign: function(variable, value) {
            return variable = value;
          },
        
          AddAssign: function(variable, value) {
            return variable += value;
          },
        
          SubtractAssign: function(variable, value) {
            return variable -= value;
          },
        
          MultiplyAssign: function(variable, value) {
            return variable *= value;
          },
        
          DivideAssign: function(variable, value) {
            return variable /= value;
          },
        
          ModulusAssign: function(variable, value) {
            return variable %= value;
          },
        
          ExponentAssign: function(variable, value) {
            return variable **= value;
          }
        };
  
        //  * Creates a matrix of size m x n.
  //  * @param {number} m - Number of rows.
  //  * @param {number} n - Number of columns.
  //  * @param {any} initialValue - Optional initial value for all elements (default is 0).
  //  * @returns {Array<Array<any>>} - The created matrix.
   
  
  function createMatrix(m, n, sequenceTypeOrArray = 'zeros', traversalType = 'none') {
      // Ensure the dimensions are positive integers
      if (m <= 0 || n <= 0) {
          throw new Error('Both dimensions must be positive integers');
      }
  
      const matrix = Array.from({ length: m }, () => Array(n).fill(0));
      let sequenceType;
      let customNumbers = [];
  
      // Check if the third argument is an array (for custom numbers)
      if (Array.isArray(sequenceTypeOrArray)) {
          sequenceType = 'custom';
          customNumbers = sequenceTypeOrArray;
      } else {
          sequenceType = sequenceTypeOrArray;
      }
  
      let currentNumber = {
          zeros: 0,
          natural: 1,
          even: 2,
          odd: 1,
          prime: 1,
          custom: 0 // Index for custom numbers
      };
  
      const generateNumber = {
          zeros: () => 0,
          natural: () => currentNumber.natural++,
          even: () => {
              const num = currentNumber.even;
              currentNumber.even += 2;
              return num;
          },
          odd: () => {
              const num = currentNumber.odd;
              currentNumber.odd += 2;
              return num;
          },
          prime: () => {
              while (true) {
                  currentNumber.prime++;
                  if (isPrime(currentNumber.prime)) return currentNumber.prime;
              }
          },
          custom: () => {
              if (currentNumber.custom < customNumbers.length) {
                  return customNumbers[currentNumber.custom++];
              } else {
                  throw new Error('Not enough custom numbers provided');
              }
          },
          default: () => sequenceType // Default case for custom characters or numbers
      };
  
      function isPrime(num) {
          if (num < 2) return false;
          for (let i = 2; i <= Math.sqrt(num); i++) {
              if (num % i === 0) return false;
          }
          return true;
      }
  
      // Fill the matrix based on the selected sequence type
      function fillMatrix() {
          for (let i = 0; i < m; i++) {
              for (let j = 0; j < n; j++) {
                  const generator = generateNumber[sequenceType] || generateNumber.default;
                  matrix[i][j] = generator();
              }
          }
      }
  
      // Apply traversal patterns if specified and return as a flat array
      function applyTraversal() {
          const flattened = matrix.flat();
          const result = [];
          let index = 0;
  
          if (traversalType === 'z') {
              // Top row (left to right)
              for (let j = 0; j < n; j++) {
                  result.push(flattened[index++]);
              }
  
              // Diagonal (top-right to bottom-left)
              for (let i = 1; i < Math.min(m, n); i++) {
                  result.push(flattened[i * n + (n - i - 1)]);
              }
  
              // Bottom row (left to right)
              if (m > 1) {
                  for (let j = 1; j < n; j++) {
                      result.push(flattened[(m - 1) * n + j]);
                  }
              }
          } else if (traversalType === 'spiral') {
              let left = 0, right = n - 1, top = 0, bottom = m - 1;
              while (left <= right && top <= bottom) {
                  // Top row
                  for (let j = left; j <= right; j++) {
                      result.push(flattened[top * n + j]);
                  }
                  top++;
  
                  // Right column
                  for (let i = top; i <= bottom; i++) {
                      result.push(flattened[i * n + right]);
                  }
                  right--;
  
                  // Bottom row
                  if (top <= bottom) {
                      for (let j = right; j >= left; j--) {
                          result.push(flattened[bottom * n + j]);
                      }
                      bottom--;
                  }
  
                  // Left column
                  if (left <= right) {
                      for (let i = bottom; i >= top; i--) {
                          result.push(flattened[i * n + left]);
                      }
                      left++;
                  }
              }
          }
  
          return result;
      }
  
      fillMatrix();
      if (traversalType !== 'none') {
          return applyTraversal();
      }
  
      return matrix.flat();
  }
  
  // // Example usage
  // console.log(createMatrix(3, 3, 'natural', 'z'));    // Output: [1, 2, 3, 5, 7, 8, 9]
  // console.log(createMatrix(3, 3, 'natural', 'spiral')); // Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]
  
  