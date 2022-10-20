const config = require('../config/config');

const generateRandomNumbers = (number, counter = 0, min = 1, numbersObject = {}) => {
  while (counter < number) {
    const key = Math.floor(Math.random() * 1000) + min;
    numbersObject[key] ? numbersObject[key]++ : (numbersObject[key] = 1);
    counter++;
  }
  return numbersObject;
};

process.on('message', message => {
  if (message === 'start') {
    const number = process.argv.at(-1);
    const result = generateRandomNumbers(number);
    process.send(result);
  }
});
