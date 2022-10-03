const faker = require('faker');

const generateRandomProduct = () => {
  return {
    title: faker.name.findName(),
    price: faker.finance.amount(20, 500, 2, '$'),
    thumbnail: faker.image.avatar(),
  };
};

const getRandomProducts = amount => {
  console.log('entra en func');
  const products = [];
  let incrementor = 0;
  while (incrementor < amount) {
    console.log('entra en while');
    const product = generateRandomProduct();
    console.log(product);
    products.push(product);
    incrementor++;
  }
  return products;
};

const getFormatedDate = () => {
  const date = new Date().toLocaleDateString([], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return date;
};

module.exports = { getRandomProducts, getFormatedDate };
