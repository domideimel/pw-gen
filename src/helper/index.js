/**
 * Generates Random Lowercase Letter
 * @returns {String}
 */
const getRandomLower = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97);

/**
 * Generates Random Uppercase Letter
 * @returns {String}
 */
const getRandomUpper = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);

/**
 * Generates Random Number
 * @returns {String}
 */
const getRandomNumber = () => String.fromCharCode(Math.floor(Math.random() * 10) + 48);

/**
 * Generates Random Symbol
 * @param {String} [symbols = '!@#$%^&*(){}[]=<>/,.']
 */
const getRandomSymbol = (symbols = '!@#$%^&*(){}[]=<>/,.') => symbols[Math.floor(Math.random() * symbols.length)];

export {
  getRandomLower,
  getRandomNumber,
  getRandomSymbol,
  getRandomUpper
}
