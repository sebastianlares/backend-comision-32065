const mongoose = require('mongoose');

const productschema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    photo: { type: String },
    id: { type: Number, required: true },
  },
  { versionKey: false },
  { _id: false },
);

const messagesSchema = new mongoose.Schema(
  {
    author: {
      id: { type: String },
      email: { type: String, required: true },
      nombre: { type: String, required: true },
      apellido: { type: String, required: true },
      edad: { type: String, required: true },
      alias: { type: String, required: true },
      avatar: { type: String, required: true },
    },
    timestamp: { type: Date },
    id: { type: Number },
    text: { type: String },
  },
  { versionKey: false },
  { _id: false },
);

const User = mongoose.model('Users', {
  username: String,
  password: String,
});

module.exports = { productschema, messagesSchema, User };
