import mongoose from 'mongoose';

const productschema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  id: { type: Number, required: true },
  timestamp: { type: Date },
});

const carritosSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  timestamp: { type: Date },
  products: { type: [] },
});

export { productschema, carritosSchema };
