const faker = require('faker');

const generateRandomProduct = () => {
  return {
    title: faker.name.findName(),
    price: faker.finance.amount(20, 500, 2, '$'),
    thumbnail: faker.image.avatar(),
  };
};

const getRandomProducts = amount => {
  const products = [];
  let incrementor = 0;
  while (incrementor < amount) {
    const product = generateRandomProduct();
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

const createHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);

const isValidPassword = (user, password) => bCrypt.compareSync(password, user.password);

module.exports = { getRandomProducts, getFormatedDate, createHash, isValidPassword };
