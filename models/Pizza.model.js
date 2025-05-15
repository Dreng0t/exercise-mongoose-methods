const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pizzaSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    min: 1,
    max: 99,
  },
  isVeggie: {
    type: Boolean,
    default: false,
  },

  ingredients: [String],
  dough: {
    type: String,
    enum: ['thin', 'extra thin', 'with cheese', 'with garlic'],
  },
  cook: {
    type: Schema.Types.ObjectId,
    ref: "Cook", 
    required: true
  }
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;
