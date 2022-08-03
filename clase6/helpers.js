const generateRandomNumber = (min, max) => {
    const randomNumber = Math.random() * (max - min) + min;
    return Math.round(randomNumber);
};

const getRandomProductById = async productsContainer => {
    const allProducts = await productsContainer.getAll();
    const lastProductId = allProducts[allProducts.length - 1].id;
    const randomId = generateRandomNumber(1, lastProductId);
    const randomProduct = allProducts.filter(product => product.id === randomId);
    return randomProduct[0];
};

module.exports = getRandomProductById;
