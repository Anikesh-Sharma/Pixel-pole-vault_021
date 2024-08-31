// BhaiInput Object
const BhaiInput = {
    // Method to get user input from a prompt
    bhaiPromptInput: function(message) {
      if (typeof message !== 'string') {
        throw new TypeError('Message must be a string');
      }
  
      // Prompt user for input with a custom message
      return prompt(message);
    },
  
    // Method to retrieve value from an input field by selector
    bhaiGetInputValue: function(selector) {
      if (typeof selector !== 'string') {
        throw new TypeError('Selector must be a string');
      }
  
      // Use BhaiSelector to find the input element
      const inputElement = BhaiSelector.bhaiQuerySelector(selector);
      
      if (inputElement && inputElement.tagName === 'INPUT' || inputElement.tagName === 'TEXTAREA') {
        return inputElement.value;
      } else {
        throw new Error('Element is not an input or textarea');
      }
    },
  
    // Method to set value to an input field by selector
    bhaiSetInputValue: function(selector, value) {
      if (typeof selector !== 'string') {
        throw new TypeError('Selector must be a string');
      }
  
      // Use BhaiSelector to find the input element
      const inputElement = BhaiSelector.bhaiQuerySelector(selector);
  
      if (inputElement && (inputElement.tagName === 'INPUT' || inputElement.tagName === 'TEXTAREA')) {
        inputElement.value = value;
      } else {
        throw new Error('Element is not an input or textarea');
      }
    },
  
    // Method to add an event listener to an input field
    bhaiAddInputEventListener: function(selector, eventType, callback) {
      if (typeof selector !== 'string' || typeof eventType !== 'string' || typeof callback !== 'function') {
        throw new TypeError('Invalid arguments');
      }
  
      const inputElement = BhaiSelector.bhaiQuerySelector(selector);
      
      if (inputElement) {
        inputElement.addEventListener(eventType, callback);
      } else {
        throw new Error('Element not found');
      }
    }
  };
  
  // Example usage:
  
  // 1. Prompt user for input
  const userInput = BhaiInput.bhaiPromptInput('Enter your name:');
  console.log('User input:', userInput);
  
  // 2. Get value from an input field
  const inputValue = BhaiInput.bhaiGetInputValue('#myInput');
  console.log('Input field value:', inputValue);
  
  // 3. Set value to an input field
  BhaiInput.bhaiSetInputValue('#myInput', 'New Value');
  
  // 4. Add event listener to an input field
  BhaiInput.bhaiAddInputEventListener('#myInput', 'input', function(event) {
    console.log('Input changed to:', event.target.value);
  });
  