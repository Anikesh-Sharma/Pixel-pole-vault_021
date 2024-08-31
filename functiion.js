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
  