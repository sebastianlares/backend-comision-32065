const Container = require('./container');

const main = async () => {
    const productsContainer = new Container('products.txt');
    const returnedId = await productsContainer.save({ product: 'PC', price: 25, thumbnail: 'Desktop PC' });
    const products = await productsContainer.getAll();
    const product5 = await productsContainer.getById(5);
    // await productsContainer.deleteAll();
    console.log(product5);
};

main();
