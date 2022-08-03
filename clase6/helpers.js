const generateRandomNumber = (min, max) => {
    const randomNumber = Math.random() * (max - min) + min;
    return Math.round(randomNumber);
};

module.exports = generateRandomNumber;
