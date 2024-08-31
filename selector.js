// BhaiSelector Object
const BhaiSelector = {
    // Method to select a single element
    bhaiQuerySelector: function(selector) {
      if (typeof selector !== 'string') {
        throw new TypeError('Selector must be a string');
      }
  
      // Use native querySelector to find the first matching element
      return document.querySelector(selector);
    },
  
    // Method to select multiple elements
    bhaiQuerySelectorAll: function(selector) {
      if (typeof selector !== 'string') {
        throw new TypeError('Selector must be a string');
      }
  
      // Use native querySelectorAll to find all matching elements
      return document.querySelectorAll(selector);
    },
  
    // Method to add a class to a single element
    bhaiAddClass: function(selector, className) {
      const element = this.bhaiQuerySelector(selector);
      if (element) {
        element.classList.add(className);
      }
    },
  
    // Method to remove a class from a single element
    bhaiRemoveClass: function(selector, className) {
      const element = this.bhaiQuerySelector(selector);
      if (element) {
        element.classList.remove(className);
      }
    },
  
    // Method to toggle a class for a single element
    bhaiToggleClass: function(selector, className) {
      const element = this.bhaiQuerySelector(selector);
      if (element) {
        element.classList.toggle(className);
      }
    },
  
    // Method to set innerHTML of a single element
    bhaiSetInnerHTML: function(selector, htmlContent) {
      const element = this.bhaiQuerySelector(selector);
      if (element) {
        element.innerHTML = htmlContent;
      }
    },
  
    // Method to get innerHTML of a single element
    bhaiGetInnerHTML: function(selector) {
      const element = this.bhaiQuerySelector(selector);
      return element ? element.innerHTML : null;
    }
  };
  
  // Example usage:
  
  // Select a single element by ID
  const singleElement = BhaiSelector.bhaiQuerySelector('#myElement');
  console.log(singleElement); // Logs the element with ID "myElement"
  
  // Select multiple elements by class name
  const elements = BhaiSelector.bhaiQuerySelectorAll('.myClass');
  console.log(elements); // Logs a NodeList of elements with class "myClass"
  
  // Add a class to an element
  BhaiSelector.bhaiAddClass('#myElement', 'newClass');
  
  // Remove a class from an element
  BhaiSelector.bhaiRemoveClass('#myElement', 'oldClass');
  
  // Toggle a class for an element
  BhaiSelector.bhaiToggleClass('#myElement', 'toggleClass');
  
  // Set innerHTML of an element
  BhaiSelector.bhaiSetInnerHTML('#myElement', '<p>New Content</p>');
  
  // Get innerHTML of an element
  const innerHTML = BhaiSelector.bhaiGetInnerHTML('#myElement');
  console.log(innerHTML); // Logs the inner HTML content of the element
  