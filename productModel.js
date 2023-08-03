const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  place: {
    type: String,
    required: [true, "Please enter a name of the place"],
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
  image: {
    type: String,
    required: [true, "Please enter an image url"],
  },
  text: {
    type: String,
    required: [true, "Please add some text"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
