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



//   mid function

// Function to find the middle element(s) of an array
function bhaiFindMiddle(arr) {
    if (!Array.isArray(arr)) {
      throw new TypeError('bhaiFindMiddle expects an array as input');
    }
  
    const len = arr.length;
  
    if (len === 0) {
      return null; // Return null if the array is empty
    }
  
    const middleIndex = Math.floor(len / 2);
  
    // If the array has an odd number of elements, return the middle element
    if (len % 2 !== 0) {
      return arr[middleIndex];
    } else {
      // If the array has an even number of elements, return the two middle elements
      return [arr[middleIndex - 1], arr[middleIndex]];
    }
  }

//   find last element 
// Function to find the last element of an array
function bhaiFindLast(arr) {
    if (!Array.isArray(arr)) {
      throw new TypeError('bhaiFindLast expects an array as input');
    }
  
    const len = arr.length;
  
    // If the array is empty, return undefined
    if (len === 0) {
      return undefined;
    }
  
    // Return the last element of the array
    return arr[len - 1];
  }







  /**
 * Creates a matrix of size m x n.
 * @param {number} m - Number of rows.
 * @param {number} n - Number of columns.
 * @param {any} initialValue - Optional initial value for all elements (default is 0).
 * @returns {Array<Array<any>>} - The created matrix.
 */
function createMatrix(m, n, initialValue = 0) {
    // Ensure the dimensions are positive integers
    if (m <= 0 || n <= 0) {
      throw new Error('Both dimensions must be positive integers');
    }
  
    // Create the matrix with the given dimensions and initial value
    const matrix = [];
    for (let i = 0; i < m; i++) {
      matrix[i] = [];
      for (let j = 0; j < n; j++) {
        matrix[i][j] = initialValue;
      }
    }
  
    return matrix;
  }
  

//   ashish  

// word count method 
if (!String.prototype.wordCount) {
    String.prototype.wordCount = function() {
        if (this == null) {
            throw new TypeError('String.prototype.wordCount called on null or undefined');
        }

        return this.trim().split(/\s+/).length;
    };
}

// Example usage:
// let str = "Hello World, how are you?";
// console.log(str.wordCount()); // Output: 5



// String.prototype.vowelCount
// Description:
// Counts the number of vowels in a string.


if (!String.prototype.vowelCount) {
    String.prototype.vowelCount = function() {
        if (this == null) {
            throw new TypeError('String.prototype.vowelCount called on null or undefined');
        }

        const vowels = 'aeiouAEIOU';
        let count = 0;

        for (let i = 0; i < this.length; i++) {
            if (vowels.indexOf(this[i]) !== -1) {
                count++;
            }
        }

        return count;
    };
}

// // Example usage:
// let str = "Hello World";
// console.log(str.vowelCount()); // Output: 3




// String.prototype.consonantCount
// Description:
// Counts the number of consonants in a string.

// Implementation:
// javascript
// Copy code

if (!String.prototype.consonantCount) {
    String.prototype.consonantCount = function() {
        if (this == null) {
            throw new TypeError('String.prototype.consonantCount called on null or undefined');
        }

        const consonants = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ';
        let count = 0;

        for (let i = 0; i < this.length; i++) {
            if (consonants.indexOf(this[i]) !== -1) {
                count++;
            }
        }

        return count;
    };
}

// Example usage:
// let str = "Hello World";
// console.log(str.consonantCount()); // Output: 7



// String.prototype.isAnagram
// Description:
// Checks if two strings are anagrams of each other.

// Implementation:
// javascript
// Copy code
if (!String.prototype.isAnagram) {
    String.prototype.isAnagram = function(otherString) {
        if (this == null || otherString == null) {
            throw new TypeError('String.prototype.isAnagram called on null or undefined');
        }

        const normalize = str => str.replace(/[^\w]/g, '').toLowerCase().split('').sort().join('');
        return normalize(this) === normalize(otherString);
    };
}

// Example usage:
// let str1 = "listen";
// let str2 = "silent";
// console.log(str1.isAnagram(str2)); // Output: true


// intiger methods 

