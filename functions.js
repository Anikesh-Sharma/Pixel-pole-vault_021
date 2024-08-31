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


