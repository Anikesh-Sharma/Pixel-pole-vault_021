/**
 * Finds the first element in the array that is not less than the specified value.
 * If no such element exists, it returns `undefined`.
 * 
 * @param {number} value - The value to compare against.
 * @returns {*} - The first element that is not less than the value or `undefined` if no such element exists.
 */
if (!Array.prototype.lowerBound) {
    Array.prototype.lowerBound = function(value) {
      if (this == null || !Array.isArray(this)) {
        throw new TypeError('Array.prototype.lowerBound called on null or undefined');
      }
  
      let left = 0;
      let right = this.length;
  
      while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (this[mid] < value) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
  
      return left < this.length ? this[left] : undefined;
    };
  }
  
  /**
   * Finds the index of the first element in the array that is not less than the specified value.
   * If no such element exists, it returns `-1`.
   * 
   * @param {number} value - The value to compare against.
   * @returns {number} - The index of the first element that is not less than the value or `-1` if no such index exists.
   */
  if (!Array.prototype.lowerBoundIndex) {
    Array.prototype.lowerBoundIndex = function(value) {
      if (this == null || !Array.isArray(this)) {
        throw new TypeError('Array.prototype.lowerBoundIndex called on null or undefined');
      }
  
      let left = 0;
      let right = this.length;
  
      while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (this[mid] < value) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
  
      return left < this.length ? left : -1;
    };
  }
  
  /**
   * Finds the first element in the array that is greater than the specified value.
   * If no such element exists, it returns `undefined`.
   * 
   * @param {number} value - The value to compare against.
   * @returns {*} - The first element that is greater than the value or `undefined` if no such element exists.
   */
  if (!Array.prototype.upperBound) {
    Array.prototype.upperBound = function(value) {
      if (this == null || !Array.isArray(this)) {
        throw new TypeError('Array.prototype.upperBound called on null or undefined');
      }
  
      let left = 0;
      let right = this.length;
  
      while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (this[mid] <= value) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
  
      return left < this.length ? this[left] : undefined;
    };
  }
  
  /**
   * Finds the index of the first element in the array that is greater than the specified value.
   * If no such element exists, it returns `-1`.
   * 
   * @param {number} value - The value to compare against.
   * @returns {number} - The index of the first element that is greater than the value or `-1` if no such index exists.
   */
  if (!Array.prototype.upperBoundIndex) {
    Array.prototype.upperBoundIndex = function(value) {
      if (this == null || !Array.isArray(this)) {
        throw new TypeError('Array.prototype.upperBoundIndex called on null or undefined');
      }
  
      let left = 0;
      let right = this.length;
  
      while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (this[mid] <= value) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
  
      return left < this.length ? left : -1;
    };
  }
  

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