if (!Number.prototype.factorial) {
    Number.prototype.factorial = function() {
        if (!Number.isInteger(this) || this < 0) {
            throw new TypeError('factorial expects a non-negative integer');
        }

        let result = 1;
        for (let i = 2; i <= this; i++) {
            result *= i;
        }
        return result;
    };
}

// Example usage:
// const num = 5;
// console.log(num.factorial()); // 120


// array methods 

// 1. array.mode()
// javascript

if (!Array.prototype.mode) {
    Array.prototype.mode = function() {
        if (this == null || !Array.isArray(this)) {
            throw new TypeError('mode expects an array');
        }
        
        const frequencyMap = {};
        let maxCount = 0;
        let mode = null;
        
        for (let i = 0; i < this.length; i++) {
            const num = this[i];
            frequencyMap[num] = (frequencyMap[num] || 0) + 1;
            
            if (frequencyMap[num] > maxCount) {
                maxCount = frequencyMap[num];
                mode = num;
            }
        }
        
        return mode;
    };
}

// Example usage:
// const arr = [1, 2, 2, 3, 3, 3];
// console.log(arr.mode()); // 3



// 2. array.median()
// javascript

if (!Array.prototype.median) {
    Array.prototype.median = function() {
        if (this == null || !Array.isArray(this)) {
            throw new TypeError('median expects an array');
        }
        
        const sorted = this.slice().sort((a, b) => a - b);
        const len = sorted.length;
        const mid = Math.floor(len / 2);
        
        return len % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    };
}

// Example usage:
// const arr = [1, 3, 2, 5, 4];
// console.log(arr.median()); // 3



// 3. array.quantile()
// javascript

if (!Array.prototype.quantile) {
    Array.prototype.quantile = function(q) {
        if (this == null || !Array.isArray(this)) {
            throw new TypeError('quantile expects an array');
        }
        if (typeof q !== 'number' || q < 0 || q > 1) {
            throw new TypeError('quantile expects a number between 0 and 1');
        }

        const sorted = this.slice().sort((a, b) => a - b);
        const pos = (sorted.length - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;

        if (sorted[base + 1] !== undefined) {
            return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
        } else {
            return sorted[base];
        }
    };
}

// Example usage:
// const arr = [1, 2, 3, 4, 5];
// console.log(arr.quantile(0.5)); // 3


// 4. array.correlation()
// javascript

if (!Array.prototype.correlation) {
    Array.prototype.correlation = function(arr2) {
        if (this == null || !Array.isArray(this) || !Array.isArray(arr2)) {
            throw new TypeError('correlation expects two arrays');
        }
        if (this.length !== arr2.length) {
            throw new Error('Both arrays must have the same length');
        }

        const n = this.length;
        const mean1 = this.reduce((acc, val) => acc + val, 0) / n;
        const mean2 = arr2.reduce((acc, val) => acc + val, 0) / n;

        let numerator = 0;
        let denominator1 = 0;
        let denominator2 = 0;

        for (let i = 0; i < n; i++) {
            const diff1 = this[i] - mean1;
            const diff2 = arr2[i] - mean2;

            numerator += diff1 * diff2;
            denominator1 += diff1 ** 2;
            denominator2 += diff2 ** 2;
        }

        return numerator / Math.sqrt(denominator1 * denominator2);
    };
}

// Example usage:
// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];
// console.log(arr1.correlation(arr2)); // 1 (perfect correlation)


// 5. array.covariance()
// javascript
// Copy code
if (!Array.prototype.covariance) {
    Array.prototype.covariance = function(arr2) {
        if (this == null || !Array.isArray(this) || !Array.isArray(arr2)) {
            throw new TypeError('covariance expects two arrays');
        }
        if (this.length !== arr2.length) {
            throw new Error('Both arrays must have the same length');
        }

        const n = this.length;
        const mean1 = this.reduce((acc, val) => acc + val, 0) / n;
        const mean2 = arr2.reduce((acc, val) => acc + val, 0) / n;

        let covariance = 0;

        for (let i = 0; i < n; i++) {
            covariance += (this[i] - mean1) * (arr2[i] - mean2);
        }

        return covariance / n;
    };
}

// Example usage:
// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];
// console.log(arr1.covariance(arr2)); // 0.666...



// tim sort algoridthm

if (!Array.prototype.timsort) {
    Array.prototype.timsort = function() {
      if (this == null || !Array.isArray(this)) {
        throw new TypeError('timsort expects an array');
      }
  
      const MIN_MERGE = 32;
  
      function calcMinRun(n) {
        let r = 0;
        while (n >= MIN_MERGE) {
          r |= (n & 1);
          n >>= 1;
        }
        return n + r;
      }
  
      function insertionSort(arr, left, right) {
        for (let i = left + 1; i <= right; i++) {
          let temp = arr[i];
          let j = i - 1;
          while (j >= left && arr[j] > temp) {
            arr[j + 1] = arr[j];
            j--;
          }
          arr[j + 1] = temp;
        }
      }
  
      function merge(arr, l, m, r) {
        let len1 = m - l + 1;
        let len2 = r - m;
        let left = new Array(len1);
        let right = new Array(len2);
        for (let i = 0; i < len1; i++) {
          left[i] = arr[l + i];
        }
        for (let i = 0; i < len2; i++) {
          right[i] = arr[m + 1 + i];
        }
        let i = 0;
        let j = 0;
        let k = l;
        while (i < len1 && j < len2) {
          if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
          } else {
            arr[k] = right[j];
            j++;
          }
          k++;
        }
        while (i < len1) {
          arr[k] = left[i];
          i++;
          k++;
        }
        while (j < len2) {
          arr[k] = right[j];
          j++;
          k++;
        }
      }
  
      function timSort(arr) {
        let n = arr.length;
        let minRun = calcMinRun(n);
        for (let start = 0; start < n; start += minRun) {
          insertionSort(arr, start, Math.min(start + minRun - 1, n - 1));
        }
        for (let size = minRun; size < n; size = 2 * size) {
          for (let left = 0; left < n; left += 2 * size) {
            let mid = left + size - 1;
            let right = Math.min(left + 2 * size - 1, n - 1);
            merge(arr, left, mid, right);
          }
        }
      }
  
      timSort(this);
      return this;
    };
  }



