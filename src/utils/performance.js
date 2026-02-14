// Throttle function - ensures function is called at most once per specified time
export const throttle = (func, delay) => {
    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        return func(...args);
      }
    };
  };
  
  // Debounce function - delays execution until after specified time has passed
  export const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };
  
  // Random number within range
  export const randomInRange = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  
  // Random integer within range
  export const randomIntInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  // Clamp value between min and max
  export const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
  };
  
  // Check if touch device
  export const isTouchDevice = () => {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  };
  
  // Get random item from array
  export const randomFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };
  
  // Shuffle array (Fisher-Yates algorithm)
  export const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  // Linear interpolation
  export const lerp = (start, end, t) => {
    return start * (1 - t) + end * t;
  };
  