//   exampole usage 
//   let arr = [5, 2, 8, 3, 1, 6, 4];
// arr.timsort();
// console.log(arr); // [1, 2, 3, 4, 5, 6, 8]

// intiger 


// 1. int.isPrime()
// javascript

// Adding a custom method to Number's prototype to check if a number is prime
if (!Number.prototype.isPrime) {
  Number.prototype.isPrime = function() {
      // Ensure `this` is treated as a number and check if it is an integer
      const num = Number(this);
      if (!Number.isInteger(num)) {
          throw new TypeError('isPrime expects an integer');
      }
      
      // Check if the number is less than 2
      if (num < 2) return false;
      
      // Check for factors up to the square root of the number
      for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
          if (num % i === 0) return false;
      }
      
      // Number is prime
      return true;
  };
}

// Example usage
// let x = 7; // Ensure x is an integer
// console.log(x.isPrime()); // Should output true since 7 is a prime number




// factorial method 

Number.prototype.factorial = function() {
  const n = Number(this);

  if (!Number.isInteger(n) || n < 0) {
      throw new TypeError('factorial expects a non-negative integer');
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
      result *= i;
  }
  return result;
};

// Test the method
// console.log((5).factorial()); // Should output 120


// gcd function 

if (!Number.prototype.gcd) {
  Number.prototype.gcd = function(other) {
      const a = Number(this);
      const b = Number(other);

      if (!Number.isInteger(a) || !Number.isInteger(b)) {
          throw new TypeError('gcd expects integer arguments');
      }

      // Euclidean algorithm to find GCD
      const gcd = (x, y) => {
          while (y !== 0) {
              let temp = y;
              y = x % y;
              x = temp;
          }
          return x;
      };

      return gcd(a, b);
  };
}



// lowest common factor 
if (!Number.prototype.lcm) {
  Number.prototype.lcm = function(other) {
      const a = Number(this);
      const b = Number(other);

      if (!Number.isInteger(a) || !Number.isInteger(b)) {
          throw new TypeError('lcm expects integer arguments');
      }

      // Ensure non-zero values
      if (a === 0 || b === 0) return 0;

      // Calculate LCM using the GCD method
      return Math.abs(a * b) / a.gcd(b);
  };
}



